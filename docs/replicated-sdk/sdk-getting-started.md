# API Reference


The SDK can be accessed at kots-sdk:3000. To verify this, run kubectl get service and look for the appropriate service.

## Get application information

`/api/v1/app/info`

Response:

```json
{
  "appSlug": "alex-echo-server-helm",
  "appName": "MyApp",
  "versionLabel": "0.1.68",
  "channelId": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
  "channelName": "Stable",
  "channelSequence": 73,
  "releaseSequence": 79,
  "helmRevision": 4
}
```
## Get application updates

`/api/v1/app/updates`

Response:

```json
[
  {
    "channelSequence": 74,
    "releaseSequence": 80,
    "versionLabel": "0.1.69",
    "isRequired": false,
    "createdAt": "2023-05-09T16:41:35.000Z",
    "releaseNotes": ""
  }
]
```

Get application history

`/api/v1/app/history`

Response:


Get license info

`/api/v1/license/info`

Response:

```json
{
  "licenseID": "<redacted>",
  "channelID": "2CBDxNwDH1xyYiIXRTjiB7REjKX",
  "channelName": "Stable",
  "customerName": "Foundation Tester",
  "customerEmail": "alexp@replicated.com",
  "licenseType": "dev",
  "isAirgapSupported": false,
  "isGitOpsSupported": true,
  "isSnapshotSupported": true
}
```

## Get license fields

`/api/v1/license/fields`

Response:

```json
{
  "expires_at": {
    "name": "expires_at",
    "title": "Expiration",
    "description": "License Expiration",
    "value": "2023-05-30T00:00:00Z",
    "valueType": "String",
    "signature": {
      "v1": "bgBm7ZwkzFdONPhtwCuSylcGTjLv99eeUiW1aUXemmgrfg+Qr5vkSoRhoEPnwhPok27DXlWQo9rJ1rJKGCudV/7LkexXVubfU+/xCOCJ5T/ANhIjT2ZzKXPDUlFlZ77hx9dVl4rd5g+X9jBBrZbkg2Tk6msNoyVmrWSqeRUilqnE9g0K2c7QcJ95zkPD9WRwxRnsvfjvB0Che0Euop8bTiYebZsFXynDxhYI33Y+22Z48ANjH9U27TP6d/+OS4i8T/Vl7i8BxwHT7r80+ShBqr04z5VuoMUzWbPe9mW18gbZlL387d205TBhrqke4uSmX8xh1LcAP2M2PAz6ZglOmw=="
    }
  },
  "numSeats": {
    "name": "numSeats",
    "title": "Number of Seats",
    "value": 10,
    "valueType": "Integer",
    "signature": {
      "v1": "pchA5ZopSmooYreJuR1rBKnR7FLJQUCtskzd9BRgqwoiVdrvLyGxE0Srd/u07iDdLppVn97PjhwPeBLCujMdECDpMmT4b9nSWirhlt0M3LG1VML3jIQwYp5WBd4RnXF+stqXRjVWGCh8zGfWkW3UVnmozTa0B2k0TEblYMpn9oyRE8dtgXCYVhjghLdNXFNFnSdFIF0PbYPrNakxa2w0Zh5cXbya4KAgVYO4hKTM5Q/jWrfAYXUS+8TmAyCGQCfXV90ew9wykZlpXTdXMD76plp6SLiQX94cAJnoMa1nKGILO0VqBWdg4RX3cLESWySM6hvsP0na4pZIT3Gu/gj9jw=="
    }
  }
}
```

## Get license field

`/api/v1/license/fields/<field-name>`

Example:

```
wget -qO- kots-sdk:3000/api/v1/license/fields/expires_at
```

Response:



