import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
    users: [],
    roles: [],
    user_id: null,
    role_id: null,
    genres: [],
    books: [],
    bookPosts: [],
    token: localStorage.getItem("token") || "",
    searchQuery: "",
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
    setBooks(state, books) {
      state.books = books;
    },
    addNewBookToState(state, newBook) {
      state.books.push(newBook);
    },
    setBookPosts(state, bookPosts) {
      state.bookPosts = bookPosts;
    },
    setTokenIds(state, { token, user_id, role_id }) {
      state.token = token;
      state.user_id = user_id;
      state.role_id = role_id;
      localStorage.setItem("token", token);
    },
    setUserIds(state, { user_id, role_id }) {
      state.user_id = user_id;
      state.role_id = role_id;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },

    clearTokenIds(state) {
      state.token = "";
      state.user_id = null;
      state.role_id = null;
      localStorage.removeItem("token");
    },
    clearUserIds(state) {
      state.user_id = null;
      state.role_id = null;
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
    clearBooks() {
      state.books = [];
    },
    clearBookPosts(state) {
      state.bookPosts = [];
    },
  },
  actions: {
    async register({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/register", credentials);
        console.log("User registered successfully:", data.user.name);
      } catch (error) {
        console.error(error);
      }
    },

    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/login", credentials);
        commit("setTokenIds", {
          token: data.access_token,
          user_id: data.user.id,
          role_id: data.user.role_id,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async loggedUser({ commit }) {
      try {
        const { data } = await axios.post("/auth/me");
        commit("setUserIds", {
          user_id: data.id,
          role_id: data.role_id,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async logout({ commit }) {
      await axios.post("/auth/logout");
      commit("clearTokenIds");
      commit("clearUserIds");
      commit("clearGenres");
      commit("clearUsers");
      commit("clearRoles");
      commit("clearBooks");
      commit("clearBookPosts");
    },

    searchQuery({ commit }, query) {
      commit("setSearchQuery", query);
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

    // Books CRUD
    async fetchBooks({ commit }) {
      try {
        const { data } = await axios.get("books/index");
        commit("setBooks", data.books);
      } catch (error) {
        console.error(error);
      }
    },

    async addBook({ commit, state }, book) {
      try {
        // Create a FormData object
        const formData = new FormData();
        let newBook;

        //Loop through the book object to append all fields to FormData
        Object.entries(book).forEach(([key, value]) => {
          if (value != null) {
            formData.append(key, value);
          }
        });

        //Make the API request with the FormData object
        const { data } = await axios.post("books/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.token}`,
          },
        });

        newBook = data.Book;

        // Commit the newly added book to the state
        commit("addNewBookToState", newBook);
      } catch (error) {
        console.error("Failed to add book:", error);
      }
    },

    // Book Posts CRUD
    async fetchBookPosts({ commit }) {
      try {
        const { data } = await axios.get("book_posts/index");
        commit("setBookPosts", data.bookPosts);
      } catch (error) {
        console.error(error);
      }
    },

    async addBookPost({ commit, state }, bookPost) {
      try {
        const { data } = await axios.post("book_posts/create", bookPost);
        // Update the state with the newly added bookPost
        commit("setBookPosts", [...state.bookPosts, data.bookPost]);
      } catch (error) {
        console.error("Failed to add bookPost:", error);
      }
    },
  },
  getters: {
    userId: (state) => state.user_id,
    roleId: (state) => state.role_id,
    isAuthenticated: (state) => state.token,
    isAdmin: (state) => state.role_id === 1,
    getBooks: (state) => {
      return state.bookPosts.map((bookPost) => {
        const offeredBook = state.books.find(
          (book) => book.id === bookPost.offeredBook_id
        );
        const wishedBook = state.books.find(
          (book) => book.id === bookPost.wishedBook_id
        );
        return {
          ...bookPost,
          offeredBook,
          wishedBook,
        };
      });
    },
  },
});
