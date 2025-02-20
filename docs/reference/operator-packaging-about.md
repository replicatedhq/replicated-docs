# About Packaging a Kubernetes Operator Application

Kubernetes Operators can be packaged and delivered as an application using the same methods as other Kubernetes applications.

Operators are good for [specific use cases](https://blog.replicated.com/operators-in-kots/). In general, we recommend thinking deeply about the problem space an application solves before going down the Operator path because, although powerful, Operators take a lot of time to build and maintain.

Operators are generally defined using one or more `CustomResourceDefinition` manifests, and the controller is often a `StatefulSet`, along with other additional objects.
These Kubernetes manifests can be included in an application by adding them to a release and promoting the release to a channel.

Kubernetes Operators differ from traditional applications because they interact with the Kubernetes API to create and manage other objects at runtime.
When a `CustomResource` is deployed to the cluster that has the operator running, the Operator may need to create new Kubernetes objects to fulfill the request.
When an Operator creates an object that includes a `PodSpec`, the Operator should use locally-available images in order to remain compatible with air gapped environments and customers who have configured a local registry to push all images to.
Even environments that aren't air gapped may need access to private images that are included as part of the application at runtime.

An application includes a definition for the developer to list the additional images that are required for the application, and by exposing the local registry details (endpoint, namespace and secrets) to the application so that they can be referenced when creating a `PodSpec` at runtime.
