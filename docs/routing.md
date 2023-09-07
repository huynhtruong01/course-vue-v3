## TABLE OF CONTENT

- [TABLE OF CONTENT](#table-of-content)
  - [Install vue-router](#install-vue-router)
  - [Setup router](#setup-router)
  - [Setup router-link \& router-view](#setup-router-link--router-view)
  - [Dynamic Route Matching](#dynamic-route-matching)
  - [Lazy loading router](#lazy-loading-router)
  - [Nested Routes](#nested-routes)
  - [Name router](#name-router)

---

### Install vue-router

```sh
yarn add vue-router
# 
npm install vue-router
```

### Setup router

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

### Setup router-link & router-view

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

### Dynamic Route Matching

- When accessed with link `/user/john` from `/user/:name`, we can access route to get params `john`

```vue
<script></script>
<template>
    <div>Params {{ $route.params.name }}</div>
</template>
```

- `$route` have such us `$route.params`, `$route.hash`, `$route.query`,...

- **Catch all Not found 404**: We can define like this

```ts
const router = [
    ...,
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
```

### Lazy loading router

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

### Nested Routes

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

### Name router

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


> [https://router.vuejs.org/guide/](https://router.vuejs.org/guide/)