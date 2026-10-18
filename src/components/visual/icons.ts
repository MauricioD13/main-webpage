// Official AWS architecture icons, rendered to static SVG at build time.
// Keys are what project authors write in diagram data (e.g. icon: "lambda").
import ec2 from "aws-react-icons/lib/icons/ArchitectureServiceAmazonEC2";
import s3 from "aws-react-icons/lib/icons/ArchitectureServiceAmazonSimpleStorageService";
import lambda from "aws-react-icons/lib/icons/ArchitectureServiceAWSLambda";
import rds from "aws-react-icons/lib/icons/ArchitectureServiceAmazonRDS";
import route53 from "aws-react-icons/lib/icons/ArchitectureServiceAmazonRoute53";
import waf from "aws-react-icons/lib/icons/ArchitectureServiceAWSWAF";
import asg from "aws-react-icons/lib/icons/ArchitectureServiceAWSAutoScaling";
import iam from "aws-react-icons/lib/icons/ArchitectureServiceAWSIdentityandAccessManagement";
import cloudwatch from "aws-react-icons/lib/icons/ArchitectureServiceAmazonCloudWatch";
import sns from "aws-react-icons/lib/icons/ArchitectureServiceAmazonSimpleNotificationService";
import eventbridge from "aws-react-icons/lib/icons/ArchitectureServiceAmazonEventBridge";
import athena from "aws-react-icons/lib/icons/ArchitectureServiceAmazonAthena";
import ecs from "aws-react-icons/lib/icons/ArchitectureServiceAmazonElasticContainerService";
import ecr from "aws-react-icons/lib/icons/ArchitectureServiceAmazonElasticContainerRegistry";
import ssm from "aws-react-icons/lib/icons/ResourceAWSSystemsManagerParameterStore";
import cloudfront from "aws-react-icons/lib/icons/ArchitectureServiceAmazonCloudFront";
import shield from "aws-react-icons/lib/icons/ArchitectureServiceAWSShield";
import optimizer from "aws-react-icons/lib/icons/ArchitectureServiceAWSComputeOptimizer";
import costexplorer from "aws-react-icons/lib/icons/ArchitectureServiceAWSCostExplorer";
import codepipeline from "aws-react-icons/lib/icons/ArchitectureServiceAWSCodePipeline";
import securityhub from "aws-react-icons/lib/icons/ArchitectureServiceAWSSecurityHub";
import guardduty from "aws-react-icons/lib/icons/ArchitectureServiceAmazonGuardDuty";
import glue from "aws-react-icons/lib/icons/ArchitectureServiceAWSGlue";
import igw from "aws-react-icons/lib/icons/ResourceAmazonVPCInternetGateway";
import alb from "aws-react-icons/lib/icons/ResourceElasticLoadBalancingApplicationLoadBalancer";
import client from "aws-react-icons/lib/icons/ResourceClient";
import efs from "aws-react-icons/lib/icons/ArchitectureServiceAmazonEFS";
import acm from "aws-react-icons/lib/icons/ArchitectureServiceAWSCertificateManager";
import fargate from "aws-react-icons/lib/icons/ArchitectureServiceAWSFargate";

export const awsIcons = {
  ec2,
  s3,
  lambda,
  rds,
  route53,
  waf,
  asg,
  iam,
  cloudwatch,
  sns,
  eventbridge,
  athena,
  ecs,
  ecr,
  ssm,
  cloudfront,
  shield,
  optimizer,
  costexplorer,
  codepipeline,
  securityhub,
  guardduty,
  glue,
  igw,
  alb,
  client,
  efs,
  acm,
  fargate,
} as const;

export type AwsIconKey = keyof typeof awsIcons;
