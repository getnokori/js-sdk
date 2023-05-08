# @nokori/js-sdk

Official JavaScript SDK for [nokori](https://nokori.com).

nokori is the Programmable Intelligence platform providing the tools and infrastructure innovators need to move at the speed of imagination.

## The basics

For a full run-down of the API, check out the [documentation](https://docs.nokori.com).

### Installation

```bash
npm i @nokori/js-sdk
```

### Usage

Import and initialize the SDK.

```js
import nokori from "@nokori/js-sdk";
const nk = new nokori('<<API_KEY>>')
```

### Querying

Query a database after setting it up in the [nokori App](https://app.nokori.com).

```js
const {data, error} = await nk.query.execute({
  queryId: 'nk.q.-ddqHfqeZNihbChcAbf',
  context: {
    created_at: '2022-01-01',
    status: 'active'
  } 
})
```

### Stay Tuned...

For updates and new features, join the mailing list from our website.
