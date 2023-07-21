# Manually Testing and Validation

It's often useful to manually create a customer-representative enviornment for a short period of time in order to reproduce a customer problem or to iterate and use as part of a developer inner-loop.

## Common use cases

### Support

For support teams, when a customer opens an issue with a reported problem, it's best to attempt to reproduce the problem in an environment that matches the customer's as much as possible. For example, you wouldn't want to create a K3s cluster to reproduce an issue with OpenShift. 

To enable this, Replicated provides the full functionality of the Reliability Matrix for ephemeral cluster creation. Clusters created will have an expiration (time to live, or TTL) assigned. You will only be charged credits for the amount of time the cluster is runnimng.

### Developer

Developers often need to debug an issue in a customer-representative enviornment.

### Demos

Sales and other personas can use the Reliability Matrix to get clusters that match the customer's intended environment. This does create more confidence in the solution for end customers.




## Replicated CLI

Replicated supports creating and managing ephemeral test clusters using the [Replicated CLI](reference/replicated-cli-installing). 

### Listing clusters

```
replicated cluster ls
```

### Creating a new cluster

```
replicated cluster create --distribution kind --ttl 2h --version 1.25.0
```

### Getting the kubeconfig

```
replicated cluster kubeconfig --id <paste>
```

