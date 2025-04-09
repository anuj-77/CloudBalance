package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.AuthResponse;
import com.cloudBalance.backEnd.dto.LoginRequest;
import com.cloudBalance.backEnd.model.BlackListToken;
import com.cloudBalance.backEnd.repository.BlackListTokenRepository;
import com.cloudBalance.backEnd.security.jwt.JWTService;
import com.cloudBalance.backEnd.service.AuthService;
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
    private final JWTService jwtService;
    private final BlackListTokenRepository blackListTokenRepository;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authService.authenticate(loginRequest));
    }

    //logoutController and token blacklist functionality
    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            Date expiration = jwtService.getExpirationDateFromToken(token);
            BlackListToken blackListToken = new BlackListToken();
            blackListToken.setToken(token);
            blackListToken.setExpiryDate(expiration);
            blackListTokenRepository.save(blackListToken);
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("Logout successful");
        }else {
            return ResponseEntity.badRequest().body("Invalid token");
        }
    }

}
