package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerGroupsDTO;
import com.cloudBalance.backEnd.mapper.CostExplorerGroupsMapper;
import com.cloudBalance.backEnd.repository.CostExplorerGroupsRepository;
import com.cloudBalance.backEnd.service.CostExplorerGroupsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CostExplorerGroupsServiceImpl implements CostExplorerGroupsService {

    private final CostExplorerGroupsRepository costExplorerGroupsRepository;
    public CostExplorerGroupsServiceImpl(CostExplorerGroupsRepository costExplorerGroupsRepository) {
        this.costExplorerGroupsRepository = costExplorerGroupsRepository;
    }

    public List<CostExplorerGroupsDTO> getALlCostExplorerGroups(){
        return costExplorerGroupsRepository.findAll()
                .stream()
                .map(CostExplorerGroupsMapper::toDTO)
                .collect(Collectors.toList());
    }
}
