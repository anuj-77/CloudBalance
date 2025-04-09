package com.cloudBalance.backEnd.mapper;

import com.cloudBalance.backEnd.dto.UserDTO;
import com.cloudBalance.backEnd.model.ERole;
import com.cloudBalance.backEnd.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User userMap (UserDTO userDTO) {

        User entity = new User();
        entity.setId(userDTO.getId());
        entity.setName(userDTO.getName());
        entity.setEmail(userDTO.getEmail());
        entity.setPassword(userDTO.getPassword());
        entity.setRole(ERole.valueOf(userDTO.getRole()));
        return entity;
    }
    public UserDTO userDTOMap (User entity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(entity.getId());
        userDTO.setName(entity.getName());
        userDTO.setEmail(entity.getEmail());
        userDTO.setPassword(entity.getPassword());
        userDTO.setRole(entity.getRole().name());   //String.valueOf(entity.getRole())
        return userDTO;
    }


}
