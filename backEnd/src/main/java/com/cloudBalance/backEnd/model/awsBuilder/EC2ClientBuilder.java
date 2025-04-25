package com.cloudBalance.backEnd.model.awsBuilder;

import com.cloudBalance.backEnd.utils.AwsCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ec2.Ec2Client;

public class EC2ClientBuilder {
    public static Ec2Client buildEC2Client (String roleArn){
        return Ec2Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(AwsCredentials.createCredentials(roleArn))
                .build();
    }
}
