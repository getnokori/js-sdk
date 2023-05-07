# @nokori/js-sdk

Official JavaScript SDK for [nokori](https://nokori.com).

## The basics

### Installation

```bash
npm i @nokori/js-sdk
```

### Usage

Import and initialize the SDK.

```js
import { query } from "@nokori/js-sdk";
```

### Querying

Query a database after setting it up in the [nokori App](https://app.nokori.com).

```js
const {data, error} = await query({
  queryId: 'nk.q.-ddqHfqeZNihbChcAbf',
  context: {
    created_at: '2022-01-01',
    status: 'active'
  } 
})
```

### Supported Data Sources

We currently support these sources:

- HTTP (REST) API Endpoints
- Postgres
- MySQL
- MariaDB
