import React from 'react'
import CopyableCodeContainer from '../../../components/CopyableCodeContainer.jsx/CopyableCodeContainer';
import img2 from '../../../assets/img-2.png';
import img3 from '../../../assets/img-3.png';
import img4 from '../../../assets/img-4.png';
import img5 from '../../../assets/img-5.png';

const AddCustomerManagedPolicies = ({

  formData,
  handleChange,
  handleNext,
  handleBack,
  handleCancel,
  nextLabel,
}) => {
  return (
    <div className="onboarding-container">
      <h1 className="onboarding-title">Add Customer Managed Policies</h1>
      <p className="onboarding-subtitle">
        Follow the steps to attach the required policies.
      </p>

      <div className="onboarding-box">

        <div className="onboarding-step">
        <span className="step-number">1</span>
          <p>Go to the Create Policy Page</p>
        </div>
        <div className="onboarding-step">
        <span className="step-number">2</span>
          <p>Click on the JSON tab and paste the following policy and click on Next:</p>
        </div>
        <CopyableCodeContainer text={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CostAudit",
      "Effect": "Allow",
      "Action": [
        "dms:Describe*",
        "dms:List*",
        "kafka:Describe*",
        "kafka:Get*",
        "kafka:List*",
        "mq:Describe*",
        "mq:List*",
        "route53resolver:Get*",
        "route53resolver:List*",
        "memorydb:Describe*",
        "savingsplans:Describe*",
        "cloudsearch:Describe*",
        "quicksight:Describe*",
        "quicksight:List*",
        "codepipeline:Get*",
        "codepipeline:List*",
        "codebuild:List*",
        "codebuild:Get*",
        "codebuild:Describe*",
        "codebuild:BatchGet*",
        "codedeploy:List*",
        "codedeploy:BatchGet*",
        "codedeploy:Get*",
        "mediaconnect:Describe*",
        "mediaconnect:List*",
        "mediaconvert:Describe*",
        "mediaconvert:Get*",
        "mediaconvert:List*",
        "medialive:Describe*",
        "medialive:List*",
        "mediapackage:Describe*",
        "mediapackage:List*",
        "mediapackage-vod:Describe*",
        "mediapackage-vod:List*",
        "mediastore:DescribeObject",
        "mediastore:Get*",
        "mediastore:List*",
        "mediatailor:Describe*",
        "mediatailor:Get*",
        "mediatailor:List*",
        "ec2:Describe*",
        "elasticache:Describe*",
        "events:DescribeEventBus",
        "events:List*",
        "elasticloadbalancing:Describe*",
        "kinesis:List*",
        "kinesis:Describe*",
        "kinesisanalytics:Describe*",
        "kinesisanalytics:List*",
        "dynamodb:Describe*",
        "dynamodb:List*",
        "cloudwatch:Describe*",
        "cloudwatch:List*",
        "cloudwatch:GetMetricStatistics",
        "ecr:GetLifecyclePolicy",
        "ecr:GetRepositoryPolicy",
        "ecr-public:DescribeRepositories",
        "ecr:List*",
        "ecr:Describe*",
        "lambda:List*",
        "lambda:GetPolicy",
        "lambda:GetAccountSettings",
        "lambda:GetFunctionConfiguration",
        "lambda:GetFunctionCodeSigningConfig",
        "lambda:GetFunctionConcurrency",
        "lambda:GetFunctionConfiguration",
        "rds:Describe*",
        "rds:ListTagsForResource",
        "sqs:GetQueueAttributes",
        "sqs:List*",
        "firehose:Describe*",
        "firehose:List*",
        "kafka:Describe*",
        "kafka:List*",
        "glue:GetDevEndpoint",
        "s3:GetBucketPolicy",
        "s3:List*",
        "network-firewall:Describe*",
        "network-firewall:List*",
        "elasticfilesystem:Describe*",
        "kms:Describe*",
        "kms:List*",
        "kms:GetKeyRotationStatus",
        "kms:GetKeyPolicy",
        "elasticmapreduce:List*",
        "es:Describe*",
        "es:List*",
        "es:Get*",
        "aoss:Get*",
        "aoss:List*",
        "logs:Describe*",
        "logs:List*",
        "application-autoscaling:Describe*",
        "route53:List*",
        "redshift:Describe*",
        "backup:Describe*",
        "backup:Get*",
        "backup:List*",
        "dlm:Get*",
        "dlm:List*",
        "sagemaker:List*",
        "lambda:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "BillingReadOnly",
      "Effect": "Allow",
      "Action": [
        "billingconductor:List*",
        "billing:ListBillingViews"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ComputeOptimizerReadAccess",
      "Effect": "Allow",
      "Action": [
        "compute-optimizer:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CostExplorerAccess",
      "Effect": "Allow",
      "Action": [
        "ce:Describe*",
        "ce:Get*",
        "ce:List*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CURReportDefinitions",
      "Effect": "Allow",
      "Action": [
        "organizations:Describe*",
        "organizations:List*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "PricingAPIAccess",
      "Effect": "Allow",
      "Action": [
        "pricing:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "WellArchitectedAccess",
      "Effect": "Allow",
      "Action": [
        "wellarchitected:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ReadOnlyForOrgServices",
      "Effect": "Allow",
      "Action": [
        "detective:Describe*",
        "detective:List*",
        "detective:Get*",
        "devops-guru:Describe*",
        "devops-guru:List*",
        "devops-guru:Get*",
        "devops-guru:Search*",
        "guardduty:Describe*",
        "guardduty:Get*",
        "guardduty:List*",
        "inspector:Describe*",
        "inspector:Get*",
        "inspector2:List*",
        "inspector2:Get*",
        "inspector2:Describe*",
        "macie2:Describe*",
        "macie2:Get*",
        "macie2:List*",
        "account:Get*",
        "account:ListRegions",
        "auditmanager:Get*",
        "auditmanager:List*",
        "controltower:Describe*",
        "controltower:Get*",
        "controltower:List*",
        "sso:Describe*",
        "sso:List*",
        "sso:Get*",
        "sso:Search*",
        "sso-directory:Describe*",
        "sso-directory:Get*",
        "sso-directory:List*",
        "sso-directory:Search*",
        "aws-marketplace:DescribeAgreement",
        "aws-marketplace:Get*",
        "aws-marketplace:List*",
        "aws-marketplace:ViewSubscriptions",
        "aws-marketplace:SearchAgreements",
        "networkmanager:DescribeGlobalNetworks",
        "networkmanager:Get*",
        "networkmanager:List*",
        "trustedadvisor:Describe*",
        "trustedadvisor:List*",
        "cloudtrail:Describe*",
        "cloudtrail:Get*",
        "cloudtrail:List*",
        "cloudtrail:LookupEvents",
        "cloudformation:Describe*",
        "cloudformation:Get*",
        "cloudformation:List*",
        "compute-optimizer:DescribeRecommendationExportJobs",
        "config:Describe*",
        "config:Get*",
        "config:List*",
        "ds:Describe*",
        "ds:Get*",
        "ds:List*",
        "fms:Get*",
        "fms:List*",
        "access-analyzer:Get*",
        "access-analyzer:List*",
        "healthlake:Describe*",
        "healthlake:GetCapabilities",
        "healthlake:List*",
        "healthlake:ReadResource",
        "healthlake:Search*",
        "health:Describe*",
        "license-manager:Get*",
        "license-manager:List*",
        "servicecatalog:Describe*",
        "servicecatalog:Get*",
        "servicecatalog:List*",
        "servicecatalog:ScanProvisionedProducts",
        "servicecatalog:Search*",
        "securityhub:Describe*",
        "securityhub:Get*",
        "securityhub:List*",
        "ssm:Describe*",
        "ssm:List*",
        "ram:Get*",
        "ram:List*",
        "servicequotas:Get*",
        "servicequotas:List*",
        "s3:Describe*",
        "license-manager:GetGrant",
        "license-manager:ListTokens",
        "license-manager-user-subscriptions:List*"
      ],
      "Resource": "*"
    }
  ]
}`} />
        <div className="onboarding-step">
        <span className="step-number">3</span>
          <p>In the name field,enter below-mentioned policy name and click on Create Policy</p>
        </div>
        <CopyableCodeContainer text={`cktuner-CostAuditPolicy`} />

        <div className="onboarding-step">
        <span className="step-number">4</span>
          <p>Again go to the Create Policy. Page</p>
        </div>
        <div className="onboarding-step">
        <span className="step-number">5</span>
          <p>Click on the JSON tab and paste the following policy and click on Next.</p>
        </div>
        <CopyableCodeContainer text={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SecAudit",
      "Effect": "Allow",
      "Action": [
        "cloudfront:List*",
        "cloudfront:Get*",
        "cloudfront:Describe*",
        "ecr:DescribeRepositories",
        "ecr:BatchGetRepositoryScanningConfiguration",
        "iam:List*",
        "iam:Get*",
        "lambda:GetFunctionConfiguration",
        "lambda:GetFunctionUrlConfig",
        "cloudwatch:GetMetricStatistics",
        "ec2:DescribeInstances",
        "ec2:DescribeVpcs",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeNetworkInterfaces",
        "redshift:DescribeClusters",
        "inspector2:BatchGetAccountStatus",
        "ec2:DescribeFlowLogs",
        "securityhub:GetEnabledStandards",
        "s3:ListAllMyBuckets",
        "s3:GetBucketLogging",
        "s3:GetEncryptionConfiguration",
        "s3:GetBucketPolicyStatus",
        "s3:GetBucketAcl",
        "s3:GetBucketVersioning",
        "s3:GetAccountPublicAccessBlock",
        "s3:GetBucketCORS",
        "s3:GetBucketPolicy",
        "s3:GetBucketVersioning",
        "s3:GetEncryptionConfiguration",
        "s3:GetLifecycleConfiguration",
        "sts:GetCallerIdentity",
        "wafv2:List*",
        "wafv2:Get*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SecAuditServiceQuotas",
      "Effect": "Allow",
      "Action": [
        "states:ListStateMachines",
        "servicequotas:GetServiceQuota",
        "acm:List*",
        "acm:DescribeCertificate",
        "athena:ListWorkGroups",
        "athena:GetWorkGroup",
        "apigateway:GET",
        "autoscaling:Describe*",
        "cloudformation:DescribeAccountLimits",
        "cloudformation:DescribeStacks",
        "cloudwatch:GetMetricData",
        "ds:GetDirectoryLimits",
        "ec2:Describe*",
        "ec2:GetEbsDefaultKmsKeyId",
        "ec2:GetEbsEncryptionByDefault",
        "ecs:Describe*",
        "ecs:List*",
        "eks:Describe*",
        "eks:List*",
        "elasticache:DescribeCacheClusters",
        "elasticache:DescribeCacheParameterGroups",
        "elasticache:DescribeCacheSecurityGroups",
        "elasticache:DescribeCacheSubnetGroups",
        "elasticbeanstalk:DescribeApplicationVersions",
        "elasticbeanstalk:DescribeApplications",
        "elasticbeanstalk:DescribeEnvironments",
        "elasticfilesystem:DescribeFileSystems",
        "firehose:ListDeliveryStreams",
        "lambda:GetAccountSettings",
        "redshift:DescribeClusterSnapshots",
        "redshift:DescribeClusterSubnetGroups",
        "route53:GetHostedZone",
        "route53:GetHostedZoneLimit",
        "route53:ListHostedZones",
        "servicequotas:List*",
        "servicequotas:Get*",
        "ses:Get*",
        "ses:List*",
        "support:Describe*",
        "support:SearchForCases",
        "trustedadvisor:Describe*",
        "trustedadvisor:GenerateReport",
        "trustedadvisor:RefreshCheck",
        "iam:GenerateCredentialReport",
        "iam:GetCredentialReport",
        "secretsmanager:ListSecrets",
        "secretsmanager:DescribeSecret",
        "sns:List*",
        "sns:Get*",
        "artifact:ListReports",
        "artifact:GetReportMetadata",
        "artifact:GetReport",
        "artifact:GetTermForReport"
      ],
      "Resource": "*"
    },
    {
      "Sid": "NewReadAccountBillingPermissions",
      "Effect": "Allow",
      "Action": [
        "consolidatedbilling:GetAccountBillingRole",
        "consolidatedbilling:ListLinkedAccounts",
        "billing:Get*",
        "payments:ListPaymentPreferences",
        "invoicing:GetInvoicePDF",
        "invoicing:ListInvoiceSummaries"
      ],
      "Resource": "*"
    }
  ]
}`} />
        <div className="onboarding-step">
        <span className="step-number">6</span>
          <p>In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy</p>
        </div>
        <CopyableCodeContainer text={`cktuner-SecAuditPolicy`} />
        <div className="onboarding-step">
        <span className="step-number">7</span>
          <p>Again, go to the Create Policy. Page</p>
        </div>
        <div className="onboarding-step">
        <span className="step-number">8</span>
          <p>Click on the JSON tab and paste the following and click on Next:</p>
        </div>
        <CopyableCodeContainer text={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CostExplorer",
      "Action": [
        "ce:StartSavingsPlansPurchaseRecommendationGeneration",
        "ce:UpdatePreferences"
      ],
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Sid": "ListEC2SPReservations",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeCapacityReservations",
        "ec2:DescribeCapacityReservationFleets",
        "ec2:GetCapacityReservationUsage",
        "ec2:GetGroupsForCapacityReservation",
        "ec2:DescribeHostReservations",
        "ec2:DescribeHostReservationOfferings",
        "ec2:GetHostReservationPurchasePreview",
        "ec2:DescribeReservedInstancesOfferings",
        "ec2:DescribeReservedInstancesModifications",
        "ec2:DescribeReservedInstances",
        "ec2:GetReservedInstancesExchangeQuote",
        "ec2:DescribeReservedInstancesListings"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ComputeOptimizerAccess",
      "Effect": "Allow",
      "Action": [
        "compute-optimizer:UpdateEnrollmentStatus",
        "compute-optimizer:PutRecommendationPreferences"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ServiceLinkedRole",
      "Effect": "Allow",
      "Action": "iam:CreateServiceLinkedRole",
      "Resource": "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer*",
      "Condition": {
        "StringLike": {
          "iam:AWSServiceName": "compute-optimizer.amazonaws.com"
        }
      }
    },
    {
      "Sid": "ServiceLinkedRolePolicy",
      "Effect": "Allow",
      "Action": "iam:PutRolePolicy",
      "Resource": "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer"
    },
    {
      "Sid": "AllowRoleToInspectItself",
      "Effect": "Allow",
      "Action": [
        "iam:ListRolePolicies",
        "iam:GetRolePolicy"
      ],
      "Resource": "arn:aws:iam::275595855473:role/CK-Tuner-Role-dev2"
    }
  ]
}`} />
        <div className="onboarding-step">
        <span className="step-number">9</span>
          <p> In the Name field, enter below-mentioned policy and click on Create Policy</p>
        </div>
        <CopyableCodeContainer text={`cktuner-TunerReadEssentials`} />
        <div className="onboarding-step">
        <span className="step-number">10</span>
          <p>Go to  the CK-Tuner-Role</p>
        </div>
        <img src={img2} alt="CK-Tuner" className="onboarding-image"/>




        <div className="onboarding-step">
        <span className="step-number">11</span>
          <p>In Permission policies, click on <strong>Add permissions{`>`}Attach Policy</strong></p>
        </div>
        <img src={img3} alt="Permission-Policies" className="onboarding-image"/>
        <div className="onboarding-step">
        <span className="step-number">12</span>
          <p>Filter by Type {`>`} Customer managed then search for cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials and select them.</p>
        </div>
        <img src={img4} alt="Policies" className="onboarding-image" />
        <div className="onboarding-step">
        <span className="step-number">13</span>
          <p>Now, <strong>click on Add permissions</strong></p>
        </div>
        <div className="onboarding-step">
        <span className="step-number">14</span>
          <p>In Permission policies, <strong>click on Add permissions {`>`} Create inline policy </strong></p>
        </div>
        <img src={img5} alt="Permission policies" className="onboarding-image"/>
        <div className="onboarding-step">
        <span className="step-number">15</span>
          <p>Click on the JSON tab and paste the following policy</p>
        </div>
        <CopyableCodeContainer text={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "cur:ValidateReportDestination",
        "cur:DescribeReportDefinitions"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow",
      "Sid": "ReadCostAndUsageReport"
    },
    {
      "Action": [
        "s3:ListBucket",
        "s3:GetReplicationConfiguration",
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
        "s3:GetObjectVersionTagging",
        "s3:GetObjectRetention",
        "s3:GetObjectLegalHold",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::ck-tuner-275595855473",
        "arn:aws:s3:::ck-tuner-275595855473/*"
      ],
      "Effect": "Allow",
      "Sid": "S3LimitedRead"
    },
    {
      "Action": [
        "s3:GetObjectVersionTagging",
        "s3:GetBucketVersioning",
        "s3:ReplicateObject",
        "s3:ReplicateDelete",
        "s3:ReplicateTags",
        "s3:ObjectOwnerOverrideToBucketOwner"
      ],
      "Resource": [
        "arn:aws:s3:::ck-tuner-cur-dev2-1000291",
        "arn:aws:s3:::ck-tuner-cur-dev2-1000291/*"
      ],
      "Effect": "Allow",
      "Sid": "S3Replicate"
    },
    {
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::ck-tuner-275595855473/CKTunerTestFile",
      "Effect": "Allow",
      "Sid": "S3ReplicationCheck"
    }
  ]
}`} />
        <div className="onboarding-step">
        <span className="step-number">16</span>
          <p>Now,<strong>click on Review policy</strong></p>
        </div>
        <div className="onboarding-step">
        <span className="step-number">17</span>
          <p>In the <strong>Name</strong> field, enter the below-mentioned policy name and click on <strong>Create Policy</strong></p>
        </div>
        <CopyableCodeContainer text={`S3CrossAccountReplication`} />
      </div>
    </div>
  );
};

export default AddCustomerManagedPolicies;