package com.bank.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "cards")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "account" , callSuper = true)
public class Card extends BaseEntity {
	
	@Enumerated(EnumType.STRING)
	@Column(name = "card_type")
	private CardType cardType;
	
	@Enumerated(EnumType.STRING)
	@Column(name="card_network")
	private CardNetwork cardNetwork;
	@Column(name= "expiry_date")
	private LocalDate expiryDate;
	@Column(name= "creation_date")
	private LocalDate creationDate;

	@Column
	private int CVV;
	
	@ManyToOne
	@JoinColumn(name = "account_id", nullable = false)
	private Account account;
}
