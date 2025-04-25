// /config/awsServiceConfig.js
export const tabMap = [
    { label: "EC2", key: "Ec2" },
    { label: "RDS", key: "Rds" },
    { label: "ASG", key: "Asg" },
  ];
  
  export const awsServiceColumns = {
    Ec2: ["resourceId", "resourceName", "region", "status"],
    Rds: ["resourceId", "resourceName", "engine", "region", "status"],
    Asg: ["resourceId", "resourceName", "region", "desiredCapacity", "minSize", "maxSize", "status"],
  };
  