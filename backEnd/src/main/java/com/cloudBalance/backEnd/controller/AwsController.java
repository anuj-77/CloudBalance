package com.cloudBalance.backEnd.controller;

import com.cloudBalance.backEnd.dto.aws.ASGResourceDTO;
import com.cloudBalance.backEnd.dto.aws.EC2ResourceDTO;
import com.cloudBalance.backEnd.dto.aws.RDSResourceDTO;
import com.cloudBalance.backEnd.service.AwsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/aws")
public class AwsController {

    private final AwsService awsService;
    public AwsController(AwsService awsService) {
        this.awsService = awsService;
    }


    @GetMapping("/ec2")
    public ResponseEntity<List<EC2ResourceDTO>> getEC2Instances(
            @RequestParam String roleArn){
        var result = awsService.fetchEC2Instances(roleArn);
        log.info(result.toString());
        return ResponseEntity.ok(result);   // localhost:8080/api/aws/ec2?roleArn=arn:aws:iam::561251198730:role/EC2_RDS_Full_Access_karan
    }

    @GetMapping("/rds")
    public ResponseEntity<List<RDSResourceDTO>> getRDSInstances(
            @RequestParam String roleArn){
        var result = awsService.fetchRDSInstances(roleArn);
        return ResponseEntity.ok(result);   // localhost:8080/api/aws/rds?roleArn=arn:aws:iam::561251198730:role/EC2_RDS_Full_Access_karan
    }

    @GetMapping("/asg")
    public ResponseEntity<List<ASGResourceDTO>> getASGInstances(@RequestParam String roleArn){
        var result = awsService.fetchASGDetails(roleArn);
        return ResponseEntity.ok(result);   // localhost:8080/api/aws/asg?roleArn=arn:aws:iam::561251198730:role/EC2_RDS_Full_Access_karan
    }


}
