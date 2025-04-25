package com.cloudBalance.backEnd.dto;


import lombok.Data;
import software.amazon.awssdk.annotations.NotNull;


@Data
public class AccountsDTO {
    @NotNull
    private Long id;
    @NotNull
    private Long accountNumber;
    @NotNull
    private String accountName;
    @NotNull
    private String roleArn;
}
