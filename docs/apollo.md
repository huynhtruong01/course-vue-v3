## Vue + GraphQL + Apollo

> [https://apollo.vuejs.org/](https://apollo.vuejs.org/)

---

### `01` - Install & Setup

```sh
yarn add graphql graphql-tag @apollo/client @vue/apollo-composable
```

---

### `02` - Fetching Data

1. `Queries`

- It return a data object with value that you query data.

```json
{
  "data": {
    "users": [
      {
        "id": "abc",
        "firstname": "James",
        "lastname": "Holden",
        "email": "james.holden@roci.com"
      },
      {
        "id": "def",
        "firstname": "Naomi",
        "lastname": "Nagata",
        "email": "naomi.nagata@roci.com"
      }
    ]
  }
}
```

- `useQuery`: The main composition function used to execute queries.

```vue
<template>
</template>
<script lang='ts'>
import { useQuery } from '@vue/apollo-composable'
import * as gql from 'graphql-tag'
export default {
  setup () {
    const { result } = useQuery(gql`
      query getUsers {
        users {
          id
          firstname
          lastname
          email
        }
      }
    `)
  },
}
</script>
```

> [https://apollo.vuejs.org/guide-composable/query.html](https://apollo.vuejs.org/guide-composable/query.html)

2. `Mutations`

- `useMutation`: The composition function is the main way of setting up mutations in Vue components.

```vue
<script>
import { useMutation } from '@vue/apollo-composable'
import * as gql from 'graphql-tag'

export default {
  setup () {
    const { mutate: sendMessage, loading, error, onDone, onError } = useMutation(gql`
      mutation sendMessage ($text: String!) {
        sendMessage (text: $text) {
          id
        }
      }
    `)

    return {
      sendMessage,
      loading,
      error,
      onDone,
      onError,
    }
  },
}
</script>

<template>
  <div>
    <button @click="sendMessage({ text: 'Hello' })">
      Send message
    </button>
  </div>
</template>
```

> [https://apollo.vuejs.org/guide-composable/mutation.html](https://apollo.vuejs.org/guide-composable/mutation.html)