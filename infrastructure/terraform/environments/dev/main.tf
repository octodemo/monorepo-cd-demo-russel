# Development Environment Configuration
terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # Configure your S3 backend here
    # bucket = "your-terraform-state-bucket"
    # key    = "monorepo/dev/terraform.tfstate"
    # region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = var.project
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

locals {
  availability_zones = ["${var.aws_region}a", "${var.aws_region}b"]
}

# VPC Module
module "vpc" {
  source = "../../modules/vpc"
  
  project            = var.project
  environment        = var.environment
  vpc_cidr          = "10.0.0.0/16"
  availability_zones = local.availability_zones
  public_subnet_cidrs = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]
  private_subnet_cidrs = [
    "10.0.10.0/24",
    "10.0.20.0/24"
  ]
}