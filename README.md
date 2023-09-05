## Table of Content

1. [Install Vue](#install-vuejs--ts--vitejs)
2. [Create a Vue Application](#create-a-vue-application)
3. [Template Syntax](#template-syntax)
4. [Event & Method](#events--methods)
5. [Reactive Fundamental](#reactivity-fundamentals)
6. [Computed properties](#computed-properties)
7. [Class & Style Binding](#class-and-style-bindings)
8. [Condition Rendering](#condition-rendering)
9. [List rendering](#list-rendering)
10. [Watches](#watches)

---

### INSTALL VUEJS + TS + VITEJS

```sh
npm create vite my-app --template vue-ts
############### or ################
yarn create vite my-app --template vue-ts
```

---

### CREATE A VUE APPLICATION

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

### TEMPLATE SYNTAX

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

### EVENTS & METHODS

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

### REACTIVITY FUNDAMENTALS

1. **Declare Reactivity State  _ref()_**

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

2. **Declare Reactivity State  _reactive()_**

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

> **_Notion_**: Due to these limitations, we recommend using `ref()` as the primary API for declaring reactive state.
[⬆️ Back to top](#table-of-content)

---

### COMPUTED PROPERTIES

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

### CLASS AND STYLE BINDINGS

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

### LIST RENDERING

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

### WATCHES

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

### TEMPLATE REFS

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

[https://vuejs.org/guide/essentials/template-refs.html](https://vuejs.org/guide/essentials/template-refs.html)
[⬆️ Back to top](#table-of-content)

---

### LICYCLE HOOKS

---

### REGISTRATION COMPONENT



---

### PROPS

