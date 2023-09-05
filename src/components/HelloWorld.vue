<script lang="ts">
import { ref, reactive } from 'vue'

const count = ref(0)
const listNums = ref([1, 2])
let state = reactive({ num: 1 })
state = reactive({ num: 2 })
const activeStyle = ref('color: #f00; font-weight: bold')

export default {
  data() {
    return {
      username: '',
      password: '',
      errUsername: '',
      errPassword: '',
      success: 'Login successfully',
      isSubmit: false,
    }
  },
  setup() {
    return {
      count,
      listNums,
      state,
      activeStyle
    }
  },
  watch: {
    username() {
      if (this.username) {
        this.errUsername = ''
      } else {
        this.errUsername = 'User is required'
      }
    },
    password() {
      if (this.password) {
        this.errPassword = ''
      } else {
        this.errUsername = 'Password is required'
      }

    },
    count(newValue: number, oldValue: number) {
      console.log('new value:', newValue)
      console.log('old value:', oldValue)
    }
  },
  methods: {
    increase() {
      this.count++
    },
    decrease() {
      if (this.count === 0) return
      this.count--
    },
    addNumbs() {
      const listNums = [...this.listNums]
      this.listNums.push(listNums.length + 1)
    },
    handleLoginSubmit() {
      if (!this.username) {
        this.errUsername = 'Username is required'
      }
      if (!this.password) {
        this.errPassword = 'Password is required'
      }
      if (!this.username || !this.password) return
      this.isSubmit = true
      console.log('submit:', this.username, this.password)
      setTimeout(() => {
        this.isSubmit = false
      }, 2000)
    }
  }
}
</script>

<template>
  <div class="max-w-[500px] m-auto p-4">
    <form @submit.prevent="handleLoginSubmit">
      <div class="flex flex-col gap-2 mb-4">
        <div>
          <label for="username" class="inline-block font-medium mb-1 text-sm">Username <span
              class="text-red-500">*</span></label>
          <input type="text" v-model="username" id="username" placeholder="Enter username"
            class="w-full border border-gray-300 p-2 rounded outline-none" />
          <p v-show="errUsername" class="text-red-500 text-sm pl-1.5 font-medium">{{ errUsername }}</p>
        </div>
        <div>
          <label for="password" class="inline-block font-medium mb-1 text-sm">Password <span
              class="text-red-500">*</span></label>
          <input type="password" v-model="password" id="password" placeholder="Enter password"
            class="w-full border border-gray-300 p-2 rounded outline-none" />
        </div>
        <p v-show="errPassword" class="text-red-500 text-sm pl-1.5 font-medium">{{ errPassword }}</p>
      </div>
      <button type="submit"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 font-semibold duration-200 ease-in-out">Send</button>
    </form>
    <div v-if="isSubmit" class="bg-green-100 p-2 rounded text-green-500 font-medium w-full text-center mt-4">{{ success
    }}</div>

    <!-- count -->
    <div class="mt-4">
      <div class="mb-2">{{ count }}</div>
      <div class="flex gap-2">
        <button class="px-4 py-2 text-white bg-red-500 rounded" @click="decrease">-</button>
        <button class="px-4 py-2 text-white bg-blue-500 rounded" @click="increase">+</button>
      </div>
    </div>
  </div>
</template>

