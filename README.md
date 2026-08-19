This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Movix

A modern movie and TV-show discovery application built with Next.js, React, TypeScript, and the TMDB API.

Movix allows users to discover movies and TV shows, browse by genre, view detailed information, explore episodes, watch trailers, and maintain a persistent personal watchlist.

## Tech Stack

- Next.js
- React
- TypeScript
- Next.js App Router
- Redux Toolkit
- Redux Persist
- Tailwind CSS
- next-intl
- TMDB API
- Docker


# Architecture

## Overview

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
| Embla Carousel | Hero and content carousels |
| Docker | Containerized production deployment |