# BookMates Frontend

The **Vue 3** frontend for **BookMates**, a book-exchange platform where readers offer books they own in exchange for books they want. Built with Vue Router, Vuex, Tailwind CSS, and Vuesax Alpha, and powered by the [BookMates API](https://github.com/SifeYassine/bookmates-backend).

## Features

- **Register & login** with JWT
  - Registration detects your **location** via the browser Geolocation API and resolves your city and country with the BigDataCloud reverse-geocoding API
- **Book posts (exchange offers)**
  - Browse offers showing the *offered* book and the *wished* book, with covers and genres
  - Create an offer through a modal: add both books (title, author, description, ISBN, pages, year, genre, cover image)
  - View offer details in a modal
  - **Search** offers and **filter by genre** (`?genre=` query parameter)
- **Genres**: list and add genres
- Home page with hero, navbar, sidebar, and footer
- 404 page

## Tech Stack

| Concern   | Technology |
| --------- | ---------- |
| Framework | Vue 3 (Vue CLI) |
| Routing   | Vue Router 4 |
| State     | Vuex 4 |
| UI        | Vuesax Alpha, Tailwind CSS, Boxicons |
| HTTP      | Axios |

## Project Structure

```
src/
├── api/axios.js                # Axios instance (http://127.0.0.1:8000/api)
├── router/index.js
├── store/index.js              # Auth, genres, books, book posts, search
├── components/
│   ├── pages/                  # home, auth, bookposts, genres, notFound
│   └── ui/
│       ├── cores/              # Header, NavBar, SideBar, Hero, SearchBar, Footer
│       ├── bookposts/          # List, add modal, details modal
│       └── genres/             # List, add modal
├── assets/                     # Tailwind input & compiled CSS
├── App.vue
└── main.js
```

## Routes

| Path          | Page |
| ------------- | ---- |
| `/`           | Home |
| `/login`      | Login |
| `/register`   | Register |
| `/book_posts` | Book exchange offers |
| `/genres`     | Genres |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- The [BookMates API](https://github.com/SifeYassine/bookmates-backend) running on `http://127.0.0.1:8000`

### Installation

```bash
git clone https://github.com/SifeYassine/bookmates-frontend.git
cd bookmates-frontend
npm install
```

### Configuration

The API URL is set in `src/api/axios.js` (and used for cover images in the book post components):

```js
baseURL: "http://127.0.0.1:8000/api"
```

### Run

```bash
npm run serve
```

Open <http://localhost:8080>. Allow location access when registering so your city and country are filled in.

### Other scripts

| Script             | Description |
| ------------------ | ----------- |
| `npm run build`    | Production build |
| `npm run cssbuild` | Rebuild Tailwind CSS in watch mode |

## Related Repositories

- [bookmates-backend](https://github.com/SifeYassine/bookmates-backend): Laravel 11 + JWT API

## Author

**Sifeddine Yassine** · [@SifeYassine](https://github.com/SifeYassine)
