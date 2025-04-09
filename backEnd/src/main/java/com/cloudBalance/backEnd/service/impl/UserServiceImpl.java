package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.UserDTO;
import com.cloudBalance.backEnd.mapper.UserMapper;
import com.cloudBalance.backEnd.model.User;
import com.cloudBalance.backEnd.repository.UserRepository;
import com.cloudBalance.backEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createUser(UserDTO userDTO){
        User user = userMapper.userMap(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("Password"+user.getPassword());// Hash the password
        userRepository.save(user);
        userDTO.setId(user.getId());
        userDTO.setPassword(user.getPassword());
        return userDTO;
    }
}
