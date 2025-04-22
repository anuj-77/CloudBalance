package com.cloudBalance.backEnd.service;

import com.cloudBalance.backEnd.dto.UserDTO;

import java.util.List;

public interface UserService {
    public UserDTO createUser(UserDTO userDTO);
    public UserDTO getUser(Long id);
    public String updateUser(Long id, UserDTO userDTO);
    public List<UserDTO> getAllUsers();
    public UserDTO getCurrentUser();
}
