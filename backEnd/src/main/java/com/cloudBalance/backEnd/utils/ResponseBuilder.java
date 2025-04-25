package com.cloudBalance.backEnd.utils;

import com.cloudBalance.backEnd.dto.APIResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {
    public static <T> ResponseEntity<APIResponse<T>> success(T data, String message, HttpStatus status) {
        APIResponse<T> response = APIResponse.<T>builder()
                .status(status.value())
                .message(message)
                .data(data)
                .build();
        return new ResponseEntity<>(response, status);
    }

    public static <T> ResponseEntity<APIResponse<T>> success(T data, HttpServletRequest request) {
        return success(data, "Request successful", HttpStatus.OK);
    }
}
