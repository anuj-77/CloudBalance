package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.UserDTO;
import com.cloudBalance.backEnd.exceptions.AccountNotFoundException;
import com.cloudBalance.backEnd.exceptions.EmailAlreadyExistsException;
import com.cloudBalance.backEnd.exceptions.UserNotFoundException;
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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new EmailAlreadyExistsException("A user with this email already exists" );
        }
        userRepository.save(user);

        userDTO.setId(user.getId());
        userDTO.setPassword(user.getPassword());

        return userDTO;
    }

    @Override
    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return userMapper.userDTOMapWithoutPassword(user);
    }

    @Transactional
    @Override
    public String updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + currentUsername));

        if (currentUser.getId().equals(id)) {
            // Prevent role change and logout
            SecurityContextHolder.clearContext();
            throw new AccessDeniedException("Admins cannot change their own role. You have been logged out.");
        }

        existingUser.setEmail(userDTO.getEmail());
        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());

        // Update role
        ERole newRole = ERole.valueOf(userDTO.getRole());
        existingUser.setRole(newRole);

        // Handle account associations based on role
        if (newRole == ERole.CUSTOMER) {
            if (userDTO.getAccounts() != null && !userDTO.getAccounts().isEmpty()) {
                List<Accounts> accountList = userDTO.getAccounts().stream()
                        .map(accountId -> accountsRepository.findById(accountId)
                                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + accountId)))
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
        return users.stream().map(userMapper:: userDTOMapWithoutPassword).toList();
    }


    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return userMapper.userDTOMapWithoutPassword(user);
    }


    public UserDTO getCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("Logged-in user not found with email: " + email));
        return userMapper.userDTOMapWithoutPassword(user);
    }

}
