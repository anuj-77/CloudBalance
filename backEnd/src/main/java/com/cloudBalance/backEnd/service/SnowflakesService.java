package com.cloudBalance.backEnd.service;


import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerRequest;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

public interface SnowflakesService {
    public List<Map<String, Object>> getData();
    public Object getTotalCosting(@Valid CostExplorerRequest request);
}
