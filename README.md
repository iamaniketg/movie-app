# 🎬 MovieSearch — Discover Your Favorite Films

A beginner-friendly **Movie Search App** built with React. Search for movies by title, browse featured categories, view detailed movie info, and save your favorites — all powered by the [OMDb API](https://www.omdbapi.com/).

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/Material_UI-6.4-007FFF?logo=mui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.5-764ABC?logo=redux&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-2.1-6E9F18?logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the App](#-running-the-app)
- [Running Tests](#-running-tests)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deploying to Vercel](#-deploying-to-vercel)
- [Pages Overview](#-pages-overview)
- [Key Concepts Covered](#-key-concepts-covered)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔍 **Search movies** by title with real-time results
- 🎥 **Featured categories** on the home page (Superhero, Sci-Fi, Batman, etc.)
- 📄 **Movie detail page** with poster, rating, plot, genres, cast & more
- ❤️ **Favorites** — save movies and persist them across sessions (localStorage)
- 📱 **Responsive design** — works on desktop, tablet, and mobile
- ⚡ **Lazy-loaded routes** for better performance
- 🌙 **Premium dark theme** with glassmorphic navbar and smooth animations
- 🧪 **33 unit tests** covering all core components
- 🔄 **Loading, error, and empty states** handled gracefully
- 📄 **404 page** for invalid routes

---

## 🛠 Tech Stack

### Core

| Tool / Library | Version | Purpose |
|----------------|---------|---------|
| [React](https://react.dev/) | 18.3 | UI library for building component-based interfaces |
| [React DOM](https://react.dev/) | 18.3 | Renders React components to the browser DOM |
| [Vite](https://vitejs.dev/) | 6.0 | Fast build tool and dev server with HMR (Hot Module Replacement) |

### Routing

| Tool / Library | Version | Purpose |
|----------------|---------|---------|
| [React Router DOM](https://reactrouter.com/) | 6.28 | Client-side routing for navigating between pages (SPA) |

### Styling

| Tool / Library | Version | Purpose |
|----------------|---------|---------|
| [Material UI (MUI)](https://mui.com/) | 6.4 | Pre-built React UI components (buttons, cards, grids, etc.) |
| [MUI Icons](https://mui.com/material-ui/material-icons/) | 6.4 | Icon library with 2,100+ Material Design icons |
| [Emotion (React)](https://emotion.sh/) | 11.14 | CSS-in-JS engine — required by MUI for styling |
| [Emotion (Styled)](https://emotion.sh/) | 11.14 | Styled-components API for Emotion |
| [Fontsource Roboto](https://fontsource.org/fonts/roboto) | 5.1 | Self-hosted Roboto font (the default Material Design typeface) |

### State Management

| Tool / Library | Version | Purpose |
|----------------|---------|---------|
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2.5 | Simplified Redux for global state (favorites, watchlist) |
| [React Redux](https://react-redux.js.org/) | 9.2 | Official React bindings for Redux (`useSelector`, `useDispatch`) |

### API / HTTP

| Tool / Library | Version | Purpose |
|----------------|---------|---------|
| [Axios](https://axios-http.com/) | 1.7 | Promise-based HTTP client for making API requests to OMDb |

### Testing

| Tool / Library | Version | Purpose |
|----------------|---------|---------|
| [Vitest](https://vitest.dev/) | 2.1 | Unit testing framework (Vite-native, Jest-compatible) |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | 16.1 | Tests React components by simulating user interactions |
| [Jest DOM](https://github.com/testing-library/jest-dom) | 6.6 | Custom matchers for DOM assertions (`toBeInTheDocument`, etc.) |
| [User Event](https://testing-library.com/docs/user-event/intro/) | 14.5 | Simulates real user events (typing, clicking) in tests |
| [jsdom](https://github.com/jsdom/jsdom) | 25.0 | Headless browser environment for running tests without a real browser |

### API

| Service | Purpose |
|---------|---------|
| [OMDb API](https://www.omdbapi.com/) | Movie data source — search, details, ratings, posters |

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your machine:

### 1. Node.js (v18 or higher)

Node.js is the JavaScript runtime that lets you run JavaScript outside the browser.

**Download:** https://nodejs.org/

```bash
# Check if Node.js is installed
node --version
# Should show v18.x.x or higher

# npm comes bundled with Node.js
npm --version
# Should show 9.x.x or higher
```

> 💡 **Tip:** Download the **LTS (Long Term Support)** version for stability.

### 2. Git (optional, for cloning)

```bash
# Check if Git is installed
git --version
```

**Download:** https://git-scm.com/downloads

### 3. OMDb API Key

You need a free API key from OMDb to fetch movie data.

1. Go to https://www.omdbapi.com/apikey.aspx
2. Select **FREE** tier (1,000 daily requests)
3. Enter your email and submit
4. Check your email for the API key

---

## 🚀 Installation & Setup

Follow these steps to get the project running on your local machine:

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
```

Or, if you already have the project folder, navigate into it:

```bash
cd movie-search-app
```

### Step 2: Install dependencies

```bash
npm install
```

This installs all the packages listed in `package.json` — React, MUI, Redux, Axios, Vitest, etc.

### Step 3: Set up environment variables

Create a `.env` file in the project root (if it doesn't already exist):

```bash
# .env
VITE_OMDB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OMDb API key.

> ⚠️ **Important:** The `VITE_` prefix is required for Vite to expose the variable to your frontend code. Never commit API keys to public repositories.

### Step 4: Verify the setup

```bash
npm run dev
```

If the app opens at `http://localhost:5173/` and shows movie posters — you're all set! 🎉

---

## ▶️ Running the App

### Development Server

```bash
npm run dev
```

Opens the app at **http://localhost:5173/** with hot module replacement (changes appear instantly).

### Production Build

```bash
npm run build
```

Creates an optimized production bundle in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

---

## 🧪 Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npx vitest

# Run with verbose output
npx vitest run --reporter=verbose
```

### Test Coverage

| Test Suite | Tests | What's Tested |
|------------|-------|---------------|
| `SearchBar.test.jsx` | 6 | Input rendering, typing, form submit, empty guard, initial query |
| `MovieCard.test.jsx` | 7 | Title, year, poster, fallback, detail link, favorite toggle |
| `LoadingSpinner.test.jsx` | 3 | Default/custom message, progress indicator |
| `ErrorMessage.test.jsx` | 6 | Default/custom message, retry button render + click |
| `EmptyState.test.jsx` | 4 | Default/custom title, subtitle rendering |
| `NotFoundPage.test.jsx` | 3 | 404 text, message, home link |
| `FavoritesPage.test.jsx` | 4 | Title, empty state, favorites list, clear button |
| **Total** | **33** | ✅ All passing |

---

## 📁 Project Structure

```
movie-search-app/
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite + Vitest configuration
├── .env                        # Environment variables (API key)
├── .gitignore                  # Files excluded from Git
│
└── src/
    ├── main.jsx                # App entry — React root with providers
    ├── App.jsx                 # Route definitions and layout
    │
    ├── components/             # Reusable UI components
    │   ├── Navbar.jsx          # Top navigation bar with search + favorites
    │   ├── SearchBar.jsx       # Search input with submit button
    │   ├── MovieCard.jsx       # Movie poster card with favorite toggle
    │   ├── MovieGrid.jsx       # Responsive grid of MovieCards
    │   ├── LoadingSpinner.jsx  # Loading indicator with message
    │   ├── ErrorMessage.jsx    # Error display with retry button
    │   └── EmptyState.jsx      # "No results" placeholder
    │
    ├── pages/                  # Route-level page components
    │   ├── HomePage.jsx        # Hero section + featured movie categories
    │   ├── SearchResultsPage.jsx  # Search results with pagination
    │   ├── MovieDetailPage.jsx # Full movie info (plot, cast, rating)
    │   ├── FavoritesPage.jsx   # Saved favorites list
    │   └── NotFoundPage.jsx    # 404 error page
    │
    ├── services/               # API integration layer
    │   └── omdbApi.js          # OMDb API calls (search, details, featured)
    │
    ├── store/                  # Redux state management
    │   ├── store.js            # Redux store + localStorage middleware
    │   └── favoritesSlice.js   # Favorites slice (actions + selectors)
    │
    ├── hooks/                  # Custom React hooks
    │   └── useDebounce.js      # Debounce hook for search input
    │
    ├── theme/                  # MUI theme configuration
    │   └── theme.js            # Dark theme with custom palette
    │
    ├── utils/                  # Shared constants and helpers
    │   └── constants.js        # API URL, fallback poster, categories
    │
    └── tests/                  # Unit tests
        ├── setup.js            # Vitest setup (jest-dom matchers)
        ├── testUtils.jsx       # Custom render with all providers
        ├── SearchBar.test.jsx
        ├── MovieCard.test.jsx
        ├── LoadingSpinner.test.jsx
        ├── ErrorMessage.test.jsx
        ├── EmptyState.test.jsx
        ├── NotFoundPage.test.jsx
        └── FavoritesPage.test.jsx
```

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_OMDB_API_KEY` | Your OMDb API key | `18128c7e` |

Create a `.env` file in the project root:

```env
VITE_OMDB_API_KEY=18128c7e
```

> **Note:** In Vite, only variables prefixed with `VITE_` are exposed to the client-side code. They are accessed via `import.meta.env.VITE_OMDB_API_KEY`.

---

## 🌐 Deploying to Vercel

[Vercel](https://vercel.com/) is a cloud platform that makes deploying frontend apps simple — with zero configuration for Vite projects.

### Option A: Deploy via Vercel Dashboard (Recommended for beginners)

#### Step 1: Push your code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit — Movie Search App"

# Create a repo on GitHub, then push
git remote add origin https://github.com/your-username/movie-search-app.git
git branch -M main
git push -u origin main
```

#### Step 2: Sign up on Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Click **"Sign Up"**
3. Sign in with your **GitHub** account

#### Step 3: Import your repository

1. In the Vercel dashboard, click **"Add New..."** → **"Project"**
2. Select your **movie-search-app** repository from the list
3. Vercel will auto-detect that this is a **Vite** project

#### Step 4: Configure environment variables

Before deploying, add your API key:

1. In the project settings, expand **"Environment Variables"**
2. Add:
   - **Name:** `VITE_OMDB_API_KEY`
   - **Value:** `your_api_key_here`
3. Click **"Add"**

#### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will build your app and give you a live URL like:
   ```
   https://movie-search-app-abc123.vercel.app
   ```
3. Your app is now live! 🎉

#### Step 6: Configure SPA routing (Important!)

To prevent 404 errors on page refresh with React Router:

1. Create a `vercel.json` file in the project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

2. Commit and push — Vercel will auto-redeploy:

```bash
git add vercel.json
git commit -m "Add SPA routing config for Vercel"
git push
```

---

### Option B: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI globally

```bash
npm install -g vercel
```

#### Step 2: Log in to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with your account.

#### Step 3: Deploy

From the project root:

```bash
vercel
```

Answer the prompts:
- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → `N`
- **Project name?** → `movie-search-app` (or your choice)
- **Directory?** → `./`
- **Override settings?** → `N`

#### Step 4: Set environment variables

```bash
vercel env add VITE_OMDB_API_KEY
```

Enter your API key when prompted. Then redeploy:

```bash
vercel --prod
```

#### Step 5: Add SPA routing config

Create `vercel.json` in the project root (same as Option A, Step 6).

---

### ✅ Post-Deployment Checklist

- [ ] App loads at the Vercel URL
- [ ] Home page shows featured movie categories
- [ ] Search returns results
- [ ] Movie detail page loads correctly
- [ ] Favorites can be added and persist across page refreshes
- [ ] Navigating to an invalid URL shows the 404 page
- [ ] Refreshing any page (e.g., `/search?q=batman`) does NOT show a Vercel 404

---

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section with search bar + 6 featured movie categories |
| Search Results | `/search?q=batman` | Grid of movie results with pagination |
| Movie Detail | `/movie/tt1375666` | Full movie info — poster, plot, rating, cast |
| Favorites | `/favorites` | Saved movies (persisted in localStorage) |
| 404 | `/*` | Fallback for invalid routes |

---

## 📚 Key Concepts Covered

This project is designed to teach real-world React skills:

- ✅ **Component architecture** — small, reusable components
- ✅ **React Router** — client-side navigation with dynamic routes
- ✅ **API integration** — fetching data with Axios + OMDb API
- ✅ **State management** — local state (`useState`) + global state (Redux Toolkit)
- ✅ **Material UI** — pre-built components with custom theming
- ✅ **Environment variables** — secure API key management
- ✅ **Performance** — lazy loading with `React.lazy()` + `Suspense`
- ✅ **Testing** — user-centric tests with React Testing Library
- ✅ **Error handling** — loading, error, and empty states
- ✅ **Deployment** — CI/CD with Vercel

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using React, Material UI, and the OMDb API
</p>
