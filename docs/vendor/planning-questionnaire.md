# Customer Application Deployment Questionnaire

Before you package and distribute an application, Replicated recommends that you
understand several key characteristics about the environments where your customers
will deploy your application.

To gather this information about your customers' environments:
1. Copy and customize the [$APP Deployment Questionnaire](#app-deployment-questionnaire) below.
1. Replace $APP with the name of your application.
1. Send the questionnaire to your users.

## $APP Deployment Questionnaire

### Infrastructure

This section includes questions about your infrastructure and how you deploy software.
This includes both internally-written and Commercial Off The Shelf (COTS) applications.

If it’s more convenient, limit answers to the scope of the target infrastructure for deploying $APP.

- Do you use any IaaS like AWS, GCP, or Azure?

- If you deploy to a physical datacenter, do you use a Hypervisor like VSphere?

- Do you ever install on bare metal?

- Do you have any restrictions on what operating systems are used?

- Does the target infrastructure have a direct outbound internet connection? Can it connect out via a Proxy?

- If the environment has no outbound network, do machines in a DMZ have direct network access to the air gapped infrastructure, or do release artifacts need to be copied to physical media for installation?

- If there is an issue causing downtime in the on-prem application, would you be willing to give the $APP team direct SSH access to the instance(s)?

### Development and Deployment Processes

- Do you require applications be deployed by a configuration management framework like Chef, Ansible, or Puppet?

- Do you run any container-based workloads today?

- If you run container workloads, do you run any kind of orchestration like Kubernetes, Mesos, or Docker Swarm?

- If you run container workloads, what tools do you use to host and serve container images?

- If you run container workloads, what tools do you use to scan and secure container images?

- If you are deploying $APP to your existing Kubernetes cluster, can your cluster nodes pull images from the public internet, or do you require images to be stored in an internal registry?

### Change Management

- How do you test new releases of COTS software? Do you have a UAT or Staging environment? Are there other change management requirements?

- How often do you like to receive planned (non-critical) software updates? Quarterly? Monthly? As often as possible?

- For critical updates, what is your target deployment time for new patches? Do you have a requirement for how quickly patches are made available after a vulnerability is announced?

- Do you drive production deploys automatically from version control (“gitops”)?


### Application Usage and Policy Requirements

- For applications that expose a web UI, how will you be connecting to the instance? As much as possible, include details about your workstation, any tunneling/VPN/proxy infrastructure, and what browsers you intend to use.

- Do you require a disaster recovery strategy for deployed applications? If so, where are backups stored today? (SFTP? NAS? S3-compliant object store? Something else?)

- Do you require deployed COTS applications to support logins with an internal identity provider like OpenLDAP, Windows AD or SAML?

- Do you require an audit log of all user activity performed in $APP? What are your needs around exporting / aggregating audit log data?

- Do you anticipate the need to scale the capacity of $APP up and down during its lifetime?

- What are your requirements around log aggregation? What downstream systems do you need system logs to be piped to?
