package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.APIResponse;
import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerGroupsDTO;
import com.cloudBalance.backEnd.service.impl.CostExplorerGroupsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/snowflake")
public class CostExplorerController {
    private final CostExplorerGroupsServiceImpl costExplorerGroupsService;
    public CostExplorerController(CostExplorerGroupsServiceImpl costExplorerGroupsService) {
        this.costExplorerGroupsService = costExplorerGroupsService;
    }

    @GetMapping("/group-by-options")
    public ResponseEntity<APIResponse<List<CostExplorerGroupsDTO>>> getAllGroupByOptions() {
        List<CostExplorerGroupsDTO> groups = costExplorerGroupsService.getALlCostExplorerGroups();
        return ResponseEntity.ok(new APIResponse<>(200, "Success", groups));
    }
}
