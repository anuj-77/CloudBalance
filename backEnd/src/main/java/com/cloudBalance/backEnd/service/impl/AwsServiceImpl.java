package com.cloudBalance.backEnd.service.impl;

import com.cloudBalance.backEnd.dto.aws.ASGResourceDTO;
import com.cloudBalance.backEnd.dto.aws.EC2ResourceDTO;
import com.cloudBalance.backEnd.dto.aws.RDSResourceDTO;
import com.cloudBalance.backEnd.model.awsBuilder.ASGClientBuilder;
import com.cloudBalance.backEnd.model.awsBuilder.EC2ClientBuilder;
import com.cloudBalance.backEnd.model.awsBuilder.RDSClientBuilder;
import com.cloudBalance.backEnd.service.AwsService;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.autoscaling.model.AutoScalingGroup;
import software.amazon.awssdk.services.ec2.model.Reservation;
import software.amazon.awssdk.services.ec2.model.Tag;
import software.amazon.awssdk.services.rds.model.DBInstance;

import java.util.ArrayList;
import java.util.List;

@Service
public class AwsServiceImpl implements AwsService {

    @Override
    public List<EC2ResourceDTO> fetchEC2Instances(String roleArn) {
        var ec2Client = EC2ClientBuilder.buildEC2Client(roleArn);
        var response = ec2Client.describeInstances();
        List<EC2ResourceDTO> result = new ArrayList<>();
        for (Reservation reservation : response.reservations()) {
            reservation.instances().forEach(instance -> {
                EC2ResourceDTO dto = new EC2ResourceDTO();
                dto.setResourceId(instance.instanceId());
                dto.setResourceName(instance
                        .tags()
                        .stream()
                        .filter(t -> t.key().equalsIgnoreCase("Name"))
                        .map(Tag::value)
                        .findAny()
                        .orElse("N/A"));
                dto.setRegion(instance.placement().availabilityZone());
                dto.setStatus(instance.state().nameAsString());
                result.add(dto);
            });
        }
        ;
        return result;
    }

    @Override
    public List<RDSResourceDTO> fetchRDSInstances(String roleArn) {
        var rdsClient = RDSClientBuilder.buildRDSClient(roleArn);
        var response = rdsClient.describeDBInstances();
        List<RDSResourceDTO> result = new ArrayList<>();
        for (DBInstance dbInstance : response.dbInstances()) {
            RDSResourceDTO dto = new RDSResourceDTO();
            dto.setResourceId(dbInstance.dbInstanceIdentifier());
            dto.setResourceName(dbInstance.dbInstanceIdentifier());
            dto.setRegion(dbInstance.availabilityZone());
            dto.setStatus(dbInstance.dbInstanceStatus());
            dto.setEngine(dbInstance.dbInstanceStatus());
            result.add(dto);
        }
        return result;
    }

    @Override
    public List<ASGResourceDTO> fetchASGDetails(String roleArn) {
        var asgClient = ASGClientBuilder.buildASGClient(roleArn);
        var response = asgClient.describeAutoScalingGroups();
        List<ASGResourceDTO> result = new ArrayList<>();
        for (AutoScalingGroup asg : response.autoScalingGroups()) {
            ASGResourceDTO dto = new ASGResourceDTO();
            dto.setResourceId(asg.autoScalingGroupName());
            dto.setResourceName(asg.autoScalingGroupName());
            dto.setRegion(asg.availabilityZones().get(0));
            dto.setDesiredCapacity(asg.desiredCapacity());
            dto.setMinSize(asg.minSize());
            dto.setMaxSize(asg.maxSize());
            dto.setStatus(asg.status());
            result.add(dto);
        }
        return result;
    }

}
