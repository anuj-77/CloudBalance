package com.cloudBalance.backEnd.exceptions;

public class AWSServiceException extends RuntimeException {
    public AWSServiceException(String message) {
        super(message);
    }
}
