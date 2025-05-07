package com.cloudBalance.backEnd.dto.snowFlake;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class UserCostExplorerRequest {
    @NotNull
    private String startMonth; //  "YYYY-MM"
    private String endMonth;
    private String groupBy;
    private Map<String, List<String>> filters;
    private String accountNumber;
}
