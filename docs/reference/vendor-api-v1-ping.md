# Ping (Vendor API v1)

The `/v1/ping` endpoint returns a health check response that confirms the API is accessible and the authentication token is valid.

## Endpoint

```
GET /v1/ping
```

## Authentication

This endpoint requires a valid API token passed in the `Authorization` header. For information about generating API tokens, see [Generating API Tokens](/vendor/replicated-api-tokens).

## Request

This endpoint does not require any request parameters or body.

## Response

### Success Response

**Status Code:** 200 OK

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "v1"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | The API status. Always returns `ok` for a successful response. |
| `timestamp` | string | The server timestamp in RFC3339 format. |
| `version` | string | The API version. Returns `v1`. |

## Example

```bash
curl --request GET \
     --url https://api.replicated.com/vendor/v1/ping \
     --header 'Authorization: <api_token>'
```
