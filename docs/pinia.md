## Pinia + Vue

- [Pinia + Vue](#pinia--vue)
  - [**`01`** - Install \& Setup](#01---install--setup)
  - [**`02`** - Define a Store \& State](#02---define-a-store--state)
  - [**`03`** - Getter](#03---getter)
  - [**`04`** - Aliases](#04---aliases)

---

### **`01`** - Install & Setup

1. `Install`

```sh
yarn add pinia
# or with npm
npm install pinia
```

2. `Setup`

- You need to setup `Pinia` in `main.ts` file.

```ts
// main.ts
// Vue 3
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp()

app.use(pinia)
app.mount('#app')
```

[⬆️ Back to top](#pinia--vue)

---

### **`02`** - Define a Store & State

- You need to create the folder: `src/stores/counter.ts`

- `Step 1`: Define store, example `counter.ts`

```ts
// counter.ts
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

- `Step 2`: Import `counter.ts` store to any component.

```vue
<template>
<button @click.prevent="increaseNumber">+</button>
</template>
<script>
import { mapStores, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter.ts'

export default {
    name: 'ComponentA',
    computed: {
        ...mapStores(useCounterStore),
        ...mapWritableState(useCounterStore, ['count']) // to write these state properties, but it can't pass a function like `mapState()`
    },
    methods: {
        increaseNumber() {
            console.log(this.count) // get count by `mapWritableState`
            this.counterStore.increase()
        }
    }
}
</script>
```

- Setup `store` with `Composition API`

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

> **Notion**: ❌❌ Don't use destructuring when implement store to any component. You can destructuring by `storeToRefs` from `pinia`.

- This is issue when using destructuring.

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
// ❌ This won't work because it breaks reactivity
// it's the same as destructuring from `props`
const { name, doubleCount } = store
name // will always be "Eduardo"
doubleCount // will always be 0

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ this one will be reactive
// 💡 but you could also just use `store.doubleCount` directly
const doubleValue = computed(() => store.doubleCount)
</script>
```

- Using `storeToRefs`.

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// `name` and `doubleCount` are reactive refs
// This will also extract refs for properties added by plugins
// but skip any action or non reactive (non ref/reactive) property
const { name, doubleCount } = storeToRefs(store)
// the increment action can just be destructured
const { increment } = store
</script>
```

[⬆️ Back to top](#pinia--vue)

---

### **`03`** - Getter

1. `Using Getter`

- Getters are exactly the `equivalent` of **computed** values for the state of a `Store`. They can be defined with the **getters** property in **defineStore()**. They receive the **state as the first parameter** to encourage the usage of arrow function:

- `Step 1`: Define **getter** in store.

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

- `Step 2`: Using in the component.

```vue
<template>
<div>{{ doubleCount }}</div>
</template>
<script>
import { mapState } from 'pinia'
import { useCounterStore } from '../store/counter'

export default {
    computed: {
        ...mapState(useCounterStore, ['doubleCount'])
    }
}
</script>
```

2. `Access other getters`

- Event if you aren't using Typescript, you can hint for type with `JSDoc`.

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // type is automatically inferred because we are not using `this`
    doubleCount: (state) => state.count * 2,
    // here we need to add the type ourselves (using JSDoc in JS). We can also
    // use this to document the getter
    /**
     * Returns the count value times two plus one.
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    },
  },
})
```

3. `Passing arguments to getters`

- `Step 1`: Define getter with argument in the store.

```ts
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

- `Step 2`: Using it in the component.

```vue
<template>
<div>{{ getUserById(id) }}</div>
</template>
<script>
import { mapState } from 'pinia'
import { useCounterStore } from '../store/counter'

export default {
    props: {
        id: String,
    },
    computed: {
        ...mapState(useCounterStore, ['getUserById'])
    }
}
</script>
```

[⬆️ Back to top](#pinia--vue)

---

### **`04`** - Aliases

- You can use other name state.

```vue
<template>
<div>{{ countNumber }}</div>
</template>
<script>
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../store/counter'

export default {
    computed: {
        ...mapWritableState(useCounterStore, {
            countNumber: 'count',
        })
    }
}
```

[⬆️ Back to top](#pinia--vue)