package com.bank.customValidator;

import java.time.LocalDate;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AgeValidator implements ConstraintValidator<AgeConstraint, LocalDate>{

	 private int minAge;

	    @Override
	    public void initialize(AgeConstraint constraintAnnotation) {
	        this.minAge = constraintAnnotation.value();
	    }

	    @Override
	    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
	        if (value == null) {
	            return true; // null values are considered valid
	        }
	        LocalDate currentDate = LocalDate.now();
	        LocalDate minAgeDate = currentDate.minusYears(minAge);
	        return !value.isAfter(minAgeDate);
	        
	    }
	
}
