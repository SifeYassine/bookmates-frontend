<template>
  <div class="flex flex-col items-center justify-center font-sans">
    <h1 class="text-4xl text-gray-800 mb-6">Login</h1>
    <form
      @submit.prevent="login"
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <input
        v-model="email"
        type="text"
        placeholder="email"
        class="w-4/5 p-3 mb-4 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-base text-gray-800 bg-white"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-4/5 p-3 mb-4 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-base text-gray-800 bg-white"
      />
      <button
        type="submit"
        class="w-3/5 p-3 bg-blue-500 text-white text-base rounded-full transition-colors duration-300 hover:bg-blue-700 shadow-md"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const login = async () => {
      await store.dispatch("login", {
        email: email.value,
        password: password.value,
      });
      router.push("/");
    };

    return { email, password, login };
  },
};
</script>
