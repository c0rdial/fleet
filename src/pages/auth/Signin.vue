<template>
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Get started today!</h1>
        <p class="mt-4 text-gray-500">Welcome back to your account. Please sign in to continue.</p>
      </div>

      <form
        class="mx-auto mt-8 mb-0 max-w-md space-y-4"
        method="POST"
        action="#"
        @submit.prevent="handleLogin"
      >
        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input
              v-model="params.email"
              type="email"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
              required
            />
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>

          <div class="relative">
            <input
              type="password"
              v-model="params.password"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <div class="flex flex-col items-start justify-between">
          <button
            type="submit"
            class="inline-block mt-6 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
          <p class="text-sm text-gray-500 mt-8">
            No account? <br />
            Please register to continue.
            <router-link class="underline text-blue-600" to="/auth/register">
              Register
            </router-link>
          </p>
        </div>
      </form>
    </div>

    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img
        alt="Welcome"
        src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const user = {
      email: '',
      password: ''
    }

    const params = reactive({ ...user })

    const handleLogin = () => {
      console.log(params)
      // store.dispatch('user/getAllUsers',{
      //   page: 1,
      //   limit: 10,
      // })
      store.dispatch('auth/login', {
        data: {
          email: params.email,
          password: params.password
        }
        // success: (response) => {
        //   showAuthSuccessNotification("Login success");
        //   router.push({ name: "dashboard" });
        // },
        // fail: (err) => {
        //   showAuthDangerNotification(`${err.body.message}`);
        //   console.log(err);
        // },
      })
    }

    return {
      handleLogin,
      params
    }
  }
})
</script>
