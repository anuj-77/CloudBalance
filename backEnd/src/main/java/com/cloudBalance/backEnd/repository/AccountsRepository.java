package com.cloudBalance.backEnd.repository;

import com.cloudBalance.backEnd.model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Long> {
    AccountsRepository findByAccountNumber(Long accountNumber);
    boolean existsByAccountNumber(Long accountNumber);
}
