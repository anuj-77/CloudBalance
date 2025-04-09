package com.cloudBalance.backEnd.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class LoginRequest {
    @NotNull
    private String email;
    @NotNull
    private String password;
}
