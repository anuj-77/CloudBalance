package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerRequest;
import com.cloudBalance.backEnd.repository.SnowFlakeRepository;
import com.cloudBalance.backEnd.utils.SqlQueryGenerator;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class SnowflakeServiceImpl {

    private final SnowFlakeRepository snowFlakeRepository;

    public List<Map<String, Object>> getData() {
        return snowFlakeRepository.getData();
    }

    public Object getTotalCosting(@Valid CostExplorerRequest request) {
        String req = SqlQueryGenerator.generateCostExplorerQuery(request);
        return snowFlakeRepository.getCostExplorerData(req);
    }

}
