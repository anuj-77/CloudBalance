package com.cloudBalance.backEnd.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.Locale;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    private ResponseEntity<ErrorResponse> buildError(HttpStatus status, String error, String message, HttpServletRequest request) {
        return new ResponseEntity<>(
                new ErrorResponse() {
                    @Override
                    public HttpStatusCode getStatusCode() {
                        return null;
                    }

                    @Override
                    public HttpHeaders getHeaders() {
                        return ErrorResponse.super.getHeaders();
                    }

                    @Override
                    public ProblemDetail getBody() {
                        return null;
                    }

                    @Override
                    public String getTypeMessageCode() {
                        return ErrorResponse.super.getTypeMessageCode();
                    }

                    @Override
                    public String getTitleMessageCode() {
                        return ErrorResponse.super.getTitleMessageCode();
                    }

                    @Override
                    public String getDetailMessageCode() {
                        return ErrorResponse.super.getDetailMessageCode();
                    }

                    @Override
                    public Object[] getDetailMessageArguments() {
                        return ErrorResponse.super.getDetailMessageArguments();
                    }

                    @Override
                    public Object[] getDetailMessageArguments(MessageSource messageSource, Locale locale) {
                        return ErrorResponse.super.getDetailMessageArguments(messageSource, locale);
                    }

                    @Override
                    public ProblemDetail updateAndGetBody(MessageSource messageSource, Locale locale) {
                        return ErrorResponse.super.updateAndGetBody(messageSource, locale);
                    }
                },
                status
        );
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFound(UsernameNotFoundException ex, HttpServletRequest request) {
        return buildError(HttpStatus.NOT_FOUND, "User Not Found", ex.getMessage(), request);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntime(RuntimeException ex, HttpServletRequest request) {
        log.error("Runtime Exception", ex);
        return buildError(HttpStatus.BAD_REQUEST, "Runtime Exception", ex.getMessage(), request);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex, HttpServletRequest request) {
        return buildError(HttpStatus.BAD_REQUEST, "Illegal Argument", ex.getMessage(), request);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleJsonParse(HttpMessageNotReadableException ex, HttpServletRequest request) {
        return buildError(HttpStatus.BAD_REQUEST, "Malformed JSON", ex.getMostSpecificCause().getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        StringBuilder errors = new StringBuilder();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.append(fieldError.getField()).append(": ").append(fieldError.getDefaultMessage()).append("; ");
        }
        return buildError(HttpStatus.BAD_REQUEST, "Validation Failed", errors.toString(), request);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        return buildError(HttpStatus.FORBIDDEN, "Access Denied", "You are not authorized to perform this action.", request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(DataIntegrityViolationException ex, HttpServletRequest request) {
        return buildError(HttpStatus.CONFLICT, "Database Constraint Violation", ex.getMostSpecificCause().getMessage(), request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        log.error("Unhandled Exception", ex);
        return buildError(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "Something went wrong", request);
    }
}
