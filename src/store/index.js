import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
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
    setGenres(state, genres) {
      state.genres = genres;
    },
    setBooks(state, books) {
      state.books = books;
    },
    setBookPosts(state, bookPosts) {
      state.bookPosts = bookPosts;
    },
    setSelectedBookPostToState(state, mappedSelectedBookPost) {
      state.selectedBookPost = mappedSelectedBookPost;
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
    async register({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/register", credentials);
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
      commit("clearBooks");
      commit("clearBookPosts");
    },

    searchQuery({ commit }, query) {
      commit("setSearchQuery", query);
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
        let mappedBook;

        //Loop through the book object to append all fields to FormData
        Object.entries(book).forEach(([key, value]) => {
          if (value != null) {
            formData.append(key, value);
          }
        });

        //Make the API request with the FormData object
        const { data } = await axios.post("books/create", formData);

        mappedBook = data.Book;

        // Commit the newly added book to the state
        commit("setBooks", [...state.books, mappedBook]);
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
        const mappedSelectedBookPost = mappingHandler(
          data.bookPost,
          state.books,
          state.genres
        )[0]; // For single book post

        commit("setSelectedBookPostToState", mappedSelectedBookPost);
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
        commit("setBookPosts", [...state.bookPosts, mappedBookPost]);
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
