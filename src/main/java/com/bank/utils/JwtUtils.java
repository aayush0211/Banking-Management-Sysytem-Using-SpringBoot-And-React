package com.bank.utils;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import com.bank.resp.dto.LogInResp;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {

	private final String secret_key = "mysecretkey";
	private long accessTokenValidity = 60*60*1000;
	
	private final JwtParser jwtParser;
	
	private final String TOKEN_HEADER = "Authorization";
	private final String TOKEN_PREFIX = "Bearer";

	public JwtUtils() {
		this.jwtParser = Jwts.parser().setSigningKey(secret_key);
	}
	

	// will be invoked by Authentication controller) , upon successful
	// authentication
	public String generateJwtToken(LogInResp LogInResp) {
		
	Claims claims = Jwts.claims().setSubject(LogInResp.getEmail());
	claims.put("firstName", LogInResp.getFirstName());
	claims.put("firstName", LogInResp.getLastName());
	//claims.put("role", LogInResp.getRole());
	Date tokenCreateTime = new Date();
	Date tokenValidity = new Date(tokenCreateTime.getTime()+ TimeUnit.MINUTES.toMillis(accessTokenValidity));
	
	return Jwts.builder().setClaims(claims)
			.setExpiration(tokenValidity)
			.signWith(SignatureAlgorithm.HS256, secret_key)
			.compact();

	}
	private Claims parseJwtClaims(String token) {
		return jwtParser.parseClaimsJws(token).getBody();
	}
	
	public Claims resolveClaims(HttpServletRequest req) {
		try {
			String token = resolveToken(req);
			if(token!=null) {
				return parseJwtClaims(token);
			}
			return null;
		}
		catch (ExpiredJwtException ex) {
			req.setAttribute("expired", ex.getMessage());
			throw ex;
		}
		catch(Exception ex) {
			req.setAttribute("invalid", ex.getMessage());
			throw ex;
		}
	}
	public String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(TOKEN_HEADER);
		if(bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
			return bearerToken.substring(TOKEN_PREFIX.length());
		}
		return null;
	}
	// this method will be invoked by our custom JWT filter
	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}
	
	public String getEmail(Claims claims) {
		return claims.getSubject();
	}
	
	
	

	// this method will be invoked by our custom filter
	public boolean validateJwtToken(Claims claims) {
		try {
			return claims.getExpiration().after(new Date());
			
		}
		catch(Exception e) {
			throw e;
		}
	}
	  
	// Accepts Collection<GrantedAuthority> n rets comma separated list of it's
	// string form

	@SuppressWarnings("unused")
	private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		String authorityString = authorities.stream().
				map(authority -> authority.getAuthority())
				.collect(Collectors.joining(","));
		System.out.println(authorityString);
		return authorityString;
	}

	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
		String authString = (String) claims.get("authorities");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
		authorities.forEach(System.out::println);
		return authorities;
	}

}
