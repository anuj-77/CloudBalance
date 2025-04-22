package com.cloudBalance.backEnd.mapper;

import com.cloudBalance.backEnd.dto.UserDTO;
import com.cloudBalance.backEnd.model.Accounts;
import com.cloudBalance.backEnd.model.ERole;
import com.cloudBalance.backEnd.model.User;
import com.cloudBalance.backEnd.repository.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    @Autowired
    private AccountsRepository accountsRepository;

    public User userMap (UserDTO userDTO) {

        User entity = new User();
        entity.setId(userDTO.getId());
//        entity.setName(userDTO.getName());
        entity.setFirstName(userDTO.getFirstName());
        entity.setLastName(userDTO.getLastName());
        entity.setEmail(userDTO.getEmail());
        entity.setPassword(userDTO.getPassword());
        entity.setLastLogin(userDTO.getLastLogin());
        entity.setRole(ERole.valueOf(userDTO.getRole()));

        if (userDTO.getAccounts() != null && !userDTO.getAccounts().isEmpty()) {
            List<Accounts> accounts = userDTO.getAccounts().stream().map(id -> {
                return accountsRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Account not found with id: " + id)
                        );
            }).collect(Collectors.toList());

            entity.setAccounts(accounts);
        } else {entity.setAccounts(Collections.emptyList());

        };
        
        return entity;
    }
    public UserDTO userDTOMap (User entity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(entity.getId());
//        userDTO.setName(entity.getName());
        userDTO.setFirstName(entity.getFirstName());
        userDTO.setLastName(entity.getLastName());
        userDTO.setLastLogin(entity.getLastLogin());
        userDTO.setEmail(entity.getEmail());
        userDTO.setPassword(entity.getPassword());
        userDTO.setRole(entity.getRole().name());   //String.valueOf(entity.getRole())?(Understand this part)
        userDTO.setAccounts(entity.getAccounts().stream().map(Accounts::getId).collect(Collectors.toList()));
        return userDTO;
    }

    public UserDTO userDTOMapWithoutPassword(User entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setRole(String.valueOf(entity.getRole()));
        dto.setLastLogin(entity.getLastLogin());
        dto.setAccounts(entity.getAccounts().stream().map(Accounts::getId).collect(Collectors.toList()));
        return dto;
    }

}
