package com.cloudBalance.backEnd.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserDTO {
    private Long id;
//    private String name;
    private String firstName;
    private String lastName;

    private String email;
    private String password;
    private String role;
    private LocalDateTime lastLogin;
    private List<Long> accounts;
}

