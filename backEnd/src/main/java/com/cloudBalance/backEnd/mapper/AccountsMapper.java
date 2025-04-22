package com.cloudBalance.backEnd.mapper;

import com.cloudBalance.backEnd.dto.AccountsDTO;
import com.cloudBalance.backEnd.model.Accounts;
import org.springframework.stereotype.Component;

@Component
public class AccountsMapper {

    public Accounts map(AccountsDTO accountsDTO){
        Accounts accounts = new Accounts();
        accounts.setAccountNumber(accountsDTO.getAccountNumber());
        accounts.setAccountName(accountsDTO.getAccountName());
        accounts.setArnNumber(accountsDTO.getRoleArn());
        return accounts;
    }

    public AccountsDTO map(Accounts accounts){
        AccountsDTO accountsDTO = new AccountsDTO();
        accountsDTO.setId(accounts.getId());
        accountsDTO.setAccountNumber(accounts.getAccountNumber());
        accountsDTO.setAccountName(accounts.getAccountName());
        accountsDTO.setRoleArn(accounts.getArnNumber());
        return accountsDTO;
    }

}
