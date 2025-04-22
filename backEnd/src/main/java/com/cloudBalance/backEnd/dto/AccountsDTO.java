package com.cloudBalance.backEnd.dto;


import lombok.Data;

@Data
public class AccountsDTO {
    private Long id;
    private Long accountNumber;
    private String accountName;
    private String roleArn;
}
