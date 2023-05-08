# @nokori/js-sdk

Official JavaScript SDK for [nokori](https://nokori.com).

nokori is the Programmable Intelligence platform providing the tools and infrastructure innovators need to move at the speed of imagination.

## The basics

For a full run-down of the API, check out the [documentation](https://docs.nokori.com).

## nokori Docs

You can always reference the [nokori Developer Docs](https://docs.nokori.com/?utm_source=github&utm_medium=js-framework-examples&utm_campaign=home) for more information.

## Code Examples

Checkout basic code examples for popular JS frameworks:

- [React](https://github.com/getnokori/js-framework-examples/tree/production/react)
- [Vue](https://github.com/getnokori/js-framework-examples/tree/production/vue)
- [Svelte](https://github.com/getnokori/js-framework-examples/tree/production/svelte)
- [Next.js](https://github.com/getnokori/js-framework-examples/tree/production/nextjs)

## Nokori Powered Components

nokori makes it near effortless to add any database or API operation to your components without servers, APIs, or infrastructure to manage.

Because nokori is cloud-native, queries are managed centrally as Special Purpose Cloud Functions™ in the nokori UI. This uniquely allows you to keep your data operations close to your template logic without sacrificing code maintainability or reusability.

### Basic Component Example

```js
import nokori from '@nokori/js-sdk'
const nk = nokori('api_key')

async function create(formData: FormData){
 const { data, error } = await nk.query.execute({
    queryId: 'nk.q.-ddqHfqeZNihbChcAbf', //Global Cloud Query ID
      context: {
        name: formDate.get('name')
      } 
    }
  )
}

export default function FormComponent() {
  return (
    <form action={create}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

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
