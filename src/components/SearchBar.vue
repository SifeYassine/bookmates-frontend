<template>
  <div class="search-bar m-auto mb-8 w-[60%]">
    <input
      v-model="query"
      @keyup.enter="search"
      type="text"
      placeholder="Search..."
      class="search-input w-3/5 p-3 border-2 border-gray-300 rounded-lg text-base text-gray-800 outline-none bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SearchBar",
  emits: ["search"],
  setup(props, { emit }) {
    const query = ref("");

    function search() {
      emit("search", query.value);
    }

    return {
      query,
      search,
    };
  },
};
</script>
