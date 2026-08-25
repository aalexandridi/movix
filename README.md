## Table of Contents

<!-- * [Getting Started](#getting-started) -->
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Environment Variables](#environment-variables)
  * [Getting a TMDB API Key and API Read Access Token](#getting-a-tmdb-api-key-and-api-read-access-token)
  * [Running Locally](#running-locally)
  * [Running with Docker](#running-with-docker)

* [Learn More](#learn-more)
* [Deploy on Vercel](#deploy-on-vercel)
* [Movix](#movix)
* [Technology Stack](#technology-stack)
* [Architecture](#architecture)

  * [Overview](#overview)
  * [Data Fetching Architecture](#data-fetching-architecture)
  * [Caching and Revalidation](#caching-and-revalidation)
  * [Server and Client Components](#server-and-client-components)

    * [Server Components](#server-components)
    * [Client Components](#client-components)
  * [Route Handlers](#route-handlers)
  * [State Management](#state-management)
  * [Persistent Watchlist](#persistent-watchlist)
  * [Internationalization](#internationalization)


## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) 22.x
- npm, Yarn, pnpm, or Bun
- A [TMDB](https://www.themoviedb.org/) account and API key

### Environment Variables

Movix uses the [TMDB API](https://developer.themoviedb.org/docs) to retrieve movie, TV show, and other media information.

Create a `.env.local` file in the root of the project:

```bash
cp .env.example .env.local
```

### Getting a TMDB API Key and API Read Access Token

1. Create an account on [TMDB](https://www.themoviedb.org/).
2. Sign in and go to **Settings → API**.
3. Click **Create** to request API access.
4. Select **Developer** when asked for the type of application.
5. Complete the required application information.
6. After approval, TMDB provides:

   * **API Key (v3 auth)**
   * **API Read Access Token (v4 auth)**

Add them to your `.env.local` file:

```env
TMDB_API_TOKEN=your_tmdb_api_read_access_token
```

### Running Locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Or, if you use another package manager:

```bash
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser.

The application uses the Next.js App Router and automatically reloads when you make changes to the source code.

### Running with Docker

The project also includes a multi-stage `Dockerfile` for running Movix as a production container.


Build and Run the container:

```bash
docker compose up --build
```

Then open http://localhost:3000.




## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Movix

A modern movie and TV-show discovery application built with Next.js, React, TypeScript, and the TMDB API.

Movix allows users to discover movies and TV shows, browse by genre, view detailed information, explore episodes, watch trailers, and maintain a persistent personal watchlist.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework, routing, rendering and server-side functionality |
| React | UI and component architecture |
| Next.js App Router | File-based routing, Server Components and layouts |
| TypeScript | Static typing |
| Tailwind CSS | Utility-based styling |
| Redux Toolkit | Client-side application state |
| Redux Persist | Persistent client-side watchlist |
| TMDB API | Movie, TV, episode, search and image data |
| next-intl | Internationalization |
| Docker | Containerized production deployment |


## Architecture

### Overview

Movix is built with Next.js App Router and follows a server-first architecture. The application separates data fetching, presentation, client-side state, and external API communication.

The main architectural goals are:

- Keep TMDB credentials on the server.
- Fetch data server-side whenever possible.
- Cache relatively stable TMDB responses using Next.js revalidation.
- Use Route Handlers as an API boundary for client-side components that need TMDB data.
- Keep UI components primarily focused on presentation.
- Use Redux Toolkit only for client-side application state.
- Persist the user's watchlist locally across page refreshes.
- Support internationalization through next-intl.
- Keep movie and TV-show functionality organized into reusable services and components.


A simplified data flow looks like this:
![Logo](/public/movix_architecture.svg)


### Data Fetching Architecture

The application uses a dedicated TMDB client rather than calling TMDB directly from individual components.

For example:

`src/services/tmdb/client.ts`
```ts
export function createTmdbClient(locale: string) {
  const language = localeMap[locale] ?? localeMap[defaultLocale];

  async function fetcher(
    path: string,
    revalidate = 3600,
    queries = "",
    id = "",
  ) {
    const res = await fetch(
      `${baseUrl}${path}${id}?language=${language}${queries}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        next: { revalidate },
      },
    );

    if (!res.ok) {
      throw new Error("TMDB request failed");
    }

    return res.json();
  }

  return {
    fetch: fetcher,
  };
}
```

This creates a single abstraction over TMDB requests. Higher-level services are then built on top of this client.

```
src/services/tmdb/
├── client.ts       # low-level fetch wrapper (shown above)
├── movies.ts        # movie details, trending, recommendations
├── tvShows.ts        # TV show details, seasons
├── search.ts         # multi-search (movies, TV, people)
├── images.ts          # image URL helpers
└── episodes.ts         # episode-level data
```

### Caching and Revalidation

One of the important performance decisions is the use of Next.js fetch revalidation:

```ts
fetch(url, {
  next: {
    revalidate: 3600,
  },
});
```

This means data doesn't necessarily require a new request to TMDB every time a page is rendered.

For example:

```
First request → Next.js → TMDB API → Cached response
```

Subsequent requests can use the cached response until the revalidation period expires. Different types of data can therefore use different revalidation periods.

For example:

| Data                  | Suggested revalidation |
| --------------------- | ----------------------: |
| Popular movies        |                  1 hour |
| Popular TV shows      |                  1 hour |
| Movie details         |                  1 hour |
| TV details            |                  1 hour |
| Images                |           Several hours |
| Search results        |       Shorter / dynamic |
| Episode information   |                  1 hour |
| Static configuration  |                   Longer |

### Server and Client Components

The application uses Next.js Server Components by default and introduces Client Components only when browser-side interactivity is required.

#### Server Components

Used for things such as:

- TMDB data fetching
- Hero data preparation
- Movie/TV detail pages
- Image retrieval
- Server-side translations
- Route-level data loading

For example:

```
Page
├── fetch TMDB data
├── prepare HeroData
├── render presentation component
```

This keeps data-fetching logic outside the UI.

#### Client Components

Used when the component needs:

- useState
- useEffect
- Redux
- browser APIs
- event handlers
- interactive UI
- carousel interactions
- URL/search parameter manipulation

Examples include:

- Watchlist buttons
- Carousels
- Genre filters
- Tabs
- Language switcher
- Episode detail panels

This follows a server-first / client-when-needed approach.

### Route Handlers

Because TMDB credentials are private, client-side components should not directly communicate with TMDB using the private API credentials.

Instead:
```
Client Component → Route Handler → TMDB Service → TMDB API
```

This provides a server-side boundary between the browser and the external API.

> **Security benefit**
>
> The browser never receives:
>
> ```text
> TMDB_API_TOKEN
> ```

These remain server-side environment variables. This is especially important because the repository is intended to be publicly available to recruiters.

### State Management

Redux Toolkit is intentionally **not used for server data**. TMDB data is fetched through Next.js/server-side mechanisms. Redux is used for **client application state**. Currently, this includes:

```text
Redux
├── watchlist
└── episodeDetailsPanel
```

This separation is important:

```text
TMDB data
    → Server / cache

UI / application state
    → Redux
```

This avoids putting all remote API data into a global Redux store unnecessarily.

### Persistent Watchlist

The watchlist uses:

**Redux Toolkit + Redux Persist + localStorage**

The flow is:

```text
User clicks "Add to My List"
        │
        ▼
   Redux action
        │
        ▼
  Redux watchlist
        │
        ▼
  Redux Persist
        │
        ▼
   localStorage
```

When the application loads:

```text
localStorage
     │
     ▼
Redux Persist
     │
     ▼
Redux store rehydration
     │
     ▼
Watchlist restored
```

This allows the watchlist to survive:

* Page refreshes
* Navigation
* Browser restarts

without requiring a backend account system.

> **Important**
>
> This is **device/browser-local persistence**, not account synchronization. The watchlist is stored locally in the user's browser and is not synced across devices or accounts.

### Internationalization

The application uses `next-intl` and supports:

* English
* Greek

The locale is also passed into the TMDB client so that TMDB responses can be requested in the appropriate language.

```text
User locale
    │
    ├── next-intl
    │
    └── TMDB language parameter
```

This means localization isn't limited to static UI strings; TMDB content can also be requested according to the selected locale.



## Performance & Quality

I used Lighthouse to audit Movix across mobile and desktop and iteratively optimized the application based on the results.

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | **94** | **100** |
| Best Practices | **100** | **100** |
| SEO | **92** | **92** |
| Accessibility | **78** | **78** |

### Performance Optimizations

- **Optimized TMDB image delivery** by replacing `original` image requests with resolution-specific assets based on the rendered use case, including `w1920` for hero backdrops and `w500` for logos and posters.
- **Optimized LCP image loading** by prioritizing only the first hero carousel slide, while allowing subsequent slides to load lazily.
- **Implemented progressive page rendering with React Suspense and streaming**, allowing independent homepage sections to fetch and render concurrently instead of blocking the initial page render on unrelated API responses.
- **Added lightweight skeleton loading states** to provide visual feedback while streamed sections are loading.
- **Deployed to Vercel** and monitored production performance using Vercel Speed Insights.
- Avoided initializing interactive carousels while content is still loading.


> Lighthouse represents a controlled lab environment, while Vercel Speed Insights reports real-world performance from actual users and devices. Production metrics can therefore differ from Lighthouse results.