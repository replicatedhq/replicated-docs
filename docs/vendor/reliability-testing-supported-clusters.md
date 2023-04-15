# Supported Clusters


## VM Based

### kind

Reliability Matrix can support single creating single-node [kind](https://kind.sigs.k8s.io/) clusters.

Common use cases: smoke tests

We use kind version 0.18.0.
These are debian:bullseye based VMs.
There is a 5 GB root disk; this is not configurable.
The default is 4 GB RAM and 2 vCPUs.
You can specify higher RAM and vCPUs, but must grow them together and linearly. For example, the next size is 8 GB RAM and 4 vCPUs. Requests for values that are not ^2 will be rejected. If you choose unbalanced RAM and vCPUs, the credits will be deducted based on the higher number you select.

Supported Kubernetes versions:
- v1.25.0, v1.25.1, v1.25.2, v1.25.3, v1.25.4, v1.25.5, v1.25.6, v1.25.7, v1.25.8
- v1.26.0, v1.26.1, v1.26.2, v1.26.3
- v1.27.0

Cost:
kind servers cost 0.03 credits per minute for 4 GB RAM & 2 vCPUs.
Each additional 4 GB of RAM and 2 vCPUs add 0.03 credits per minute to the cost.

Example:

```
replicated cluster create --distribution kind --version v.1.25.3
```

### k3s

Realibility Matrix can support creating single-node [k3s])https://k3s.io) clusters.

Common use cases: smoke tests, customer release tests

We use the upstream k8s version that matches the kubernetes version requested.
This are debian:bullseye based VMs.
There is a 5 GB root disk; this is not configurable.
The default is 4 GB RAM and 2 vCPUs.
You can specify higher RAM and vCPUs, but must grow them together and linearly. For example, the next size is 8 GB RAM and 4 vCPUs. Requests for values that are not ^2 will be rejected. If you choose unbalanced RAM and vCPUs, the credits will be deducted based on the higher number you select.

Supported Kubernetes versions:
- v1.26.3

Cost:
k3s servers cost 0.03 credits per minute for 4 GB RAM & 2 vCPUs.
Each additional 4 GB of RAM and 2 vCPUs add 0.03 credits per minute to the cost.


Example:

```
replicated cluster create --distribution k3s --version v.1.26.3
```

### OpenShift



## Cloud Based

### EKS 
