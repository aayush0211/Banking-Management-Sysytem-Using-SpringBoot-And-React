package com.bank.globalExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.custom.exception.InvalidPasswordException;
import com.bank.custom.exception.LimitExceededException;
import com.bank.response.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex) {
        
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BranchNotFoundException.class)
    public ResponseEntity<Object> handleBranchNotFoundException(BranchNotFoundException ex) {
        
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(LimitExceededException.class)
    public ResponseEntity<Object> handleLimitExceededException(LimitExceededException ex) {
        
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
    }
    
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Object> invalidPasswordException(InvalidPasswordException ex) {
        
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.FORBIDDEN, ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

   
}