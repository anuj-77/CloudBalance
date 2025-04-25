package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.AccountsDTO;
import com.cloudBalance.backEnd.mapper.AccountsMapper;
import com.cloudBalance.backEnd.model.Accounts;
import com.cloudBalance.backEnd.repository.AccountsRepository;
import com.cloudBalance.backEnd.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountsRepository accountsRepository;
    private final AccountsMapper accountsMapper;


    public AccountsDTO createAccounts(AccountsDTO accountsDTO){
        Accounts accounts = accountsMapper.map(accountsDTO);
        accountsRepository.save(accounts);
        accountsDTO.setId(accounts.getId());
        return accountsDTO;
    }

    public AccountsDTO getAccountByAccountNumber(Long accountNumber){
        Accounts account = (Accounts) accountsRepository.findByAccountNumber(accountNumber);
        return accountsMapper.map(account);
    }

    public List<AccountsDTO> getAllAccounts(){
        List<Accounts> accounts = accountsRepository.findAll();
        return accounts
                .stream()
                .map(accountsMapper::map)
                .collect(Collectors.toList());
    }
}
