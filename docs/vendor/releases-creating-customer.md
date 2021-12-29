# Creating a customer

After you promote a release, you create a customer.

Each customer that you create in the Replicated vendor portal has a unique license file. Each customer license uniquely identifies the customer and the application, specifies their release channel, and defines _entitlement information_ about the customer.

For more information about customer licenses, see [About customer licenses](licenses-about).

## Create a customer

To create a customer:

1. From the [vendor portal](https://vendor.replicated.com), select Customers from the left menu.
1. Click **Create Customer**.

  The Create a new customer page opens.

1. Enter a customer name and assign a channel in the corresponding fields.
1. Edit the remaining options or accept the defaults:

    | Field                  | Description           |
    |-----------------------|------------------------|
    | Expiration policy | Defines how long the customer’s license will be valid and how to handle expired licenses. **Default:** The license does not expire. |
    | Customer type| The type of customer is used solely for reporting purposes. Their access to your app is not affected by the type you assign to them. **Options:** Development, Trial, Paid, Community **Default:** Trial. For more information, see [About customer license types](licenses-about-types).|
    | License options | Enables the options that you have added to the application package. **Options:** Airgap, Gitops, Identity Service, Support Bundle Upload, Allow Snapshots. For more information, see [About built-in license fields](licenses-using-builtin-fields).|
    | Custom fields | Lets you securely deliver customer-specific values or entitlements to the installation. The custom fields you create apply to all customers. For more information, see [Creating custom license fields](licenses-adding-custom-fields).|

1. Click **Save Changes**.

## Next steps

Share the license file that you created with your customer along with the
installation script. See [Sharing the license file and installation script](releases-sharing-license-install-script).

## Additional resources

[How to release a packaged application](https://replicated-docs.netlify.app/docs/vendor/releases-workflow)
