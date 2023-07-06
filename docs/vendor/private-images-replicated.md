# Push Images to the Replicated Registry

You can host the private images for your application on the Replicated registry. Hosting your images on the Replicated registry is useful if you do not already have your images in an existing private registry. It is also useful for testing purposes.

For more information about building, tagging, and pushing Docker images, see the
[Docker CLI documentation](https://docs.docker.com/engine/reference/commandline/cli/).

To push images to the Replicated registry:

1. Do one of the following to connect with the `registry.replicated.com` container registry:
   * **(Recommended) Log in with a user token**: Use `docker login registry.replicated.com` with your vendor portal email as the username and a vendor portal user token as the password. For more information, see [User tokens](../reference/replicated-cli-tokens#user-tokens) in _Using Vendor API tokens_.
   * **Log in with a service account or team token**: Use `docker login registry.replicated.com` with a Replicated vendor portal service account or team token as the password. You can use any string as the username. For more information, see [Service accounts](../reference/replicated-cli-tokens#service-accounts) and [Team tokens](../reference/replicated-cli-tokens#team-tokens) in _Using Vendor API tokens_.
   * **Log in with your credentials**: Use `docker login registry.replicated.com` with your vendor portal email and password as the credentials.

1. Tag your private image with the Replicated registry hostname in the standard
Docker format:

   ```
   docker tag IMAGE_NAME registry.replicated.com/APPLICATION_SLUG/TARGET_IMAGE_NAME:TAG
   ```

   Where:
   * `IMAGE_NAME` is the name of the existing private image for your application.
   * `APPLICATION_SLUG` is the slug assigned to your application. You can find your application slug on the **Images** page of the vendor portal.
   * `TARGET_IMAGE_NAME` is a name for the image. Replicated recommends that the `TARGET_IMAGE_NAME` is the same as the `IMAGE_NAME`.
   * `TAG` is a tag for the image.

   For example:

   ```
   docker tag worker registry.replicated.com/myapp/worker:1.0.1
   ```

1. Push your private image to the Replicated registry:

  ```
  docker push registry.replicated.com/APPLICATION_SLUG/TARGET_IMAGE_NAME:TAG
  ```