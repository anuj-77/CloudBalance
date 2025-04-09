package com.cloudBalance.backEnd.service;

import com.cloudBalance.backEnd.dto.AuthResponse;
import com.cloudBalance.backEnd.dto.LoginRequest;
import com.cloudBalance.backEnd.repository.UserRepository;
import com.cloudBalance.backEnd.security.jwt.JWTService;
import com.cloudBalance.backEnd.security.userDetails.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;


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
}
