# @loladb/sdk-js

Official JavaScript SDK for [LolaDB](https://loladb.com).

## The basics

### Installation

```bash
npm i @loladb/sdk-js
```

### Usage

Import and initialize the SDK.

```js
import { LolaDB } from "@loladb/sdk-js";
const loladb = new LolaDB('<<API_KEY>>')
```

### Querying

Query a database after setting it up in the [lolaDB App](https://app.loladb.com).

```js
const {data, error} = await loladb.query({
  queryId: 'lola.q.-ddqHfqeZNihbChcAbf',
  context: {
    created_at: '2022-01-01',
    status: 'active'
  } 
})
```

### More to come...
