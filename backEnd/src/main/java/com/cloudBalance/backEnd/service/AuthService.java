package com.cloudBalance.backEnd.service;

import com.cloudBalance.backEnd.dto.AuthResponse;
import com.cloudBalance.backEnd.dto.LoginRequest;
import com.cloudBalance.backEnd.model.BlackListToken;
import com.cloudBalance.backEnd.model.User;
import com.cloudBalance.backEnd.repository.BlackListTokenRepository;
import com.cloudBalance.backEnd.repository.UserRepository;
import com.cloudBalance.backEnd.security.jwt.JWTService;
import com.cloudBalance.backEnd.security.userDetails.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final BlackListTokenRepository blackListTokenRepository;


    public AuthResponse authenticate(@Valid LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        var jwt = jwtService.generateToken((UserDetails) new UserDetailsImpl(user));


//        // Extract user role from JWT token(This is a GPT answer! Not Understandable solution)
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        if (principal instanceof UserDetailsImpl) {
//            UserDetailsImpl userDetails = (UserDetailsImpl) principal;
//            // Proceed with userDetails
//        } else {
//            // Handle the case where principal is not an instance of UserDetailsImpl
//        }
        return AuthResponse.builder()
                .token(jwt)
                .build();
    }

    public ResponseEntity<String> logout(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            Date expiration = jwtService.getExpirationDateFromToken(token);

            BlackListToken blackListToken = new BlackListToken();
            blackListToken.setToken(token);
            blackListToken.setExpiryDate(expiration);
            blackListTokenRepository.save(blackListToken);

            String email = jwtService.extractUsername(token); // `sub` claim
            Optional<User> userOpt = userRepository.findByEmail(email);
            userOpt.ifPresent(user -> {
                user.setLastLogin(LocalDateTime.now());
                userRepository.save(user);
            });

            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("Logout successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid token");
        }
    }
}
