<template>
  <div class="flex flex-col items-center justify-center mt-[20vh] font-sans">
    <h1 class="text-4xl text-gray-800 mb-6">Register</h1>
    <form
      @submit.prevent="getUserCoordinates"
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <input
        v-model="name"
        type="text"
        placeholder="name"
        class="w-4/5 p-3 mb-4 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-base text-gray-800 bg-white"
      />
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
      <input v-model="latitude" type="text" hidden />
      <input v-model="longitude" type="text" hidden />
      <p class="mb-4">
        Already have an account?
        <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
      <button
        type="submit"
        class="w-3/5 p-3 bg-blue-500 text-white text-base rounded-full transition-colors duration-300 hover:bg-blue-700 shadow-md"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "@/api/axios";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const latitude = ref("");
    const longitude = ref("");
    const city = ref("");
    const country = ref("");

    function getUserCoordinates() {
      alert("We need your location to show you the nearest books");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }

    async function success(position) {
      try {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude.value}&longitude=${longitude.value}&localityLanguage=en`;

        const response = await axios.get(geoApiUrl);
        const data = response.data;
        country.value = data.countryName;
        city.value = data.city;

        await register();
      } catch (error) {
        console.error("Error retrieving geolocation data:", error);
      }
    }

    function error(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("You have denied the request to get location.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get your location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;

        default:
          alert("An unknown error occurred.");
          break;
      }
    }

    async function register() {
      try {
        await store.dispatch("register", {
          name: name.value,
          email: email.value,
          password: password.value,
          latitude: latitude.value,
          longitude: longitude.value,
          city: city.value,
          country: country.value,
        });
        router.push("/login");
      } catch (error) {
        console.error("Registration failed:", error.response.data);
      }
    }

    return {
      name,
      email,
      password,
      latitude,
      longitude,
      city,
      country,
      register,
      getUserCoordinates,
    };
  },
};
</script>
