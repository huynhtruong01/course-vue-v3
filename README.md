## Table of Content

- [Table of Content](#table-of-content)
  - [Install Vue + TS + Vite](#install-vuejs--ts--vitejs)
  - [Create a Vue application](#create-a-vue-application)
  - [Template syntax](#template-syntax)
  - [Event & Methods](#events--methods)
  - [Reactivity Fuldamental](#reactivity-fundamentals)
  - [Computed properties](#computed-properties)
  - [Class & Style binding](#class-and-style-bindings)
  - [Condition rerendering](#condition-rendering)
  - [List reredering](#list-rendering)
  - [Watches](#watches)
  - [Template Refs](#template-refs)
  - [Licycle Hooks](#licycle-hooks)
  - [Registration Component](#registration-component)
  - [Props](#props)
  - [Emitting & Listening to events](#emitting--listening-to-events)
  - [Deep understand v-model](#deep-understand-about-v-model)
  - [Slots](#slots)
  - [Provide & Inject](#provide--inject)
  - [Composables](#composables)
  - [Vue form (Vee validate + Yup)](#vue-form-vee-validate--yup)
  - [Component Element](#component-element)

---

### Install Vue + TS + Vite

```sh
npm create vite my-app --template vue-ts
############### or ################
yarn create vite my-app --template vue-ts
```

- Install `devtool vue`

```sh
search vue devtools -> install it
```

[⬆️ Back to top](#table-of-content)

---

### Create a Vue application

1. **Create application**

```ts
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

> [https://vuejs.org/guide/essentials/application.html#the-root-component](https://vuejs.org/guide/essentials/application.html#the-root-component)

2. **Mount in the App**

> `An application instance won't render anything until its .mount() method is called` có nghĩa là nó sẽ không hiển thị có đến khi `mount` được gọi

```ts
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App).mount('#app')
// lúc này html ở app sẽ được hiển thị
```

- **mount** means (`attaches`) this Vue application to the element has `id` of `app` in the DOM. (`có nghĩa gắn kết (mount) ứng dụng Vue này vào một phần tử có id là #app trong DOM`)

- `Điều này có nghĩa là nội dung và chức năng của component gốc App sẽ hiển thị và hoạt động trong phần tử DOM có id là app.`

> [https://vuejs.org/guide/essentials/application.html](https://vuejs.org/guide/essentials/application.html)

[⬆️ Back to top](#table-of-content)

---

### Template syntax

1. **Text Interpolation** (`Nội suy văn bản`)

- It uses the `Mustache` syntax (double curly braces)

```html
<template>
    <span>Message: {{ msg }}</span>    
</template>
<!-- msg it called mustache tag -->
```

2. **Attribute Bindings**

- We can't use `mustaches`into HTML attributes (`Chúng ta không sử dụng được mustaches vào thuộc tính HTML`)
- We can use `v-bind` **directives**

```html
<!-- Longhand -->
<template>
    <span v-bind:id="dynamicId"></span>
</template>

<!-- Shorthand -->
<template>
    <span :id="dynamicId"></span>
</template>
```

- **Boolean Attributes**: can indicate `true/false` values by their presence on an element. Ex: `disabled`

```html
<!-- Shorthand -->
<template>
    <button :disabled="isDisabledBtn">Click me</button>
</template>
```

3. **Dynamically Binding Multiple Attributes**

```vue
<script lang="ts">
    const attributeObj = {
        id: 'container',
        class: 'container-class'
    }
</script>
<template>
    <div v-bind="attributeObj">You can type something here</div>
</template>
```

4. **Directives**

> Directives are special attributes with the v- prefix. Vue provides a number of [built-in directives](https://vuejs.org/api/built-in-directives.html), including v-html and v-bind which we have introduced above.

- **v-text**: To update the element's `text content`. Expects: `string`

```html
<template>
    <span v-text="msg"></span>
</template>
```

- **v-html**: To update the element's `innerHTML`. Expects: `string`

```vue
<script lang="ts">
    export default {
        data() {
            return {
                dynamicHtml: "<p>This is <em>dynamic</em> <strong>HTML</strong> content.</p>"
            }
        }
    }
</script>
<template>
    <span v-html="dynamicHtml"></span>
</template>
```

- **v-show**: Toggle the element's visibility based on the truthy-ness of the expression value. (`Toggle hiển thị của element dựa vào tính đúng đắn của expression value. Nhưng nó sẽ không làm mất element khỏi DOM, nó chỉ ẩn đi ở màn hình`)

```vue
<script lang="ts">
    export default {
        data() {
            return {
                isShow: false
            }
        }
    }
</script>
<template>
    <span v-show="isShow"></span>
</template>
```

- **v-if**: Conditionally render an element or a template fragment based on the truthy-ness of the expression value. (`Render có điều kiện một phần tử hoặc template fragment dựa vào truthy-ness của expression value. Nhưng khác với v-show, nó sẽ làm element remove khỏi DOM`)

```vue
<script lang="ts">
    export default {
        data() {
            return {
                isShow: false
            }
        }
    }
</script>
<template>
    <span v-if="isShow"></span>
</template>
```

- **v-else**: Denote the "else block" for `v-if` or a `v-if` / `v-else-if` chain.

```vue
<script lang="ts">
    export default {
        data() {
            return {
                isShow: false
            }
        }
    }
</script>
<template>
    <span v-if="isShow">It valid</span>
    <span v-else>It isn't valid</span>
</template>
```

- **v-else-if**: Denote the "else if block" for v-if. Can be chained.

```vue
<script lang="ts">
    export default {
        data() {
            return {
                type: "B"
            }
        }
    }
</script>
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
<!-- Result: B -->
```

- **v-for**: Render the Element or template block multiple times based on the source data. Expects: `Array | Object | number | string | Iterable`

```vue
<script>
    export default {
        data() {
            return {
                nums: [1, 2, 3]
            }
        }
    }
</script>
<template>
<ul>
    <li v-for="num in nums">
        {{ num }}
    </li>
</ul>
</template>
```

- **v-model**: Two-way binding on a form input element or a component. (`2 chiều, tức là nó tạo ra sự kết nối giữa value ở input và dữ liệu trong Vue instance. Directive này cho phép dữ liệu tự động đồng bộ hóa giữa phần tử HTML và dữ liệu Vue, điều này có nghĩa là khi bạn thay đổi giá trị của phần tử nhập liệu, dữ liệu Vue sẽ cập nhật, và ngược lại.`)

```vue
<script>
    export default {
        data() {
            return {
                inputVal: ''
            }
        }
    }
</script>
<template>
    <input type="text" v-model="inputVal" />
</template>

<!-- as the same -->
<script>
    export default {
        data() {
            return {
                inputVal: ''
            }
        }
    }
</script>
<template>
    <input type="text" :value="inputVal" @input="e => inputVal = e.target.value" />
</template>
```

- **v-cloak**: Used to hide un-compiled template until it is ready. (`Nó chỉ hiện khi mà DOM template đã sẵn sàng`)

```vue
<style>
    [v-cloak] {
        display: none;
    }
</style>
<template>
    <div v-cloak></div>
</template>
```

> ... [more directives](https://vuejs.org/api/built-in-directives.html)

[⬆️ Back to top](#table-of-content)

---

### Event & Methods

- We can use `v-on:click,...` or shorthand `@click, @submit,...`

- We need to learn about `Inline handlers` and `Method handlers`:

    - **Inline handlers**: Inline JS to be executed when event is triggers (similar to the native `onclick`). (`JavaScript nội tuyến sẽ được thực thi khi sự kiện được kích hoạt (tương tự như thuộc tính onclick gốc).`)
    - **Method handlers**: A property name or path that points to a method defined on the component. (`Tên property hoặc đường dẫn trỏ đến một method được xác định trên component.`)

- `Inline handlers` & `Method handlers`:

```vue
<script>
    export default {
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            // 📌 Method handlers
            handleToggleBox() {
                this.isShow = !this.isShow
            }
        }
    }
</script>
<template>
    <!-- we can define like this: 📌 Inline handlers -->
    <button @click="handleToggleBox">Toggle</button> 
    <div v-if="isShow" class="w-36 h-36 rounded bg-blue-500">Box</div>
</template>
```

- **Calling methods in Inline handlers**: We can also call methods in an inline handler. This allows us to pass the method custom arguments instead of the native event:

```vue
<script>
    export default {
        methods: {
            sayHello(greeting: string) {
                console.log('Say:', greeting)
            }
        }
    }
</script>
<template>
    <button @click="sayHello('hello')">Say</button>
</template>
```

- **Accessing Event Argument in Inline handlers**: Sometimes we also need to access `the original DOM event` in an inline handler. You can pass it into a method using the special `$event` variable, or use an inline arrow function:

```vue
<template>
    <button @click="e => console.log(e)"></button>
</template>
```

- **Event Modifier**: 

    - `.stop`: The click event's propagation will be stopped (`Stop sự kiện propagation`)
    - `.prevent`: The submit event will no longer reload the page (`Nó sẽ không làm reload lại trang`)
    - `.self`: Only trigger handler if event.target is the element itself (`Nó chỉ trigger khi mà e.target là bản thân nó`)
    - `.capture`: Use capture mode when adding the event listener
    - `.once`: The click event will be triggered at most once (`Sự kiện nhấp chuột sẽ được kích hoạt nhiều nhất một lần`)
    - `.passive`: The scroll event's default behavior (scrolling) will happen, immediately, instead of waiting for `onScroll` to complete, in case it contains `event.preventDefault()`

```vue
<template>
    <!-- .stop -->
    <button @click.stop="doStop">Click stop</button>
    <!-- prevent -->
    <form @submit.prevent="onSubmit"></form>
    <!-- .stop.prevent -->
    <a @click.stop.prevent="doThat"></a>
    <!-- .self -->
    <div @click.self="doThat">...</div>
    ...
</template>
```

- **Key modifiers**: When listening for keyboard events, we often need to check for specific keys. Vue allows adding key modifiers for v-on or @ when listening for key events:*

```vue
<template>
    <input @keyup.enter="submit" />
    <input @keyup.page-down="onPageDown" />
</template>
```

> [https://vuejs.org/guide/essentials/event-handling.html](https://vuejs.org/guide/essentials/event-handling.html)

[⬆️ Back to top](#table-of-content)

---

### Reactivity Fundalmental

1. **Reactivity State  _ref()_**

- `ref()`: Recommend declare reactive state is using the `ref()` function

- `ref()`: Takes an argument and returns it wrapped within a ref object with `.value` property

```vue
<script>
    import { ref } from 'vue'
    const count = ref(0)

    console.log(count) // { value: 0 }
    console.log(count.value) // 0
    ++count.value
    console.log(count.value) // 1
</script>
```

- **_Typing of ref_**: We can use `Ref` from vue

```vue
<script>
    import { ref } from 'vue'
    import type { ref } from 'vue'

    const count: Ref<number> = ref(0)
    count.value = 0 // ✅✅ ok
    count.value = '1' // ❌❌ error 
</script>
```

- To `access refs` in component's template, declare and return them from `setup()` function:

```vue
<script>
    import { ref } from 'vue'

    const count = ref(0)

    export default {
        setup() {
            function increase() {
                count.value++
            }
            function decrease() {
                count.value--
            }
            return {
                count
            }
        }
    }
</script>
<template>
    <div>{{ count }}</div>
    <div>
        <button @click="decrease">-</button>
        <button @click="increase">+</button>
    </div>
    <!-- it's working ✅✅ -->
    <!-- You don't need to append .value when using ref in the template,... -->
    <!-- ...refs are automatically unwrapped when used inside templates -->
</template>
```

- In the modern, we can use `<script setup></script>`, it called [Single-File Components (SFCs)](https://vuejs.org/guide/scaling-up/sfc.html)

```vue
<script setup>
    import { ref } from 'vue'

    const count = ref(0)

    function increase() {
        count.value++
    }

    function decrease() {
        count.value--
    }
</script>
<template>
    <div>{{ count }}</div>
    <div>
        <button @click="decrease">-</button>
        <button @click="increase">+</button>
    </div>
</template>
```

- **Why use _refs_**

    - Why we need to use `refs` instead of use plain variables. To explain that, we will need to briefly discuss how Vue's reactivity system works.
    - When you use a ref in a template, and change the `ref's value` later, Vue automatically `detects` the change and updates the DOM accordingly. (`Khi bạn sử dụng ref trong mẫu và thay đổi giá trị của ref sau đó, Vue sẽ tự động phát hiện thay đổi và cập nhật DOM tương ứng`)
    - The `.value` property gives Vue the opportunity to detect when a ref has been accessed or mutated. Under the hood, Vue performs the tracking in its getter, and performs triggering in its setter. Conceptually, you can think of a ref as an object that looks like this: (`.value giúp cho Vue có thể phát hiện khi nào 1 ref có thể truy cập hoặc bị thay đổi. Vue có thể thực hiện theo dõi getter của nó, và thực hiện trigger setter của nó. Về mặt khái niệm, bạn có thể nghĩ rằng 1 ref như 1 object trông như thế này:`)

    ```ts
    // pseudo code, not actual implementation
    const myRef = {
    _value: 0,
    get value() {
        track()
        return this._value
    },
    set value(newValue) {
        this._value = newValue
        trigger()
    }
    }
    ```

> [https://vuejs.org/guide/essentials/reactivity-fundamentals.html#why-refs](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#why-refs)

- **_Refs_** can hold any value type, including `deeply nested` object, array, or JS built-in like `Map`

```vue
<script setup lang="ts">
    import { ref } from 'vue'
    const listNums = ref([1, 2])

    function addNum() {
        this.listNums.push(this.listNums.length)
    }
</script>
<template>
    <ul>
        <li v-for="num in listNums">{{ num }}</li>
    </ul>
    <button @click="addNum">+ Add</button>
</template>
```

2. **Reactivity State  _reactive()_**

- There is another way to declare reactive state, with the `reactive()` API. Unlike a `ref` which wraps the inner value in a special object, `reactive()` makes an object itself reactive: (`Đây là một cách khác để khai báo reactive state. Không giống như ref, reactive() bao bọc các giá trị bên trong trong một object đặc biệt`)

```vue
<script>
    import { reactive } from 'vue'
    const state = reactive({ count: 0 })
</script>
<template>
    <button @click="state.count++">{{ state.count }}</button>
</template>
```

- **_Typing of reactive()_**: 

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

- Limitations of `reactive()`

    - **Limited value types**: it only works for object types (object, array, Map, Set). It cannot hold `primitive types` such as `string`, `number`, `boolean` (`Nó chỉ work với object types như object, array, Map, Set. Nó không work với kiểu dữ liệu nguyên thủy như string, number, boolean`)
    - Can not replace entire object: We only update by override `reactive` like this:
    
    ```vue
    <script>
        import { reactive } from 'vue'
        let state = reactive({ num: 1 })
        state = reactive({ num: 2 })
    </script>
    <template>
        <div>{{ state.num }}</div> 
        <!-- result: 2 -->
    </template>
    ```

    - **Not destructure-friendly**: when we destructure a reactive object's primitive type property into local variables, or when we pass that property into a function, we will lose the reactivity connection: (`khi chúng ta cấu trúc thuộc tính kiểu nguyên thủy của đối tượng phản ứng thành các biến cục bộ hoặc khi chúng ta chuyển thuộc tính đó vào một hàm, chúng ta sẽ mất kết nối phản ứng:`)

3. **The different between _ref_ and _reactive_**

|                | **_ref_**                                                  | **_reactive_**                                                |
| -------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Usage          | Declare the reactive state for primitives and object       | Only declare the reactive state object                        |
| Initialization | Can be initialized with any JS primitives and object       | Only can be initialized object                                |
| Access         | Accessed by `.value`                                       | Access direct into object                                     |
| Nested objects | Nested objects are also wrapped with `ref` when accessed   | Nested objects are not wrapped with `reactive` when accessed  |
| Use cases      | Used to track the state of a `single` variable or `object` | Used to track the state of an object with `nested properties` |
| Reassigning data | Can access and update data (reassigned) | Can't reassigned new data |
| Type | Ref<T> | Initial object (Interface) |
| Watch | With primitives, watch can determines `.value` when this ref changed, but it isn't change with deep object and must be use `deep: true` in watch | `watch()` always perform a deep watch even we don't need to use `deep: true` |

> **_Notion_**: Due to these limitations, we recommend using `ref()` as the primary API for declaring reactive state.
> [https://dmitripavlutin.com/ref-reactive-differences-vue](https://dmitripavlutin.com/ref-reactive-differences-vue)

[⬆️ Back to top](#table-of-content)

---

### Computed Properties
- **computed**: Help us can handle complex logic and maintain code too easily

```vue
<script setup>
    import { computed, ref } from 'vue'
    const text = ref('')
    const messageWarning = computed(() => {
        return text.length > 20 ? 'Text is too long' : ''
    })
</script>
<template>
    <input type='text' v-model="text" />
    <p>{{ messageWarning }}</p>
</template>
```

- **Typing of _computed_**

```ts
const double = computed<number>(() => {
    return 0
    // type error when it don't return a number
})
```

> **_Notion_**: `computed` helps us can cache data base on value changed. It can cache calc of result and it don't need to calculations util dependency changed. By default, computed properties are stored and used efficiently to avoid unnecessary computation. (`Computed properties được lưu trữ tạm thời dựa trên các phần tử có thể gây ra sự thay đổi. Điều này có nghĩa là nếu dữ liệu gốc mà computed property phụ thuộc vào không thay đổi, Vue sẽ lưu trữ kết quả tính toán và không tính toán lại cho đến khi một trong những phần tử phụ thuộc thay đổi. Mặc định, computed property được lưu trữ và sử dụng một cách hiệu quả để tránh tính toán không cần thiết.`)
> In short, `computed` properties are suitable for calculations based on reflective data and want to automatically store temporarily. The method is appropriate when you need to control when calculations are performed, or when you perform one-time or side-impact tasks. Choosing between them depends on your specific needs and performance. (`Tóm lại, computed property thích hợp cho tính toán dựa trên dữ liệu phản ánh và muốn tự động lưu trữ tạm thời. Phương thức thích hợp khi bạn cần kiểm soát khi tính toán được thực hiện hoặc khi bạn thực hiện các tác vụ một lần hoặc có tác động phụ. Lựa chọn giữa chúng phụ thuộc vào nhu cầu cụ thể của bạn và hiệu suất.`)

- **Writable Computed**

    - `computed` default by `getter-only`. If you wanna assign a new value, it shows warning when running
    - We can create both a getter and a setter:

    ```vue
        <script setup>
            import { ref, computed } from 'vue'
            const firstName = ref('John')
            const lastName = ref('Doe')

            const fullName = computed({
                get() {
                    return `${firstName.value} ${lastName.value}`
                },
                set(newValue: string) {
                    const [firstName, lastName] = newValue.split(' ')
                }
            })
        </script>
    ```

> [https://vuejs.org/guide/essentials/computed.html](https://vuejs.org/guide/essentials/computed.html)

[⬆️ Back to top](#table-of-content)

---

### Class & Style binding

1. **Class Binding**

- **Binding Object**: `:class`

```vue
<script setup lang='ts'>
    import { ref } from 'vue'
    const isActive = ref(true)
    const isWarning = ref(false)
</script>
<template>
    <div class="bg-gray-500 ..." :class={ active: isActive, 'text-warning': isWarning,... }>Text</div>
    <!-- active is a name class -->
</template>
<style>
    .active {
        color: #f00;
        font-weight: bold;
    }
</style>
```

- We can use `reactive` or `computed`

```vue
<script setup lang='ts'>
    import { reactive, computed } from 'vue'

    // reactive
    const classObj = reactive({
        active: true, 'text-warning': false
    })

    // computed
    const isActive = ref(true)
    const error = ref(null)

    const classObject = computed(() => ({
        active: isActive.value && !error.value,
        'text-danger': error.value && error.value.type === 'fatal'
    }))
</script>
<template>
    <div :class="classObj"></div>
    <div :class="classObject"></div>
</template>
```

- **Binding to Arrays**

```vue
<script setup lang='ts'>
    import { ref } from 'vue'
    const activeClass = ref('active')
    const warningClass = ref('text-warning')
</script>
<template>
    <div :class="[activeClass, warningClass]">Text</div>
</template>
```

- We can add `conditions into array` or use `object` like this:

```vue
<script setup lang='ts'>
    import { ref } from 'vue'
    const isActive = ref(true)
    const activeClass = ref('active')
    const warningClass = ref('text-warning')
</script>
<template>
    <div :class="[isActive ? activeClass : '', warningClass]">Text 1</div>
    <div :class="[{active: isActive}, warningClass]">Text 2</div>
</template>
```

2. **Binding Inline Styles**

- **Binding Object**: `:style`

```vue
<script setup lang='ts'>
    import { ref } from 'vue'
    const activeColor = ref('red')
    const fontSize = ref(30)
</script>
<template>
    <div :style={ color: activeColor, fontSize: `${fontSize}px` }></div>
</template>
```

- `:style`: also supports `kabab-cased` CSS, **but** recommend using `camelCase`

- Also, we can use `reactive` or `computed` like `Classes Binding`
- And, we can use `array` to `Style Binding`

```vue
<script setup lang='ts'>
    import { ref } from 'vue'
    const activeStyle = ref('color: #f00; font-weight: bold')
</script>
<template>
    <div :style="[activeStyle]">Text</div>
</template>
```

> [https://vuejs.org/guide/essentials/class-and-style.html](https://vuejs.org/guide/essentials/class-and-style.html)

[⬆️ Back to top](#table-of-content)

---

### CONDITION RENDERING

> So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime. (`Vì vậy, hãy ưu tiên v-show nếu bạn cần chuyển đổi thứ gì đó thường xuyên và ưu tiên v-if nếu điều kiện khó có thể thay đổi khi chạy.`)
> Because `v-if` has higher toggle costs while `v-show` has higher initial render costs. (`v-if có chi phí chuyển đổi cao hơn trong khi v-show có chi phí hiển thị ban đầu cao hơn. Hay nói cách là v-if ảnh hưởng đến vấn đề hiệu suất hơn v-show`)

> [https://vuejs.org/guide/essentials/conditional.html](https://vuejs.org/guide/essentials/conditional.html)

[⬆️ Back to top](#table-of-content)

---

### List rendering

1. **v-for with array**

- **v-for**: we can use `v-for` directive to render a list of items base on an array.
- It requires a special syntax in the form of `item of items`

```vue
<script setup lang='ts'>
    import { ref } from 'vue'
    const personList = ref([
        {
            id: 1,
            name: 'John'
        },
        {
            id: 2,
            name: 'Daniel'
        }
    ])
</script>
<template>
    <ul>
        <li v-for="({id, name}, idx) in personList" :key="id">{{ name }}</li>
    </ul>
</template>
```

2. **v-for with object**

```vue
<script setup lang='ts'>
    import { reactive } from 'vue'
    const docs = reactive({
        "docs-1": "Learning NodeJS",
        "docs-2": "React Course",
        "docs-3": "Learn VueJS"
    })
</script>
<template>
    <ul>
        <li v-for="(value, key) in docs">{{ key }}: {{ value }}</li>
    </ul>
</template>
```

3. **v-for with a Range**

> It starts a initial value `1` instead of `0`.

```vue
<template>
    <ul>
        <li v-for="n in 10">{{ n }}</li>
    </ul>
</template>
```

4. **v-for with v-if**

> **_Warning_**: It's not recommended use `v-for` with `v-if`, because `v-if` has a priority than `v-for`. (`Không nên dùng v-for với v-if, bởi vì v-if có ưu tiên cao hơn v-for`)

```vue
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
<!-- ❌❌❌ Don't recommend -->
```

- We has another code better like this:

```vue
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
<!-- ✅✅✅ -->
```

> [https://vuejs.org/guide/essentials/list.html](https://vuejs.org/guide/essentials/list.html)

[⬆️ Back to top](#table-of-content)

---

### Watches

- Computed properties allow us to declaratively compute derived values. However, there are cases where we need to perform "side effects" in reaction to state changes - for example, mutating the DOM, or changing another piece of state based on the result of an async operation. (`Property computed được tính toán cho phép chúng ta tính toán các giá trị dẫn xuất một cách khai báo. Tuy nhiên, có những trường hợp chúng ta cần thực hiện "side effect" để phản ứng với các thay đổi trạng thái - ví dụ: thay đổi DOM hoặc thay đổi một phần trạng thái khác dựa trên kết quả của thao tác không đồng bộ.`)

```vue
<script setup lang='ts'>
    import { ref, watch } from 'vue'
    const num = ref(0)

    watch(num, (newNum: number) => {
        if(newNum <= 0) {
            num.value = 0
        }
    })
</script>
<template>
    <div>{{ num }}</div>
</template>
```

- **Watch Source Types**: `watch's` first argument can be different types of reactive "sources": it can be a `ref` (including computed refs), `a reactive object`, `a getter function`, or `an array of multiple sources`:

```vue
<script>
    import { ref, reactive } from 'vue'
    const x = ref(0)
    const y = ref(0)
    const obj = reactive({ count: 0 })

    // single ref
    watch(x, (newX) => {
        console.log(`x is ${newX}`)
    })

    // getter
    watch(
        () => x.value + y.value,
        (sum) => {
            console.log(`sum of x + y is: ${sum}`)
        }
    )

    // array of multiple sources
    watch([x, () => y.value], ([newX, newY]) => {
        console.log(`x is ${newX} and y is ${newY}`)
    })

    // it doesn't work because we passing a number to watch() ❌❌❌ 
    watch(obj.count, (count) => {
        console.log(`count is: ${count}`)
    })

    // instead, use a getter ✅✅✅
    watch(
        () => obj.count,
        (count) => {
            console.log(`count is: ${count}`)
        }
    )
</script>
```

- **watchEffect**: We want to it run once time and allow us to track the callback's reactive dependencies automatically. It means it can automatically detect reactive dependencies used inside callback and executes that function whenever any of those dependencies change. You don't need to specify the data to watch explicitly; it captures dependencies dynamically. (`Chúng tôi muốn nó chạy một lần và cho phép chúng tôi tự động theo dõi các phần phụ thuộc phản ứng của lệnh gọi lại. Điều đó có nghĩa là nó có thể tự động phát hiện các phần phụ thuộc phản ứng được sử dụng bên trong hàm gọi lại và thực thi chức năng đó bất cứ khi nào có bất kỳ phần phụ thuộc nào trong số đó thay đổi. Bạn không cần chỉ định rõ ràng dữ liệu cần xem; nó nắm bắt các phụ thuộc một cách linh hoạt.`)

- **The different between `watch` and `watchEffect`**:
    - `watch` only tracks the explicitly watched source. It won't track anything accessed inside the callback. In addition, the callback only triggers when the source has actually changed. watch separates dependency tracking from the side effect, giving us more precise control over when the callback should fire. (`watch chỉ theo dõi source watch cụ thể. Nó sẽ không theo dõi bất cứ thứ gì truy cập bên trong callback. Thêm vào đó, callback chỉ trigger when source thưc sự thay đổi, warth tách biệt track từ side effect, cho chúng ta kiểm soát chính xác thời điểm callback sẽ kích hoạt`)

    - `watchEffect`, on the other hand, combines dependency tracking and side effect into one phase. It automatically tracks every reactive property accessed during its synchronous execution. This is more convenient and typically results in terser code, but makes its reactive dependencies less explicit. (`Mặt khác, tổng hợp dependency đã theo dõi và side effect trong 1 giai đoạn, Nó sẽ tự động theo dõi mọi reactive đã truy cập thực thi đồng bộ của nó. Điều này thuận tiện và dẫn đến kết quả code ngắn hơn, nhưng make its ít rõ ràng hơn`)

```ts
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

> [https://vuejs.org/guide/essentials/watchers.html](https://vuejs.org/guide/essentials/watchers.html)

[⬆️ Back to top](#table-of-content)

---

### Template Refs

- We want to access to the underlying DOM elements. To achive this, you can use `ref`

```vue
<script setup>
    import { ref } from 'vue'
    const inputRef = ref(null)
</script>
<template>
    <input type='text' ref='input' />
</template>
```

- We can ref dynamic by you can use `:ref`

- We can use ref to component

```vue
<script>
    import { ref } from 'vue'
    const childRef = ref(null)
</script>
<template>
    <div>
        <Child ref="childRef" />
    </div>
</template>
```

> [https://vuejs.org/guide/essentials/template-refs.html](https://vuejs.org/guide/essentials/template-refs.html)

[⬆️ Back to top](#table-of-content)

---

### Licycle Hooks

---

### Registeration Components

1. **Global Registration**

- We can make components available globally in the current Vue application using the app.component() method:

```ts
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // the registered name
  'MyComponent',
  // the implementation
  {
    /* ... */
  }
)
```

2. **Local Registration**

- It is for `SFC`

```vue
<script setup>
    import ComponentA from './ComponentA'
</script>
<template>
    <ComponentA />
</template>
```

3. **Component Name Casing**

- Using `PascalCase` because:

    - It is easier to import and register components in JS. It also helps IDEs with auto-completion. (`Nó rất dễ dàng để import và đăng ký component trong JS. Nó cũng giúp cho IDE tự động hoàn thành`)
    - <PascalCase /> makes it more obvious that this is a Vue component instead of a native HTML element in templates. It also differentiates Vue components from custom elements (web components).
    (`PascalCase làm cho nó trở nên rõ ràng hơn thay vì sử dụng native HTML element. Nó cũng tạo ra sự khác biệt với Vue component`)

> [https://vuejs.org/guide/components/registration.html](https://vuejs.org/guide/components/registration.html)

[⬆️ Back to top](#table-of-content)

---

### Props

1. **With SFC**

```vue
<script setup lang='ts'>
    import { defineProps } from 'vue'
    const props = defineProps(['text'])
    // or we can use spread operator
    const { text } = defineProps(['text'])
</script>
<template>
    <div>{{ props.text }}</div>
</template>    
```

2. **Non SFC**

```vue
<script>
    export default {
        props: ['text'],
        setup(props) {
            console.log(props)
            return {}
        }
    }
</script>
```

3. **Static & Dynamic Props**

- Static Props:

```vue
<template>
    <BlogPost title="My journey with Vue" />
</template>
```

- Dynamic Props: We can dynamic number, string, boolean, array, object,... . You can add multiple

```vue
<template>
    <Blog :title="post.title" :id="post.id" />
</template>
```

4. **One-Way data flow**

- When parent property updates, it will flow down to the child, but it can't otherwise. (`Khi thuộc tính cha mẹ cập nhật, nó sẽ chuyển xuống con, nhưng không thể làm khác được.`)
- In addition, every time the parent component is updated, all props in the child component will be refreshed with the latest value. (`Ngoài ra, mỗi khi thành phần cha được cập nhật, tất cả các props trong thành phần con sẽ được làm mới với giá trị mới nhất.`)

```vue
<script>
    import { defineProps } from 'vue'
    const props = defineProps(['foo'])

    // ❌ warning, props are readonly!
    props.foo = 'bar'
</script>
```

- But we can use this way:
    - The prop is used to pass in an initial value; the child component wants to use it as a local data property afterwards. (`Prop được sử dụng để truyền vào một giá trị ban đầu; thành phần con muốn sử dụng nó làm thuộc tính dữ liệu cục bộ sau đó.`)

    ```vue
    <script setup>
    const props = defineProps(['initialCounter'])

    // counter only uses props.initialCounter as the initial value;
    // it is disconnected from future prop updates.
    const counter = ref(props.initialCounter)
    </script>
    ```
    - The prop is passed in as a raw value that needs to be transformed.

    ```vue
    <script setup>
        const props = defineProps(['size'])

        // computed property that auto-updates when the prop changes
        const normalizedSize = computed(() => props.size.trim().toLowerCase())
    </script>
    ```

> [https://vuejs.org/guide/components/props.html](https://vuejs.org/guide/components/props.html)

[⬆️ Back to top](#table-of-content)

---

### Emitting & Listenning Event

1. **Emit & Listening to Events**

```vue
<!-- child component -->
<template>
    <button @click="$emit('customEmit')">Emit</button>
</template>

<!-- parent component -->
<script setup>
    function handleCustomEvent() {
        console.log('emit event')
    }
</script>
<template>
    <ChildComponent @custom-emit="handleCustomEvent" /> 
    <!-- it's working ✅ -->
</template>

<!-- OR we can add modifier event listeners -->
<template>
    <ChildComponent @custom-emit.once="handleCustomEvent" />
</template>
```

2. **Event Arguments**

```vue
<!-- child component -->
<template>
    <button @click="$emit('customEmit', 2, 3)">Emit</button>
</template>

<!-- parent component -->
<script setup lang='ts'>
    import { ref } from 'vue'
    const count = ref(0)

    function handleEmitEvent(num1: number, num2: number) {
        console.log(num1, num2)
        count.value += num1
        count.value += num2
    }
</script>
<template>
    <ChildComponent @custom-emit="handleEmitEvent" />
    <div>{{ count }}</div>
</template>
```

3. **Declaring Emitted Events**

- The `$emit` method that we used in the <template> isn't accessible within the <script setup> section of a component, but `defineEmits()` returns an equivalent function that we can use instead:

```vue
<script setup>
    const emit = defineEmits(['inFocus', 'submit'])

    function buttonClick() {
    emit('submit')
    }
</script>
```

> [https://vuejs.org/guide/components/events.html](https://vuejs.org/guide/components/events.html)

[⬆️ Back to top](#table-of-content)

---

### Deep understand about `v-model`

1. **Reuseable Input Component**

- We can use `emit` with `value` from parent component

```vue
<!-- child input component -->
<script setup lang='ts'>
    import { defineProps, defineEmits } from 'vue'
    const props = defineProps<{
        modelValue: string
    }>()
    defineEmits(['update:modelValue'])
</script>
<template>
    <div>
        <input type='text' :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<!-- parent component -->
<script setup lang='ts'>
    import { ref } from 'vue'
    const inputValue = ref('')
</script>
<template>
    <InputField v-model="inputValue" />
</template>
```

> **_Note_**: Must be use `modelValue` according to `vue's principles`

- We can use `value` instead of `modelValue`.

```ts
<script setup lang='ts'>
defineProps({
  value: {
    type: String,
    required: true,
  }
})
defineEmits(['update:value'])
</script>
<template>
  <button @click="$emit('update:value', 'click')">Click me</button>
</template>
```

2. **v-model arguments**

- By default, `v-model` on a component uses `modelValue` as the prop and `update:modelValue` as the event. We can modify these names passing an argument to v-model: (`Theo mặc định, v-model trên một thành phần sử dụng modelValue làm chỗ dựa và update:modelValue làm sự kiện. Chúng ta có thể sửa đổi những tên này bằng cách chuyển đối số sang v-model:`)

```vue
<!-- child component -->
<script setup lang='ts'>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>

<!-- parent component -->
<script setup lang='ts'>
    import { ref } from 'vue'
    const title = ref('')
</script>  
<template>
    <MyComponent v-model:title="title" />
</template>
```

3. **Multiple Binding**

```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

- Then,...

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

> [https://vuejs.org/guide/components/v-model.html](https://vuejs.org/guide/components/v-model.html)

[⬆️ Back to top](#table-of-content)

---

### Slots

- In the some case, we may want to use pass a template fragment to a child component, and let the child component render the fragment within its own template. (`Trong một số trường hợp, chúng ta có thể muốn chuyển một đoạn mẫu cho một thành phần con và để thành phần con đó hiển thị đoạn đó trong mẫu của chính nó.`)

```vue
<Button>
    Click me
</Button>

<-- you can code like this to work --!>
<button>
    <slot></slot> <!-- slot outlet -->
</button>
```

1. `Fallback Content`
- There are a case very useful when you can specify fallback content for a slot, to be rendered only when no content is provided.
```vue
<button>
  <slot>
    Submit
  </slot>
</button>

// use in another component
<Button></Button>
// <button>Submit</button>

<Button>Add data</Button>
// <button>Add data</button>
```

2. `Name Slots`
- There are times when it's useful to have multiple slot outlets in a single component.
```vue
// layout BaseLayout
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

- You can apply a lot of different slot.
```vue
<BaseLayout>
  <template v-slot:header>
    <!-- content for the header slot -->
  </template>
  <template v-slot:main>
    <!-- content for the main slot -->
  </template>
</BaseLayout>
```

3. `Dynamic Slots`

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- with shorthand -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

4. `Scoped Slots`

- However, there are cases where it could be useful if a slot's content can make use of data from both the parent scope and the child scope. To achieve that, we need a way for the child to pass data to a slot when rendering it. (`Tuy nhiên, có những trường hợp có thể hữu ích nếu nội dung của một vị trí có thể sử dụng dữ liệu từ cả phạm vi cha và phạm vi con. Để đạt được điều đó, chúng ta cần một cách để trẻ truyền dữ liệu đến một vị trí khi hiển thị nó.`)

- It means chnage data into the component include lots of slots. When the data is into the component changed, props outside also changed.

```vue
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>

//

<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

- `Name Scoped Slot`: Named scoped slots work similarly - slot props are accessible as the value of the v-slot directive: v-slot:name="slotProps". When using the shorthand, it looks like this:
```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps.name }}
  </template>

  // or
  <template #header="{ message }">{{ message }}</template> // show hello here.

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>

//

<slot name="header" message="hello"></slot>
```

- `Fancy List`: List item from the component encapsulate and you can use item data to use outside.
```vue
<BookList>
  <template #item="{ name, subDescription }">
    <h3>{{ name }}</h3>
    <p>{{ subDescription }}</p>
  </template>
</BookList>

//

<div>
  <div v-for="item in list" :key="item.id">
    <slot name="item" :item="item"></slot>
  </div>
</div>
```

> [https://vuejs.org/guide/components/slots.html#scoped-slots](https://vuejs.org/guide/components/slots.html#scoped-slots)
![Slot component for children](./public/images/slots.png)

[⬆️ Back to top](#table-of-content)

---

### Provide & Inject

1. `Provide`

- Usually, when we need to pass data from the parent to a child component, we use props. However, imagine the case where we have a large component tree, and a deeply nested component needs something from a distant ancestor component. With only props, we would have to pass the same prop across the entire parent chain:

```vue
<script setup lang="ts">
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

- You can pass an object includes function and ref value like this:

```vue
import { provide } from 'vue'
const message: Ref<string> = ref('say hello')
function say() {
  message.value = 'how are you today?'
}

provide('message', {
  message,
  say
})
```

2. `Inject`

- To inject data provided by an ancestor component, use the `inject()` function:

```vue
<script>
import { inject } from 'vue'
const { message, say } = inject('message')
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <button @click="say">Say</button>
  </div>
</template>
```

- If you want to ensure data not change when data change, you need to use `readonly`
```vue
import { readonly, ref, provide, Ref } from 'vue'

const count: Ref<number> = ref(0)
provide('count', readonly(count))
```

> [https://vuejs.org/guide/components/provide-inject.html](https://vuejs.org/guide/components/provide-inject.html)

[⬆️ Back to top](#table-of-content)

---

### Composables

1. `What is the composables`

- When building frontend applications, we often need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates stateless logic: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example lodash and date-fns, which you may have heard of.
- It helps you can `reuse logic`, it looks like `hook` in react

2. `Async composable`

```vue
export const useFetch = async (url: string) => {
  let data = null
  let error = null

  try {
    const res = await fetch(url)
    data = await res.json()
  } catch(err) {
    error = err
  }
  
  return { data, error }
} 
```

> [https://vuejs.org/guide/reusability/composables.html](https://vuejs.org/guide/reusability/composables.html)

[⬆️ Back to top](#table-of-content)

---
### Vue Form (`Vee Validate + Yup`)

1. `Install`

```sh
yarn add vee-validate yup
# or
npm i vee-validate yup
```

2. `Validate by useForm + schema yup`

-   You need to import `yup` and `useForm`, then you can use it.

```vue
<script setup lang='ts'>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required('Please enter name'),
    age: yup.number().required('Please enter age'),
    bio: yup.string()
})

const { handleReset, handleSubmit, meta, errors, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        age: 0,
        bio: ''
    }
})

const handleSubmit = handleSubmit((values: any) => {
    console.log(values)
    handleReset()
})
</script>

<template>
    <form>
        <div>
            <input type='text' name='name' />
            <p>{{ errors.value.name || '' }}</p>   
        </div>
        <div>
            <input type='text' name='age' />
            <p>{{ errors.value.age || '' }}</p>   
        </div> 
        <div>
            <input type='text' name='bio' />
            <p>{{ errors.value.bio || '' }}</p>   
        </div>
        <button type="submit" :disabled="isSubmitting || !meta.valid">Submit</button>
    </form>
</template>
```

- `Set field value`: `setFieldValue(key, value)`

```vue
<script>
const { setFieldValue } = useForm()

watch(undefined, () => {
    setFieldValue('name', ...)
    setFieldValue('age', ...)
    setFieldValue('bio', ...)
})
</script>
```

- You can set multiple values: `setValues({ key1: value1, key2: value2 })`

```vue
<script>
const { setValues } = useForm()

setValues({
    name: ...,
    age: ...,
    bio: ...
})
</script>
```

- `meta`: touched, dirty, valid, pending, initialValues

> [https://vee-validate.logaretm.com/v4/api/use-form](https://vee-validate.logaretm.com/v4/api/use-form)

3. `Divide each field component by useField()`

```vue
<script setup lang='ts'>
import { useField } from 'vee-validate'
import { defineProps } from 'vue'

const { name } = defineProps<{
    name: string
}>()
const { value, errorMessage } = useField<string>(name)
</script>

<template>
    <div>
        <input v-model="value" type='text' :name="name" />
        <p>{{ errorMessage }}</p>
    </div>
</template>
```

> [https://vee-validate.logaretm.com/v4/api/use-field](https://vee-validate.logaretm.com/v4/api/use-field)

4. `Hooks`

- `<Form />`: is a simple HTML form but with a few adjustments, by default `form` HTML.

```vue
<script setup lang='ts'>
import { Form } from 'vee-validate'
</script>

<template>
    <Form v-slot="{ errors, isSubmitting, meta, values, setFieldValue, handleSubmit, handleReset, ... }"></Form>
</template>
```

- `props`: as, validationSchema, initialValues, initialTouched, validateOnMount, keepValues, initialErrors.

> [https://vee-validate.logaretm.com/v4/api/form](https://vee-validate.logaretm.com/v4/api/form)

- `<Field />`: it is extremely flexible component that makes rendering input field easy and intuitive.

```vue
<template>
    <Field name="name" as="select">
        <option>VN</option>
        <option>US</option>
        <option>EN</option>
    </Field>
</template>
```

- Use `v-model` in `Field`

```vue
<Field v-model="name" type="text" name="name" v-slot="{ field }">
  <input v-bind="field">
</Field>
```

> [https://vee-validate.logaretm.com/v4/api/field](https://vee-validate.logaretm.com/v4/api/field)

[⬆️ Back to top](#table-of-content)

---

### Vue Select Form (Multiselect)

1. `Install`

```sh
yarn add @vueform/multiselect
# or
npm install @vueform/multiselect
```

2. `Setup`

```vue
<script setup lang='ts'>
    import { Multiselect } from '@vueform/multiselect'
    import { ref, Ref } from 'vue'

    const value: Ref<string> = ref('')
    const options: Ref<string[]> = ref([
        'VN',
        'EN',
        'US'
    ])
</script>
<template>
    <Multiselect
        mode="tags"
        v-model="value"
        :options="options"
        :searchable="true"
    />
</template>
```

- `mode`: single, multiple, tags; `default: single`

> [https://github.com/vueform/multiselect#readme](https://github.com/vueform/multiselect#readme)

[⬆️ Back to top](#table-of-content)

---
### Component Element

- This is a `meta component` to render dynamic component or element.
- It can determined by `:is` in `<component :is="component here" />`.

```vue
<script setup lang="ts">
import ComponentOne from './components/ComponentOne.vue'
</script>
<template>
  <component :is="ComponentOne" />
</template>
```

- You can add validate to check and render component you want.

```vue
<script setup lang="ts">
  import ComponentOne from './components/ComponentOne.vue'
  import ComponentTwo from './components/ComponentTwo.vue'

  const activeComponent = ref(1)
</script>
<template>
  <component :is="activeComponent === 1 ? ComponentOne : ComponentTwo" />
</template>
```

- But when use navtive HTML, it can't use `v-model` to dynamic created won't work.

```vue
<script>
const input = ref('input')
const inputVal = ref('')
</script>
<template>
# it won't work when use v-model, is native HTML Element
<component :is="input" v-model="inputVal" />
</template>
```
