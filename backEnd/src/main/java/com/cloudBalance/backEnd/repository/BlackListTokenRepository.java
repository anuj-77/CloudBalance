package com.cloudBalance.backEnd.repository;

import com.cloudBalance.backEnd.model.BlackListToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlackListTokenRepository extends JpaRepository<BlackListToken, Long> {
    BlackListToken findByToken(String token);
    void deleteByToken(String token);

    boolean existsByToken(String jwt);
}

