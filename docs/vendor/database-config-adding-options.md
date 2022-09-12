# About Adding Persistent Data Stores

You can integrate persistent stores, such as databases, queues, and caches. There are options to give an end user, such as  embedding an instance alongside the application or connecting an application to an external instance that they will manage.

For more information about integrating persistent datastores, see [Tutorial: Adding Database Configuration Options](tutorial-adding-db-config).

## Managing Stateful Services

If you expect to also install stateful services into existing clusters, you will likely want to expose [preflight analyzers that check for the existence of a storage class](https://troubleshoot.sh/reference/analyzers/storage-class/).

If you are allowing end users to provide connection details for external databases, you can often use a troubleshoot.sh built-in [collector](https://troubleshoot.sh/docs/collect/) and [analyzer](https://troubleshoot.sh/docs/analyze/) to validate the connection details for [Postgres](https://troubleshoot.sh/docs/analyze/postgresql/), [Redis](https://troubleshoot.sh/docs/collect/redis/), and many other common datastores. These can be included in both `Preflight` and `SupportBundle` specifications.
