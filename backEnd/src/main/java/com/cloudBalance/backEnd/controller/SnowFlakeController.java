package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.APIResponse;
import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerRequest;
import com.cloudBalance.backEnd.dto.snowFlake.UserCostExplorerRequest;
import com.cloudBalance.backEnd.service.impl.SnowflakeServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/cost")
    public ResponseEntity<APIResponse<?>> getTotalCosting(@Valid @RequestBody UserCostExplorerRequest request) {
        return ResponseEntity.ok(
                new APIResponse<>(200, "Success", snowflakeService.getTotalCosting(request))
        );
    }

    @GetMapping("/filters")
    public ResponseEntity<APIResponse<List<String>>> getFilterOptions(@RequestParam("groupBy") String groupByField) {
        List<String> options = snowflakeService.getFilterOptions(groupByField);
        return ResponseEntity.ok(new APIResponse<>(200, "Success", options));
    }

}
