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
    selectedBookPost: {},
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
    addNewBookPostToState(state, newBookPost) {
      state.bookPosts.push(newBookPost);
    },
    setBookPosts(state, bookPosts) {
      state.bookPosts = bookPosts;
    },
    setBookPost(state, bookPost) {
      state.selectedBookPost = bookPost;
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
    clearBooks(state) {
      state.books = [];
    },
    clearBookPosts(state) {
      state.bookPosts = [];
    },
  },
  actions: {
    async register(credentials) {
      try {
        const { data } = await axios.post("/auth/register", credentials);
        console.log("User registered successmappedy:", data.user.name);
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
    async fetchBookPosts({ commit, state }) {
      try {
        const { data } = await axios.get("book_posts/index");

        // Call mappingHandler to map book posts
        const mappedBookPosts = mappingHandler(
          data.bookPosts,
          state.books,
          state.genres
        );

        commit("setBookPosts", mappedBookPosts);
      } catch (error) {
        console.error("Failed to fetch book posts:", error);
      }
    },

    async getBookPostById({ commit, state }, id) {
      try {
        const { data } = await axios.get(`book_posts/show/${id}`);

        // Call mappingHandler for a single book post
        const mappedBookPost = mappingHandler(
          data.bookPost,
          state.books,
          state.genres
        )[0]; // For single book post

        commit("setBookPost", mappedBookPost);
      } catch (error) {
        console.error("Failed to fetch book post details:", error);
      }
    },

    async addBookPost({ commit, state }, bookPost) {
      try {
        const { data } = await axios.post("book_posts/create", bookPost);

        const mappedBookPost = mappingHandler(
          [data.bookPost],
          state.books,
          state.genres
        )[0];
        // Update the state with the newly added bookPost
        commit("addNewBookPostToState", mappedBookPost);
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
    getGenres: (state) => state.genres,
    getBooks: (state) => state.books,
    getBookPosts: (state) => state.bookPosts,
    getBookPost: (state) => state.selectedBookPost,
  },
});

function mappingHandler(bookPosts, books, genres) {
  // Ensure input is always an array
  if (!Array.isArray(bookPosts)) {
    bookPosts = [bookPosts];
  }

  return bookPosts.map((bookPost) => {
    const offeredBook = books.find(
      (book) => book.id === bookPost.offeredBook_id
    );
    const wishedBook = books.find((book) => book.id === bookPost.wishedBook_id);

    if (offeredBook) {
      offeredBook.genre = genres.find(
        (genre) => genre.id === offeredBook.genre_id
      );
    }

    if (wishedBook) {
      wishedBook.genre = genres.find(
        (genre) => genre.id === wishedBook.genre_id
      );
    }

    return {
      ...bookPost,
      offeredBook,
      wishedBook,
    };
  });
}
