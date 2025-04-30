package com.cloudBalance.backEnd.repository;

import com.cloudBalance.backEnd.model.CostExplorerGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CostExplorerGroupsRepository extends JpaRepository<CostExplorerGroups, Long> {
}
