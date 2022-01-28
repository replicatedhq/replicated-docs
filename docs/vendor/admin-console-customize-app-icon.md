# Customizing the application icon

You can add a custom application icon that displays in the Replicated admin
console and the download portal. Adding a custom icon helps ensure that your
brand is reflected for your customers.

To add a custom application icon for the admin console and the download portal,
create  an `application.yaml` file and include an `icons` key under the `descriptor`.
In the `icons` key, specify a src url and an image type.

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  title: My Application
  icon: https://kots.io/images/kotsadm-logo-large@2x.png
```

## Proper admin console logo size
For logos to look best in the admin console, use a PNG or JPG that is square, at least 250x250 pixels, and exported at 2x. Logos are contained to a bounding box so although a logo with a rectangular shape will work, the logo may be small and hard to see. The next section will show an example.

Here is the full admin console wordmark logo shown on the the login screen.
Although the entire logo is visible because it's being contained to the circle, it's a little small and will appear even smaller, about half of this size, in some parts of the admin console.

![Kotsadm logo](/images/login-icon-large.png)

Instead it is recommended to use the smaller lettermark logo as the application logo which will appear larger in the bounding boxes.

![Kotsadm lettermark logo](/images/login-icon-small.png)

When possible it's best to use an icon or lettermark as the application icon rather than the full wordmark logo.
