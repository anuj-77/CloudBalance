package com.cloudBalance.backEnd.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("accountId")
    @Column(unique = true,nullable = false)
    private Long accountNumber;

    @JsonProperty("accountName")
    @Column(nullable = false)
    private String accountName;

    @JsonProperty("roleArn")
    @Column(nullable = false)
    private String arnNumber;

}
