package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.APIResponse;
import com.cloudBalance.backEnd.service.impl.SnowflakeServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/snowflake")
public class SnowFlakeController {

    private final SnowflakeServiceImpl snowflakeService;
    public SnowFlakeController(SnowflakeServiceImpl snowflakeService) {
        this.snowflakeService = snowflakeService;
    }
    @GetMapping("/test")
    public ResponseEntity<APIResponse<?>> getData(){
        return ResponseEntity.ok(new APIResponse<>(200, "Success", snowflakeService.getData()));
    }

}
