package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.UserDTO;
import com.cloudBalance.backEnd.mapper.UserMapper;
import com.cloudBalance.backEnd.model.Accounts;
import com.cloudBalance.backEnd.model.ERole;
import com.cloudBalance.backEnd.model.User;
import com.cloudBalance.backEnd.repository.AccountsRepository;
import com.cloudBalance.backEnd.repository.UserRepository;
import com.cloudBalance.backEnd.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AccountsRepository accountsRepository;

    @Override
    public UserDTO createUser(UserDTO userDTO){

        User user = userMapper.userMap(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("Password"+user.getPassword());

        userRepository.save(user);

        userDTO.setId(user.getId());
        userDTO.setPassword(user.getPassword());

        return userDTO;
    }

    @Override
    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return userMapper.userDTOMapWithoutPassword(user);
    }

@Transactional
@Override
public String updateUser(Long id, UserDTO userDTO) {
    User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

    existingUser.setEmail(userDTO.getEmail());
    existingUser.setFirstName(userDTO.getFirstName());
    existingUser.setLastName(userDTO.getLastName());

    // Update password if provided
//    if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
//        existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
//    }

    // Update role
    ERole newRole = ERole.valueOf(userDTO.getRole());
    existingUser.setRole(newRole);

    // Handle account associations based on role
    if (newRole == ERole.CUSTOMER) {
        if (userDTO.getAccounts() != null && !userDTO.getAccounts().isEmpty()) {
            List<Accounts> accountList = userDTO.getAccounts().stream()
                    .map(accountId -> accountsRepository.findById(accountId)
                            .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId)))
                    .collect(Collectors.toList());
            existingUser.setAccounts(accountList);
        }
    } else {
        // Clear accounts if role is not CUSTOMER
        existingUser.setAccounts(new ArrayList<>());
    }

    userRepository.save(existingUser);
    return "User Updated";
}


    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper:: userDTOMap).toList();
    }


    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return userMapper.userDTOMapWithoutPassword(user);
    }


    public UserDTO getCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return userMapper.userDTOMapWithoutPassword(user);
    }

}
