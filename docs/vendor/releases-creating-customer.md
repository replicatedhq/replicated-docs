# Creating a customer and downloading a license

After you promote a release, create a customer and download the license.

1. From the [vendor portal](https://vendor.replicated.com), select Customers from the left menu.
1. Click **Create Customer**.

  The Create a new customer page opens.

1. Enter a customer name and assign a channel in the corresponding fields.
1. Edit the remaining options or accept the defaults:

    | Field                  | Description           |
    |-----------------------|------------------------|
    | Expiration policy | Defines how long the customer’s license will be valid and how to handle expired licenses. **Default:** Cusomer's license does not expire |
    | Customer type| The type of customer is used solely for reporting purposes. Their access to your app is not affected by the type you assign to them. **Options:** Development, Trial, Paid, Community **Default:** Trial|
    | License options | Enables the options that you have added to the application package. **Options:** Airgap, Gitops, Identity Service, Support Bundle Upload, Allow Snapshots|
    | Customer fields | Lets you securely deliver customer-specific values or entitlements to the installation. The custom fields you create  apply to all customers. |

1. Click **Save Changes**.
1. From the Customer page, click the download license icon on the right side of the row.
1. In the Opening _filename_ dialog, use the Save File default and click **OK**.
    The file is saved to your Downloads folder by default.

## Next steps

Share the download and license with your customer either by email or by [configuring the download portal](http://localhost:3000/docs/vendor/releases-configuring-download-portal).

## Additional resources

[How to release a packaged application](https://replicated-docs.netlify.app/docs/vendor/releases-workflow)
