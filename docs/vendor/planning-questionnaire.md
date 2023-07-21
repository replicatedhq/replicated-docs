# Replicated Onboarding Questionnaire

Before you package and distribute an application, we at Replicated would like to
understand some key characteristics about the current architecture of your application
as well as your customers' technical expertise and expectations. 

## Replicated Onboarding Questionnaire

### Application Architecture & Deployment

- How many microservices comprise your application?

- Is your application containerized and deployable to Kubernetes?

    - If your application is containerized:

        - Do you host a private registry for your container images? 

    - If your application is deployable to Kubernetes:

        - Is there an existing helm chart that can be used to install your application?

- Does your application support a highly available multi-node installation?

    - If your application supports a highly available install:

        - Does the application deployment include any stateful dependencies, such as databases or file and object stores?

- Does your application require GPUs?

### Customer Infrastructure​

- Do you anticipate that any of your customers will have access to install on an existing Kubernetes cluster?

    - If you anticipate customers bringing existing clusters:

        - What Kubernetes distributions do you expect that you’ll need to support?

        - Do any of your customers have preferences regarding the application’s installation method to the cluster? For example, GitOps, CLI, or GUI?

- Do you expect any customers will require assistance in provisioning a Kubernetes cluster before installing your application?

- Will any of your customers require an airgapped installation?
