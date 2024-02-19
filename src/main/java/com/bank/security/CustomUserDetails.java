package com.bank.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bank.entities.Account;



@SuppressWarnings("serial")
public class CustomUserDetails implements UserDetails {
	private final Account users_account;
	

	public CustomUserDetails(Account account) {
		super();
		this.users_account = account;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(new SimpleGrantedAuthority(users_account.getRole().name()));
	}

	@Override
	public String getPassword() {
	
		return users_account.getPassword();
	}

	@Override
	public String getUsername() {
		
		return users_account.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
	
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {
		
		return true;
	}

}
