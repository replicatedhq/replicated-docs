import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# app ls

List all applications, or specify the application you want to list.

## Usage
```bash
replicated app ls
```
```bash
replicated app ls APP_NAME
```

## Global Flags

<GlobalFlags/>

## Examples

List all created apps:
```bash
replicated app ls
ID                                  NAME                                  SLUG                              SCHEDULER
cqzmRRIdJtZ_E82Cl36nkBDSmGrG2uoe    sentry-enterprise                     sentry-enterprise-1               kots
1xy9t8G9CO0PRGzTwSwWFkMUjZO         cli-app                               cli-app                           kots
XlkTz6qxXepG_HjK_vUFlLUY14p05wO1    default-kots                          default-kots                      kots
```

List a specific app:
```bash
replicated app ls default-kots
ID                                  NAME                    SLUG                    SCHEDULER
XlkTz6qxXepG_HjK_vUFlLUY14p05wO1    default-kots            default-kots            kots
```
