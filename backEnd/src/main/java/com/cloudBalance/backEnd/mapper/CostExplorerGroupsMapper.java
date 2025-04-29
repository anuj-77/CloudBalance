package com.cloudBalance.backEnd.mapper;

import com.cloudBalance.backEnd.dto.snowFlake.CostExplorerGroupsDTO;
import com.cloudBalance.backEnd.model.CostExplorerGroups;

public class CostExplorerGroupsMapper {
    public static CostExplorerGroupsDTO toDTO(CostExplorerGroups groups){
        CostExplorerGroupsDTO dto = new CostExplorerGroupsDTO();
        dto.setId(groups.getId());
        dto.setGroupName(groups.getGroupName());
        dto.setDisplayName(groups.getDisplayName());
        return dto;
    }

    public static CostExplorerGroups toEntity(CostExplorerGroupsDTO dto){
        CostExplorerGroups groups = new CostExplorerGroups();
        groups.setId(dto.getId());
        groups.setGroupName(dto.getGroupName());
        groups.setDisplayName(dto.getDisplayName());
        return groups;
    }


}
