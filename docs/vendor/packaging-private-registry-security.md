# Replicated Private Registry Security

This document lists the security measures and processes in place to ensure that images pushed to the Replicated private registry remain private. For more information about pushing images to the Replicated private registry, see [Push Images to the Replicated Private Registry](packaging-private-images#push-images-to-the-replicated-private-registry) in _Connecting to an Image Registry_.


## Single Tenant Isolation

The registry is deployed and managed as a multi-tenant application, but each tenant is completely isolated from data that is created and pulled by other tenants. Docker images have shared base layers, but the private registry does not share these between tenants. For example, if a tenant creates an image `FROM postgres:10.3` and pushes the image to Replicated, all of the layers are uploaded, even if other tenants have this base layer uploaded.

A tenant in the private registry is a team on the Replicated [vendor portal](https://vendor.replicated.com). Licenses and customers created by the team are also granted some permissions to the registry data, as specified in the following sections. Cross-tenant access is never allowed in the private registry.


## Authentication and Authorization

The private registry supports several methods of authentication. Public access is never allowed because the registry only accepts authenticated requests.


### Vendor Authentication

All accounts with read/write access on the vendor portal have full access to all images pushed by the tenant to the registry. These users can push and pull images to and from the registry.


### End Customer Authentication

A valid (unexpired) license file has an embedded `registry_token` value. Replicated components shipped to customers use this value to authenticate to the registry. Only pull access is enabled when authenticating using a `registry_token`. A `registry_token` has pull access to all images in the tenant's account. All requests to pull images are denied when a license expires or the expiration date is changed to a past date.


## Networking and Infrastructure

A dedicated cluster is used to run the private registry and is not used for any services.

The registry metadata is stored in a shared database instance. This database contains information about each layer in an image, but not the image data itself.

The registry image data is securely stored in an encrypted S3 bucket. Each layer is encrypted at rest, using a shared key stored in [Amazon Key Management Service](https://aws.amazon.com/kms/). Each tenant has a unique directory in the shared bucket and access is limited to the team or license making the request.

The registry cluster runs on a hardened operating system image (CentOS-based), and all instances are on a private virtual private cloud (VPC). Public IP addresses are not assigned to the instances running the cluster and the registry images. Instead, only port 443 traffic is allowed from a layer 7 load balancer to these servers.

There are no SSH public keys on these servers, and password-based SSH login is disallowed. The servers are not configured to have any remote access. All deployments to these servers are automated using tools such as Terraform and a custom-built CI/CD process. Only verified images are pulled and run.


## Runtime Monitoring

Replicated uses a Web Application Firewall (WAF) on the cluster that monitors and blocks any unusual activity. When unusual activity is detected, access from that endpoint is automatically blocked for a period of time, and a Replicated site reliability engineer (SRE) is alerted.


## Penetration Testing

Replicated completed a formal pen test that included the private registry in the scope of the test. Replicated also runs a bug bounty program and encourages responsible disclosure on any vulnerabilities that are found.
