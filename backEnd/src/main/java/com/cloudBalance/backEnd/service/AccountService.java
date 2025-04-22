package com.cloudBalance.backEnd.service;

import com.cloudBalance.backEnd.dto.AccountsDTO;

import java.util.List;

public interface AccountService {

    public AccountsDTO createAccounts(AccountsDTO accountsDTO);
    public AccountsDTO getAccountByAccountNumber(Long accountNumber);
    public List<AccountsDTO> getAllAccounts();
;
}
