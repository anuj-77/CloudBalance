package com.cloudBalance.backEnd.service;

import com.cloudBalance.backEnd.dto.aws.ASGResourceDTO;
import com.cloudBalance.backEnd.dto.aws.EC2ResourceDTO;
import com.cloudBalance.backEnd.dto.aws.RDSResourceDTO;

import java.util.List;

public interface AwsService {

    List<EC2ResourceDTO> fetchEC2Instances(String roleArn);
    List<RDSResourceDTO> fetchRDSInstances(String roleArn);
    List<ASGResourceDTO> fetchASGDetails(String roleArn);
}
