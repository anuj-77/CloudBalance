package com.cloudBalance.backEnd.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
  public EmailAlreadyExistsException(String message) {
    super(message);
  }
}
