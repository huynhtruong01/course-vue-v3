## TABLE OF CONTENT

- [TABLE OF CONTENT](#table-of-content)
  - [**`01`** - Install vue-router](#01---install-vue-router)
  - [**`02`** - Setup router](#02---setup-router)
  - [**`03`** - History Mode](#03---history-mode)
  - [**`04`** - Routes](#04---routes)
  - [**`05`** - Dynamic Route Matching](#05---dynamic-route-matching)
  - [**`06`** - Lazy loading router](#06---lazy-loading-router)
  - [**`07`** - Nested Routes](#07---nested-routes)
  - [**`08`** - Name router](#08---name-router)
  - [**`09`** - Programmatic Navigation](#09---programmatic-navigation)
  - [**`10`** - Name viewed](#10---name-viewed)
  - [**`11`** - Redirect \& Alias](#11---redirect--alias)
  - [**`12`** - Navigation Guards](#12---navigation-guards)
  - [**`13`** - Fetching Data](#13---fetching-data)
  - [**`14`** - Composition API](#14---composition-api)
  - [**`15`** - Transitions](#15---transitions)
  - [**`16`** - Scroll Behavior](#16---scroll-behavior)

> [https://router.vuejs.org/guide/](https://router.vuejs.org/guide/)

---

### **`01`** - Install vue-router

```sh
yarn add vue-router
# 
npm install vue-router
```

[⬆️ Back to top](#table-of-content)

---

### **`02`** - Setup router

- Create `router.ts` file

- Then, we can set it

```ts
import { ContactPage, ProjectsPage, AboutPage, HomePage } from './page'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
```

- Then, we can import it in `main.ts`

```ts
...
import { router } from './router'

const app = createApp(App)
app.use(router).mount('#app')
```

[⬆️ Back to top](#table-of-content)

---

### **`03`** - History Mode

1. `Hash mode`

- It includes a `#` symbol, **It does however have a bad impact in SEO**. If that's a concern for you, use the HTML5 history mode.

- Use `createWebHashHistory`

```ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})

// http://example.com/#/about
```

2. `HTML5 mode`

- Here comes a problem, though: Since our app is a single page client side app, without a proper server configuration, the users will get a 404 error if they access `https://example.com/user/id` directly in their browser. Now that's ugly.

- Not to worry: To fix the issue, all you need to do is add a simple catch-all fallback route to your server. If the URL doesn't match any static assets, it should serve the same index.html page that your app lives in. Beautiful, again!

- `createWebHistory`

```ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

> [https://router.vuejs.org/guide/essentials/history-mode.html](https://router.vuejs.org/guide/essentials/history-mode.html)

[⬆️ Back to top](#table-of-content)

---

### **`04`** - Routes

- `Header.vue`

```vue
<template>
  <div>
    <ul>
      <li>
        <router-link to="/about">About</router-link>
      </li>  
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>  
    </ul>
  </div> 
</template>
```

- `App.vue`

```vue
<main>
    <router-view></router-view>
</main>
```

1. `Navigating with Links`

- You can use `<router-link></router-link>` to navigating links.
- **Noted**: If you don't add slash before **name route have multi children routes**, it will follow the path in front of it and behind it.

```vue
<router-link to="about">About</router-link> 
<!-- Don't do this ❌❌ -->
```

- Instead of, you must add `/` before name route, if you have **this route have a lot of children routes**.

```vue
<router-link to="/about">About</router-link>
```

- **Recommend** use `full-route` like this while this route have children routes: `/auth/login`, `/posts/the-news-about-technology`,...

2. `Name Routes`

You can provide for any route. It have lots of advantages:
- No hardcoded URLs.
- Automatic encoding/decoding of `params`.
- Prevents you from having a typo in the url.
- Bypassing path ranking.

- `Step 1`: Define routes with name

```ts
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

- `Step 2`: Pass object to `router-link` component's to `props`:

```vue
<router-link :to="{ name: 'user', params: { username: 'htruong01' } }">User</router-link>
```

- **Noted**: Each name must be unique across all routes. `If you add the same name to multiple routes, the router will only keep the last one`

> [https://router.vuejs.org/guide/essentials/named-routes.html](https://router.vuejs.org/guide/essentials/named-routes.html)

3. `Catch-all and Redirect Route`

- **Redirect**: Redirecting is also done in the routes configuration. Example to redirect from `/home` to `/`.

- **Catch-All / 404 Not found Route**: If the path don't match with defined routes, it redirect to `404 not found`. 

```ts
const routes = [
  {
    name: 'home',
    path: '/home'
  },
  {
    name: 'manage',
    path: '/manage-music',
  },
  {
    path: '/manage',
    redirect: {
      name: 'manage'
    },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {
      name: 'home'
    },
  },
]
```

4. `Alias`

- `An alias of /` as `/home` means when the user visits `/home`, the URL remains `/home`, but it will be matched as if the user is visiting `/`.

```ts
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

5. `Navigating Guard`

> [Flow Navigating Guard](../assets/images/routes/04-flow-guard-routes.png)
> [https://router.vuejs.org/guide/advanced/navigation-guards.html#The-Full-Navigation-Resolution-Flow](https://router.vuejs.org/guide/advanced/navigation-guards.html#The-Full-Navigation-Resolution-Flow)

- **Check login user**:

```vue
<!-- This is idea to check user login and can access the page -->
<script>
import { useUserStore } from './composables/useUserStore' // use store `pinia`

export default {
  beforeRouteEnter(to, from , next) {
    const store = useUserStore()
    if (store.user) {
      next()
    } else {
      next({ name: 'home' })
    }
  }
}
</script>
```

- **Redirect after logout**:

```vue
<!-- This is a idea to logout -->
<script>
export default {
  methods: {
    signOut() {
      // ➡️➡️ handle logout here...

      // if page name equal to manage, it redirects to home page
      if (this.$route.name === 'manage') {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
```

6. `Route Meta Field`

- It is an object you can define field to check as `requires route to authentication`,...

```ts
// ➡️➡️ This is an example to check which route can access?
const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    component: HomePage,
  },
  {
    path: '/manage-post',
    name: 'manage-post',
    component: ManagePostPage,
    meta: {
      requiresAuth: true, 
      // you can define any field to do something... 
    },
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const store = useUserStore()

  if(to.meta.requiresAuth && store.user) {
    next()
  } else {
    next({ name: 'home' })
  }
})
```

> [https://router.vuejs.org/guide/advanced/meta.html#Route-Meta-Fields](https://router.vuejs.org/guide/advanced/meta.html#Route-Meta-Fields)

[⬆️ Back to top](#table-of-content)

---

### **`05`** - Dynamic Route Matching

- When accessed with link `/user/john` from `/user/:name`, we can access route to get params `john`

```vue
<template>
  <div>Params {{ $route.params.name }}</div>
</template>
<script setup lang='ts'></script>
```

- `$route` have such us `$route.params`, `$route.hash`, `$route.query`,...

- **Catch all Not found 404**: We can define like this

```ts
const router = [
  ...,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
```

[⬆️ Back to top](#table-of-content)

---

### **`06`** - Lazy loading router

- **Webpack**: We can code like this

```ts
const router = [
    {
        path: '/user',
        component: () => import('./User.vue')
    },
    ...
]
```

- **Vite**: We add `rollupOptions`

```ts
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'group-user': [
            './src/UserDetails',
            './src/UserDashboard',
            './src/UserProfileEdit',
          ],
        },
      },
    },
  },
})
```

[⬆️ Back to top](#table-of-content)

---

### **`07`** - Nested Routes

```ts
const router = [
  {
    path: '/users',
    children: [
      {   
        path: '',
        component: () => import('./User.vue')
      },
      {   
        path: ':userId',
        component: () => import('./UserDetail.vue')
      },
    ]
  },
    ...
]
```

[⬆️ Back to top](#table-of-content)

---

### **`08`** - Name router

- It is so convenient to code router:
    - `No hardcoded URLs`: Named routes allow you to use names instead of hardcoded URLs in your code. This makes your code more readable and maintainable. For example, instead of writing this.router.push('/posts/123');, you can write this.router.push({ name: 'post', params: { id: 123 } });. (`Không có URL được mã hóa cứng: Các tuyến được đặt tên cho phép bạn sử dụng tên thay vì URL được mã hóa cứng trong mã của mình. Điều này làm cho mã của bạn dễ đọc và dễ bảo trì hơn. Ví dụ: thay vì viết this.router.push('/posts/123');, bạn có thể viết this.router.push({ name: 'post', params: { id: 123 } });.`)
    - `Automatic encoding/decoding of params`: Named routes automatically encode and decode the parameters in the URL. This means that you don't have to worry about manually encoding and decoding the parameters. (`Tự động mã hóa/giải mã các thông số: Các tuyến được đặt tên sẽ tự động mã hóa và giải mã các thông số trong URL. Điều này có nghĩa là bạn không phải lo lắng về việc mã hóa và giải mã các tham số theo cách thủ công.`)
    - `Prevents typos in the URL`: Named routes prevent typos in the URL. If the user types a typo in the URL, the router will still be able to find the correct route. (`Ngăn lỗi chính tả trong URL: Các tuyến được đặt tên sẽ ngăn lỗi chính tả trong URL. Nếu người dùng gõ lỗi chính tả trong URL, bộ định tuyến vẫn có thể tìm thấy tuyến đường chính xác.`)
    - `Bypassing path ranking`: Named routes can be used to bypass path ranking. Path ranking is a feature of Vue Router that allows you to define the order in which routes are matched. By using named routes, you can ensure that a specific route is always matched, regardless of the order in which the routes are defined. (`Bỏ qua xếp hạng đường dẫn: Các tuyến đường được đặt tên có thể được sử dụng để bỏ qua xếp hạng đường dẫn. Xếp hạng đường dẫn là một tính năng của Vue Router cho phép bạn xác định thứ tự các tuyến đường được khớp. Bằng cách sử dụng các tuyến đường được đặt tên, bạn có thể đảm bảo rằng một tuyến đường cụ thể luôn được khớp, bất kể thứ tự các tuyến đường được xác định.`)

```ts
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

- And we can add link like this:

```vue
<template>
    <router-link :to="{ name: 'user', params: { username: 'erina' }}">
    User
    </router-link>
</template>
```

- **_Note_**: If no have name at `router` file, it errors.

[⬆️ Back to top](#table-of-content)

---

### **`09`** - Programmatic Navigation

1. **Navigate to a different location**

- In the `SFC`, we can use hook `useRouter` from `vue-router`

```vue
<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()

function handleNav() {
  router.push('/users/dashboard')
  router.push({
    name: 'users',
    params: {
      username: 'john'
    }
  })
  router.push({
    path: '/users',
    query: {
      plan: 'private'
    },
    hash: '#team'
  })
}
</script>
```

2. **Replace current location**

- It acts like `router.push`, the only difference is that it navigates without push a new history entry, it replaces the current entry. (`Nó hoạt động giống như router.push, điểm khác biệt duy nhất là nó điều hướng mà không cần đẩy mục lịch sử mới, nó thay thế mục hiện tại.`)

```ts
router.push({ path: '/home', replace: true })
// equivalent to
router.replace({ path: '/home' })
```

3. **Traverse history**

```ts
router.go(1)

// go forward by 3 records
router.go(3)

// go back by one record, the same as router.back()
router.go(-1)

// fails silently if there aren't that many records
router.go(-100)
router.go(100)

router.back()
```

[⬆️ Back to top](#table-of-content)

---

### **`10`** - Name viewed

- Sometimes we want to show multiple view. We can set name view into `<router-view name="sidebar"></router-view>` tag
- A `router-view` without a name will be given default as its name. (`router-view không có tên sẽ được đặt mặc định làm tên của nó.`)

```vue
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

```ts
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar,
      },
    },
  ],
})
```

- **Nested Name View**

```ts
{
  path: '/settings',
  // You could also have named views at the top
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

[⬆️ Back to top](#table-of-content)

---

### **`11`** - Redirect & Alias

1. **Redirect**

```ts
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
// or
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

2. **Alias**

- An alias of `/` as `/home` means when the user visit `/home`, the URL remains `/home`, but it will be matched as if the user is visiting `/`. (`Alias / as /home có nghĩa là khi người dùng truy cập /home, URL vẫn là /home, nhưng nó sẽ được khớp như thể người dùng đang truy cập /.`)

```ts
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        alias: '/home'
    },
    ...
]
```

- An alias gives you the freedom to map a UI structure to an arbitrary URL (`Alias cho phép bạn tự do ánh xạ cấu trúc giao diện người dùng tới một URL tùy ý`). We can even combine both and provide multiple aliases with an array, but must be make alias start `/`:

```ts
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // this will render the UserList for these 3 URLs
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

[⬆️ Back to top](#table-of-content)

---

### **`12`** - Navigation Guards

1. **Pre-Route Guard**

- We can guard before go to component, use `beforeRoutenter`, it is for each route.

```ts
const routes = [
    {
        path: '/users',
        beforeRoutenter(to, from) {
            // handle logic here
            return { name: 'not.found' }
        }
    },
    ....
]
```

2. **Global Before Guard**

```ts
const router = createRouter({...})
router.beforeEach((to, from) => {
    // handle logic here...
    return false // explicitly return false to cancel the navigation
})
```

- And can optionally return any of the following values:
  - `false`: cancel the current navigation. If the browser URL was changed (either manually by the user or via back button), it will be reset to that of the `from` route.
  - `A Route Location`: Redirect to a different location by passing a route location as if you were calling `router.push()`, which allows you to pass options like replace: `true` or `name: 'home'`. The current navigation is dropped and a new one is created with the same from.

```ts
router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})
```

- We can optional third arguments `next`

```ts
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

[⬆️ Back to top](#table-of-content)

---

### **`13`** - Fetching Data

- Fetching after navigation and render the incoming component immediately

```vue
<script setup lang='ts'>
  import { useRoute } from 'vue-router'
  import { watch, ref } from 'vue'

  const route = useRoute()
  const data = ref([])
  async function fetchData() {
    const res = await getPost()
    data.value = res.data
  }

  watch(() => route.params.id,
  async () => {
    await fetchData()
  },
  // Fetch the data when the view is created and the data is
  // already being observed
  { immediate: true })
</script>
```

[⬆️ Back to top](#table-of-content)

---

### **`14`** - Composition API

> [https://router.vuejs.org/guide/advanced/composition-api.html](https://router.vuejs.org/guide/advanced/composition-api.html)

[⬆️ Back to top](#table-of-content)

---

### **`15`** - Transitions

1. **Use tag html**

- We can use `transition`

```vue
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- component here -->
    </transition>
  </router-view>
</template>
```

2. **Per-Route Transition**

- The above usage will apply the same transition for all routes. If you want each route's component to have different transitions, you can instead combine meta fields and a dynamic name on <transition>:

- `router` file:

```ts
const routes = [
  {
    path: '/custom-transition',
    component: PanelLeft,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/other-transition',
    component: PanelRight,
    meta: { transition: 'slide-right' },
  },
]
```

- `component` file:

```vue
<template>
  <router-view v-slot="{ Component, route }">
    <!-- Use any custom transition and  to `fade` -->
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
```

[⬆️ Back to top](#table-of-content)

---

### **`16`** - Scroll Behavior

- When we use routing, we want to it scrolls top when router change

```ts
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    return {
      top: 0,
      behavior: 'smooth',
      el: '#main'
    }
  }
})
```

- **Delaying the scroll**: Sometimes we need to wait a bit before scrolling in the page. For example, when dealing with transitions, we want to wait for the transition to finish before scrolling. To do this you can return a Promise that returns the desired position descriptor. Here is an example where we wait 500ms before scrolling:

```ts
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  },
})
```

> [https://router.vuejs.org/guide/advanced/scroll-behavior.html](https://router.vuejs.org/guide/advanced/scroll-behavior.html)

[⬆️ Back to top](#table-of-content)