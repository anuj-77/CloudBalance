package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.AuthResponse;
import com.cloudBalance.backEnd.dto.LoginRequest;
import com.cloudBalance.backEnd.model.BlackListToken;
import com.cloudBalance.backEnd.repository.BlackListTokenRepository;
import com.cloudBalance.backEnd.security.jwt.JWTService;
import com.cloudBalance.backEnd.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticate(loginRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authorizationHeader) {
        return authService.logout(authorizationHeader);
    }

}
