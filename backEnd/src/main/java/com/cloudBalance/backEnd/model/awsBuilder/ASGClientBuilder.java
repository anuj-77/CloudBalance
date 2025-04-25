package com.cloudBalance.backEnd.model.awsBuilder;

import com.cloudBalance.backEnd.utils.AwsCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.autoscaling.AutoScalingClient;

public class ASGClientBuilder {
    public static AutoScalingClient buildASGClient (String roleArn){
        return AutoScalingClient.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(AwsCredentials.createCredentials(roleArn))
                .build();
    }
}
