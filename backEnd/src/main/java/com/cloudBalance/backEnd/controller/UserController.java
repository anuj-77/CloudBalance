package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.UserDTO;
import com.cloudBalance.backEnd.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY', 'CUSTOMER')")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        UserDTO userDTO = userService.getUser(id);
        return ResponseEntity.ok(userDTO);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String>updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        String updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("current-user")
    public ResponseEntity<UserDTO>getCurrentUser(){
        UserDTO dto = userService.getCurrentUser();
        return ResponseEntity.ok(dto);
    }



}
