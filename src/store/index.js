import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
    users: [],
    roles: [],
    role_id: null,
    genres: [],
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    setGenres(state, genres) {
      state.genres = genres;
    },
    setToken(state, { token, role_id }) {
      state.token = token;
      state.role_id = role_id;
      localStorage.setItem("token", token);
    },

    clearToken(state) {
      state.token = "";
      state.role_id = null;
      localStorage.removeItem("token");
    },
    clearUsers(state) {
      state.users = [];
    },
    clearRoles(state) {
      state.roles = [];
    },
    clearGenres(state) {
      state.genres = [];
    },
  },
  actions: {
    async register({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/register", credentials);
        console.log("User registered successfully:", data.user.name);
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
      }
    },

    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/login", credentials);
        commit("setToken", {
          token: data.access_token,
          role_id: data.user.role_id,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async logout({ commit }) {
      await axios.post("/auth/logout");
      commit("clearToken");
      commit("clearProducts");
      commit("cleargenres");
      commit("clearUsers");
      commit("clearRoles");
    },

    // Users CRUD
    async fetchUsers({ commit }) {
      try {
        const { data } = await axios.get("/users/index");
        commit("setUsers", data.users);
      } catch (error) {
        console.error(error);
      }
    },

    async updateUser({ commit, state }, user) {
      try {
        const { data } = await axios.put(`/users/update/${user.id}`, user);
        // Update the state with the updated user
        commit(
          "setUsers",
          state.users.map((usr) => (usr.id === user.id ? data.user : usr))
        );
      } catch (error) {
        console.error(error);
      }
    },

    async deleteUser({ commit, state }, userId) {
      try {
        await axios.delete(`/users/delete/${userId}`);
        // Remove the deleted user from the state
        commit(
          "setUsers",
          state.users.filter((user) => user.id !== userId)
        );
      } catch (error) {
        console.error(error);
      }
    },

    // Roles CRUD
    async fetchRoles({ commit }) {
      try {
        const { data } = await axios.get("/roles/index");
        commit("setRoles", data.roles);
      } catch (error) {
        console.error(error);
      }
    },

    // Genres CRUD
    async fetchGenres({ commit }) {
      try {
        const { data } = await axios.get("/genres/index");
        commit("setGenres", data.genres);
      } catch (error) {
        console.error(error);
      }
    },

    async addGenre({ commit, state }, genre) {
      try {
        const { data } = await axios.post("/genres/create", genre);
        // Update the state with the newly added genre
        commit("setGenres", [...state.genres, data.genre]);
      } catch (error) {
        console.error("Failed to add genre:", error);
      }
    },

    async updateGenre({ commit, state }, genre) {
      try {
        const { data } = await axios.put(`/genres/update/${genre.id}`, genre);
        // Update the state with the updated genre
        const updatedgenre = state.genres.map((gnr) =>
          gnr.id === data.genre.id ? data.genre : gnr
        );
        commit("setGenres", updatedgenre);
      } catch (error) {
        console.error("Failed to update genre:", error);
      }
    },

    async deleteGenre({ commit, state }, id) {
      try {
        await axios.delete(`/genres/delete/${id}`);
        // Update the state after successful deletion
        const updatedGenres = state.genres.filter((genre) => genre.id !== id);
        commit("setGenres", updatedGenres);
      } catch (error) {
        console.error("Failed to delete genre:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.token,
    isAdmin: (state) => state.role_id === 1,
  },
});
