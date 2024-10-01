<template>
  <div class="flex flex-col items-center justify-center mt-[8vh] font-sans">
    <form
      @submit.prevent="submitForm"
      class="form bg-white p-5 pb-8 rounded-[20px] w-full max-w-md"
    >
      <div class="logo flex flex-col items-center">
        <img src="@/assets/logos/logo.png" class="w-[250px]" alt="Logo" />
        <h1 class="text-3xl text-gray-700 font-[500] mb-6">Register</h1>
        <p class="text-gray-700 text-base">
          Welcom to BookMates, Start by creating an account
        </p>
      </div>

      <div class="flex flex-col items-center">
        <vs-input
          v-model="userCredentials.name"
          type="text"
          color="#5208b6"
          label="Name"
          label-float
          required
          style="width: 326px"
        >
          <template #icon> # </template>
        </vs-input>

        <vs-input
          v-model="userCredentials.email"
          type="email"
          color="#5208b6"
          label="Email"
          label-float
          required
          style="width: 326px"
        >
          <template #icon> @ </template>
        </vs-input>

        <vs-input
          v-model="userCredentials.password"
          :type="inputType"
          color="#5208b6"
          label="Password"
          label-float
          required
          @click-icon="hasVisiblePassword = !hasVisiblePassword"
          icon-after
          style="width: 326px"
        >
          <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt" />
            <i v-else class="bx bx-hide" />
          </template>
        </vs-input>

        <p class="my-6 text-gray-800">
          Already have an account?
          <router-link to="/login" class="text-blue-500">Login</router-link>
        </p>
        <vs-button class="w-[90%]" color="#5208b6">
          <h1 type="submit">Register</h1>
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import axios from "@/api/axios";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // User credentials including location info
    const userCredentials = ref({
      name: "",
      email: "",
      password: "",
      latitude: "",
      longitude: "",
      city: "",
      country: "",
    });

    const hasVisiblePassword = ref(false);
    const inputType = computed(() =>
      hasVisiblePassword.value ? "text" : "password"
    );

    function getUserCoordinates() {
      alert("We need your location to show you the nearest books.");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    }

    async function success(position) {
      try {
        userCredentials.value.latitude = position.coords.latitude;
        userCredentials.value.longitude = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userCredentials.value.latitude}&longitude=${userCredentials.value.longitude}&localityLanguage=en`;

        const response = await axios.get(geoApiUrl);
        const data = response.data;
        userCredentials.value.country = data.countryName;
        userCredentials.value.city = data.city;
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

    async function submitForm() {
      try {
        await store.dispatch("register", userCredentials.value);
        router.push("/login");
      } catch (error) {
        console.error("Registration failed:", error.response.data);
        alert("Registration failed. Please try again.");
      }
    }

    onMounted(() => {
      setTimeout(() => {
        getUserCoordinates();
      }, 300);
    });

    return {
      userCredentials,
      submitForm,
      getUserCoordinates,
      inputType,
      hasVisiblePassword,
    };
  },
};
</script>

<style scoped>
.form {
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
