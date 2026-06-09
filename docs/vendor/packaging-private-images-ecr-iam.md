# Configure OpenID Connect authentication with Amazon ECR

This topic describes how to configure AWS Identity and Access Management (IAM) authentication for the Replicated proxy registry. This lets the registry pull images from Amazon Elastic Container Registry (ECR) without using long-lived AWS access keys.

For the standard ECR setup using an AWS access key and secret key, see [Add and Manage External Registries](packaging-private-images).

## Overview

When you use IAM authentication for ECR, the Replicated vendor API acts as an OpenID Connect (OIDC) identity provider. AWS IAM trusts this identity provider. The Replicated proxy registry assumes an IAM role in your AWS account and obtains short-lived credentials to pull images from your ECR repositories.

The Replicated platform does not store long-lived AWS credentials. The proxy registry generates an internal OIDC token for each request and exchanges it with AWS Security Token Service (STS) for temporary credentials.

## Prerequisites

* An ECR repository with the images that you want to proxy.
* Access to the AWS IAM console in the account that owns the ECR repository.
* If you do not see the **IAM Authentication** option in the Vendor Portal, contact your Replicated account representative.

## Step 1: Register Replicated as an OIDC Provider in AWS

Create an OpenID Connect identity provider in AWS IAM that trusts the Replicated vendor API.

1. In the AWS Console, go to **IAM > Identity providers**.
1. Click **Add provider**.
1. Select **OpenID Connect**.
1. For **Provider URL**, enter the **Issuer URL** shown in the Vendor Portal, which is `https://api.replicated.com/vendor`. Do not include a trailing slash.
1. For **Audience**, enter `sts.amazonaws.com`.
1. AWS automatically fetches the thumbprint from the TLS certificate. If it does not, click **Get thumbprint**.
1. Verify that the thumbprint matches the value shown in the Vendor Portal. If it differs, paste the Vendor Portal thumbprint into the **Thumbprint** field.
1. Click **Add provider**.

AWS verifies that the discovery document and JSON Web Key Set (JWKS) are reachable at the provider URL.

## Step 2: Create an IAM role

Create an IAM role that the Replicated proxy service can assume.

1. In the AWS Console, go to **IAM > Roles**.
1. Click **Create role**.
1. For **Trusted entity type**, select **Web identity**.
1. For **Identity provider**, select the OIDC provider that you created in Step 1.
1. For **Audience**, select `sts.amazonaws.com`.
1. Click **Next**.
1. On the **Add permissions** page, do not attach any permissions yet. Click **Next**.
1. Enter a **Role name** (for example, `ReplicatedECRPullRole`) and click **Create role**.

## Step 3: Attach ECR permissions to the role

Attach a permissions policy to the IAM role so that it can read images from ECR.

**Option A: Use the AWS managed policy (recommended)**

1. On the IAM role details page, click the **Permissions** tab.
1. Click **Add permissions > Attach policies**.
1. Search for `AmazonEC2ContainerRegistryReadOnly`.
1. Select **AmazonEC2ContainerRegistryReadOnly**.
1. Click **Add permissions**.

**Option B: Create an inline policy with minimal permissions**

1. On the IAM role details page, click the **Permissions** tab.
1. Click **Add permissions > Create inline policy**.
1. Switch to the **JSON** tab and paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage"
    ],
    "Resource": "*"
  }]
}
```

   :::note
   You can replace `"*"` with an array of specific ECR repository Amazon Resource Names (ARNs) to limit which registries this role can access. For example, `["arn:aws:ecr:us-east-1:123456789012:repository/image1/*", "arn:aws:ecr:us-east-1:123456789012:repository/image2/*"]`.
   :::

1. Click **Next**.
1. Enter a **Policy name** (for example, `ReplicatedECRReadOnly`) and click **Create policy**.

## Step 4: Add the external registry in the Vendor Portal

After you create the AWS role and grant it ECR permissions, add the external registry in the Vendor Portal using IAM authentication.

1. In the Vendor Portal, go to an application and select **Image Registries > Add external registry**.
1. Select **Amazon ECR** as the provider.
1. For **Hostname**, enter the ECR endpoint (for example, `123456789012.dkr.ecr.us-east-1.amazonaws.com`).
1. For **Auth Type**, select **IAM Authentication**.
1. The **AWS OIDC Configuration** panel appears, showing the following read-only values:
   * **Issuer URL**: `https://api.replicated.com`
   * **Audience**: `sts.amazonaws.com`
   * **Thumbprint**: `<dynamically computed value>`
   * **Subject Type**: `team`
1. In the **AWS Role ARN** field, paste the Amazon Resource Name (ARN) of the IAM role that you created (for example, `arn:aws:iam::123456789012:role/ReplicatedECRPullRole`).
1. At this point, the Vendor Portal generates a valid **Trust policy** and displays it on the page. You can click **Save** to create the registry. However, the **Test** button does not work because the setup remains incomplete until you configure the **Trust policy** as described in the following step.

## Step 5: Edit the trust policy

To complete the external registry setup, edit the trust policy for the IAM role. Use the exact values shown in the Vendor Portal.

1. In the AWS Console, go to **IAM > Roles** and open the role that you created in Step 2.
1. Click the **Trust relationships** tab, then click **Edit trust policy**.
1. Replace the entire trust policy JSON with the **Trust Policy** shown in the Vendor Portal. The Vendor Portal pre-fills this JSON with your specific values (team ID as `sub`, issuer URL as the provider, and `sts.amazonaws.com` as the audience).
1. Click **Update policy**.

The following is an example trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::123456789012:oidc-provider/api.replicated.com/vendor"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "api.replicated.com/vendor:aud": "sts.amazonaws.com",
        "api.replicated.com/vendor:sub": "team-abc-123"
      }
    }
  }]
}
```

After you update the trust policy, return to the Vendor Portal and click **Test** to verify that the Vendor Portal can access the registry.

## Related topics

* [Add and Manage External Registries](packaging-private-images)
* [Tutorial: Using ECR for Private Images](tutorial-ecr-private-images)
* [About the Replicated Proxy Registry](private-images-about)
