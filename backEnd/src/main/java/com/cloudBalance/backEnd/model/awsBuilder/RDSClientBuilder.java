package com.cloudBalance.backEnd.model.awsBuilder;

import software.amazon.awssdk.services.rds.RdsClient;

public class RDSClientBuilder {
    public static RdsClient buildRDSClient (String roleArn){
        return RdsClient.builder()
                .region(software.amazon.awssdk.regions.Region.US_EAST_1)
                .credentialsProvider(com.cloudBalance.backEnd.utils.AwsCredentials.createCredentials(roleArn))
                .build();
    }
}
