# Reserve an application slug alias

You can reserve one additional slug as an alias for an application. An alias is useful when you want to introduce a new customer-facing application name without invalidating references that use the original application slug.

An application can have the following slugs:

- **Primary slug:** The slug created with the application. The primary slug cannot be changed and is the only slug that can be used to push images to the Replicated registry or navigate to the application in the Vendor Portal.
- **Alias:** An additional, permanent slug that can be used for authenticated image pulls and to access the same Enterprise Portal as the primary slug. The alias is read-only and cannot be used to push images.
- **Active slug:** The primary slug or alias that Replicated uses in newly generated customer instructions and licenses. An application has exactly one active slug.

Changing the active slug applies to all customers for the application. It does not change access permissions or invalidate either slug. For example, if you make the alias active, existing customers can continue to pull images using the primary slug, while newly generated instructions use the alias.

:::important
The alias reservation is permanent. You cannot delete, release, or transfer the alias. Before reserving it, verify that the spelling is correct and that you want to assign it to the application.
:::

## Reserve an alias

The **Application slug aliases** controls are available when slug alias management is enabled for the application and your role has permission to update the application.

:::note
The application slug alias feature requires an entitlement. If the **Application slug aliases** controls are not available, reach out to your Replicated account representative to get access.
:::

To reserve an application slug alias:

1. Log in to the [Vendor Portal](https://vendor.replicated.com/) and go to **_Application Name_ > Settings**.

1. Under **Application slug aliases**, enter the alias in **Reserve slug**.

   Slugs can contain lowercase letters, numbers, and single hyphens, and can be up to 63 characters. The Vendor Portal checks whether the slug is available. Slugs are unique across Replicated applications.

   <img alt="Available application slug alias in the Vendor Portal" src="/images/application-slug-alias-reserve.png" width="700"/>

   [View a larger version of this image](/images/application-slug-alias-reserve.png)

1. When the alias is shown as available, click **Reserve slug**.

The alias is reserved as an inactive, read-only alias. It can be used immediately for authenticated image pulls. If the application uses the Enterprise Portal, the Vendor Portal also provisions a hostname for the alias; the displayed portal status indicates when the hostname is ready.

## Change the active slug

To use the reserved alias in newly generated customer instructions and licenses:

1. Under **Application slug aliases**, select the primary slug or an alias from the active slug list.

   <img alt="Primary slug and application slug alias in the active slug list" src="/images/application-slug-alias-active.png" width="700"/>

   [View a larger version of this image](/images/application-slug-alias-active.png)

1. Click **Save**.

Changing the active slug does not update previously generated license files or instructions. It also does not make an alias writable: continue to use the primary slug when pushing images to the Replicated registry.

:::important
The Embedded Cluster CLI matches application slugs. After changing the active slug, rebuild any Embedded Cluster air gap bundles so that the application slug in each bundle matches the new active slug.
:::
