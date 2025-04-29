package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.AccountsDTO;
import com.cloudBalance.backEnd.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {

    private final AccountService accountService;
    public AccountsController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    public ResponseEntity<List<AccountsDTO>> getAllAccounts() {
        List<AccountsDTO> accountDTO = accountService.getAllAccounts();
        return ResponseEntity.ok(accountDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<AccountsDTO> createAccount(@Valid @RequestBody AccountsDTO accountDTO) {
        AccountsDTO createdAccount = accountService.createAccounts(accountDTO);
        return ResponseEntity.ok(createdAccount);
    }


}
