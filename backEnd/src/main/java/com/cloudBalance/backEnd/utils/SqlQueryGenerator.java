package com.cloudBalance.backEnd.utils;

import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerRequest;
import com.cloudBalance.backEnd.repository.CostExplorerGroupsRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SqlQueryGenerator {

    private final CostExplorerGroupsRepository costExplorerGroupsRepository;
    public SqlQueryGenerator(CostExplorerGroupsRepository costExplorerGroupsRepository) {
        this.costExplorerGroupsRepository = costExplorerGroupsRepository;
    }

    public static String generateCostExplorerQuery(CostExplorerRequest request) {


        StringBuilder query = new StringBuilder();

        // Validate group by field
        String groupByField = request.getGroupBy();
        if (groupByField == null || groupByField.trim().isEmpty()) {
            throw new IllegalArgumentException("GroupBy field cannot be null or empty");
        }

        // SELECT clause with monthly grouping
        query.append("SELECT TO_CHAR(USAGESTARTDATE, 'YYYY-MM') AS USAGE_MONTH, ")
                .append(groupByField).append(", ")
                .append("SUM(LINEITEM_USAGEAMOUNT) AS TOTAL_USAGE_COST ")
                .append("FROM COST_EXPLORER WHERE ");

        // Monthly date filter (only if dates are provided)
        if (request.getStartDate() != null && request.getEndDate() != null) {
            query.append("USAGESTARTDATE BETWEEN TO_DATE('")
                    .append(request.getStartDate()).append("') AND TO_DATE('")
                    .append(request.getEndDate()).append("') ");
        } else {
            query.append("1=1 ");  // no date filter if not provided
        }

        // Apply accountNumber filter separately if provided
        if (request.getAccountNumber() != null && !request.getAccountNumber().isEmpty()) {
            query.append("AND LINKEDACCOUNTID = '")
                    .append(request.getAccountNumber().replace("'", "''"))
                    .append("' ");
        }

        // Apply dynamic filters
        if (request.getFilters() != null && !request.getFilters().isEmpty()) {
            for (Map.Entry<String, List<String>> entry : request.getFilters().entrySet()) {
                String column = entry.getKey();
                List<String> values = entry.getValue();

                if (values != null && !values.isEmpty()) {
                    String inClause = values.stream()
                            .map(val -> "'" + val.replace("'", "''") + "'")
                            .collect(Collectors.joining(", "));
                    query.append("AND ").append(column).append(" IN (").append(inClause).append(") ");
                }
            }
        }

        // GROUP BY and ORDER BY for monthly result
        query.append("GROUP BY TO_CHAR(USAGESTARTDATE, 'YYYY-MM'), ")
                .append(groupByField).append(" ")
                .append("ORDER BY USAGE_MONTH, TOTAL_USAGE_COST DESC");

        return query.toString();
    }
}
