# Adding Database Configuration Options

In the [persistent datastores guide](tutorial-adding-db-config), we review best practices for integrating persistent stores like databases, queues, and caches.
Explore ways to give an end user the option to either embed an instance alongside the application, or connect an application to an external instance that they will manage.

## Managing Stateful Services

If you expect to also install stateful services into existing clusters, you'll likely want to expose [preflight analyzers that check for the existence of a storage class](https://troubleshoot.sh/reference/analyzers/storage-class/).

If you're allowing end users to provide connection details for external databases, you can often use a troubleshoot.sh built-in [collector](https://troubleshoot.sh/docs/collect/) and [analyzer](https://troubleshoot.sh/docs/analyze/) to validate the connection details for [Postgres](https://troubleshoot.sh/docs/analyze/postgresql/), [Redis](https://troubleshoot.sh/docs/collect/redis/), and many other common datastores. These can be included in both `Preflight` and `SupportBundle` specs.
