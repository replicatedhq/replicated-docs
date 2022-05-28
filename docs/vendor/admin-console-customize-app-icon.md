# Customizing the Application Icon

You can add a custom application icon that displays in the Replicated admin console and the download portal. Adding a custom icon helps ensure that your brand is reflected for your customers.

## Add a Custom Icon

For information about how to choose an image file for your custom application icon that displays well in the admin console, see [Icon Image File Recommendations](#icon-image-file-recommendations) below.

To add a custom application icon:

1. In the [vendor portal](https://vendor.replicated.com/apps), click **Releases**. Click **Create release** to create a new release, or click **Edit YAML** to edit an existing release.
1. Create or open the Application custom resource manifest file. An Application custom resource manifest file has `apiVersion: kots.io/v1beta1` and `kind: Application`.

1. In the preview section of the Help pane:

    1. If your Application manifest file is already populated with an `icon` key, the icon displays in the preview. Click **Preview a different icon** to access the preview options.

    1. Drag and drop an icon image file to the drop zone. Alternatively, paste a link or Base64 encoded data URL in the text box. Click **Preview**.

      ![Application icon preview](/images/app-icon-preview.png)

    1. (Air gap only) If you paste a link to the image in the text box, click **Preview** and **Base64 encode icon** to convert the image to a Base64 encoded data URL. An encoded URL displays that you can copy and paste into the Application manifest. Base64 encoding is required for images used with air gap installations.

      :::note
      If you pasted a Base64 encoded data URL into the text box, the **Base64 encode icon** button does not display because the image is already encoded. If you drag and drop an icon, the icon is automatically encoded for you.
      :::

      ![Base64 encode image button](/images/app-icon-preview-base64.png)

    1. Click **Preview a different icon** to preview a different icon if needed.

1. In the Application manifest, under `spec`, add an `icon` key that includes a link or the Base64 encoded data URL to the desired image.

   **Example**:

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: Application
   metadata:
     name: my-application
   spec:
     title: My Application
     icon: https://kots.io/images/kotsadm-logo-large@2x.png
   ```
1. Click **Save Release**.

## Icon Image File Recommendations

For your custom application icon to look best in the admin console, consider the following recommendations:

* Use a PNG or JPG file.
* Use a square image rather than a rectangular one. Application icons are contained to a bounding box, and a logo with a rectangular shape can appear small.
* Use an image that is at least 250 by 250 pixels.
* Export the image file at 2x.
* When possible, use an icon or lettermark as the application icon rather than the full wordmark.

   The following screenshot shows the full admin console wordmark logo that displays on the the login screen:

   ![Kotsadm logo](/images/login-icon-large.png)

    In the screenshot above, although the entire logo is visible it appears small because it is contained to the circle. Note that the admin console also displays this icon at about half of this size on other pages.

    Instead, Replicated recommends that you use the smaller lettermark as the application icon. This smaller lettermark appears larger in the bounding boxes, as shown in the following screenshot:

   ![Kotsadm lettermark logo](/images/login-icon-small.png)
