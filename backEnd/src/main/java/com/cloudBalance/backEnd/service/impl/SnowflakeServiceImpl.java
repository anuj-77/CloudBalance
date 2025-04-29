package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerRequest;
import com.cloudBalance.backEnd.dto.snowFlake.UserCostExplorerRequest;
import com.cloudBalance.backEnd.repository.SnowFlakeRepository;
import com.cloudBalance.backEnd.utils.SqlQueryGenerator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class SnowflakeServiceImpl {

    private final SnowFlakeRepository snowFlakeRepository;

    public List<Map<String, Object>> getData() {
        return snowFlakeRepository.getData();
    }

    public Object getTotalCosting(UserCostExplorerRequest userRequest) {
        // Convert month strings to LocalDate range
        YearMonth startMonth = YearMonth.parse(userRequest.getStartMonth());
        YearMonth endMonth = YearMonth.parse(userRequest.getEndMonth());

        // Create internal request
        CostExplorerRequest request = new CostExplorerRequest();
        request.setStartDate(startMonth.atDay(1)); // e.g., 2024-11-01
        request.setEndDate(endMonth.atEndOfMonth()); // e.g., 2025-04-30
        request.setGroupBy(userRequest.getGroupBy());
        request.setFilters(userRequest.getFilters());

        // Generate SQL and return results
        String sql = SqlQueryGenerator.generateCostExplorerQuery(request);
        return snowFlakeRepository.getCostExplorerData(sql);
    }
    public List<String> getFilterOptions(String groupByField) {
        return snowFlakeRepository.fetchDistinctValues(groupByField);
    }
}
