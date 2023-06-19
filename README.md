# @nokori/js-sdk

Official JavaScript SDK for [nokori](https://nokori.com).

nokori is the Programmable Intelligence platform providing the tools and infrastructure innovators need to move at the speed of imagination.

## The basics

For a full run-down of the nokori platform, check out the [documentation](https://docs.nokori.com).

## Table of Contents

- [Hubs](#hubs-powered-components)
- [Mail](#nokori-mail)
- [AI](#nokori-ai)

## Hubs Code Examples

Checkout basic Hubs code examples for popular JS frameworks:

- [React](https://github.com/getnokori/js-framework-examples/tree/production/react)
- [Vue](https://github.com/getnokori/js-framework-examples/tree/production/vue)
- [Svelte](https://github.com/getnokori/js-framework-examples/tree/production/svelte)
- [Next.js](https://github.com/getnokori/js-framework-examples/tree/production/nextjs)

### Hubs Powered Components

nokori makes it near effortless to add any database or API operation to your components without servers, APIs, or infrastructure to manage.

Because nokori is cloud-native, Configure, test, and deploy your API & Database connections all in one place.

#### Basic Component Example

```js
import nokori from '@nokori/js-sdk'
const nk = nokori('api_key')

async function create(formData: FormData){
 const { data, error } = await nk.query.execute({
    queryId: 'nk.q.-ddqHfqeZNihbChcAbf', //Global Cloud Query ID
      context: {
        name: formData.get('name')
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
    created_at: '2023-01-01',
  } 
})
```

## nokori Mail

Application developers can leverage the power of nokori Mail to send transactional emails, newsletters, and more.

```js
const {data, error} = await nk.query.mail({
  templateId: 'send-password-reset',
  settings: {
    to: 'user@website.com',
  } 
})
```

Templates are easily managable within the nokori UI.


## nokori AI

nokori AI is state of the art that is easy to use and simple to integrate.

We're helping organizations of all sizes integrate common data flows and usecases and rapidly turn them in to AI powered intelligence embeddable in any application.

### Basic AI Example

As seen in our [full docs](https://docs.nokori.com/guides/generate/), a common problem of current Large Language Models (LLM) is the tendency to 'hallucinate' or generate text that is not relevant to the prompt.

Using nokori Generate, you can leverage the results of Hubs Queries to generate text that is relevant to your data and create a more natural experience for your users with accurate information.

As shown above, lets assume this Special Purpose Cloud Function returns the sum of sales since the beginning of the year.

```js
const { data: totalSales, error } = await nk.query.execute({
  queryId: 'nk.q.-ddqHfqeZNihbChcAbf',
  context: {
    created_at: '2022-01-01',
    status: 'active'
  } 
})

// totalSales = { value: 35933 }
```

Next, we can pass these results in generate to create a human-like response from this data for our users.

```js
const { data, error } = await nk.ai.generate({
  prompt: "What are total sales since the beginning of the year?",
  context: [totalSales]
})

// "Total sales are $35,933.00 since Jan 1, 2022."
```

The same example could be leveraged for organizations that had a large document corpus in an ElasticSearch index, for example, allowing their existing ES queries to fetch relevant documents and then generate a human-like response to the user based on those docs.

[Read the docs](https://docs.nokori.com/guides/generate/) for more.

## Classifiers

nokori offers cloud-native programmable text classifiers that are breathlessly easy to use. Incrementally trainable in the cloud, you can train a classifier instantly and skip the infrastructure and training data management.

Create a classifier:

```js
const { data, error } = await nk.classifiers.create({
  name: 'Hot Dog Classifier',
})

// classifierId: nk.clfr.******************
```

Incrementally train a classifier:

```js
const { data, error } = await nk.classifiers.train({
  classifierId: 'nk.clfr.******************',
  label: 'hot dog',
  context: 'two buns with meat in the middle',
})
```

Predict with a classifier:

```js
const { data, error } = await nk.classifiers.predict({
  classifierId: 'nk.clfr.******************',
  context: 'two buns with meat in the middle',
})

// label: 'hot dog'
```

Get all classifiers:

```js
const { data, error } = await nk.classifiers.getMany()
```

Get one classifier:

```js
const { data, error } = await nk.classifiers.getOne({
  classifierId: 'nk.clfr.******************',
})
```

Delete a classifier:

```js
const { data, error } = await nk.classifiers.delete({
  classifierId,
})
```


Read the full [Classifier docs](https://docs.nokori.com/guides/classifiers/) for more.
