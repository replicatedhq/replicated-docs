# Creating a customer

After you promote a release, create a customer and share the associated license
file with the customer.

## Create a customer

To create a customer:

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

## Next steps

Share the license file that you created with your customer along with the
installation script. See [Sharing the license file and installation script](releases-sharing-license-install-script).

## Additional resources

[How to release a packaged application](https://replicated-docs.netlify.app/docs/vendor/releases-workflow)
