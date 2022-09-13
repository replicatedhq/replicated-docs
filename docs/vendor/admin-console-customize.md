# Customizing the Admin Console CSS

This topic describes how to customize the look and feel of the admin console to align with your branding guidelines.

## Supported CSS Classes

Replicated supports adding custom branding for HTML elements in the admin console using the following CSS classes:
* CLASS
* CLASS
* CLASS

For more information, see [branding](/reference/custom-resource-application#branding) in _Application_.

## Add Custom CSS and Font Families

You can customize the look and feel of the admin console by providing custom CSS in the Application custom resource manifest file for your application.

To provide custom CSS and font families for the admin console:

1. In the Application custom resource for the release, add single line or multiline valid CSS to a `css` field under `branding`.

   **Example**

   ```yaml
   branding:
     css: |
       body {
         background-color: blue
       }
   ```

1. To import font families for use in the custom CSS, include the `fontFamily` field under `branding`.

   **Example**

   ```yaml
   frontFamily: Disney
   - source:
   ```
