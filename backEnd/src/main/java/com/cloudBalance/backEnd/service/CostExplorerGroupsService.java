package com.cloudBalance.backEnd.service;

import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerGroupsDTO;

import java.util.List;

public interface CostExplorerGroupsService {
    public List<CostExplorerGroupsDTO> getALlCostExplorerGroups();
}
