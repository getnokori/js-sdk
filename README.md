# @nokori/js-sdk

Official JavaScript SDK for [nokori](https://nokori.com).

### Nokori Powered Components

nokori makes it near effortless to add any database or API operation to your components without duplicated code and boilerplate.

Because nokori is cloud-native, you can ad-hoc query data or test HTTP REST endpoints, then deploy your API & Database connections as universally consistent, instantly consumable API endpoints, regardless of the end data provider.

#### Basic Component Example

```js
import nokori from '@nokori/js-sdk'
const nk = nokori('api_key')

async function create(formData: FormData) {
	const { data, error } = await nk.query.execute({
		queryId: 'nk.q.-ddqHfqeZNihbChcAbf', //Global Cloud Query ID
		context: {
			name: formData.get('name'),
		},
	})
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

## Hubs Code Examples

Checkout basic Hubs code examples for popular JS frameworks:

- [React](https://github.com/getnokori/js-framework-examples/tree/production/react)
- [Vue](https://github.com/getnokori/js-framework-examples/tree/production/vue)
- [Svelte](https://github.com/getnokori/js-framework-examples/tree/production/svelte)
- [Next.js](https://github.com/getnokori/js-framework-examples/tree/production/nextjs)

### Installation

```bash
npm i @nokori/js-sdk
```

### Usage

Import and initialize the SDK.

```js
import nokori from '@nokori/js-sdk'
const nk = new nokori('<<API_KEY>>')
```

### Querying

Query a database or consume an API after setting it up in the [nokori App](https://github.com/getnokori/nokori-ui).

```js
const { data, error } = await nk.query.execute({
	queryId: 'nk.q.-ddqHfqeZNihbChcAbf',
	context: {
		created_at: '2023-01-01',
	},
})
```
