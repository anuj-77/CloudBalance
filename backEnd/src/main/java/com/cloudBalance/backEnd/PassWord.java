package com.cloudBalance.backEnd;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PassWord {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "12345678";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println(encodedPassword);
    }
}
