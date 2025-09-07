# Web Development Test

## Setup
1. Clone repo: `git clone <repo-url>`
2. Install: `npm install`
3. Run: `npm run dev`
4. Open: `http://localhost:3000`

## Features
- **Auth**: Sign up (`/signup`), login (`/login`), logout (via Header). Uses localStorage with bcrypt hashing.
- **Commenting**: View/add comments on `/posts/:id` (authenticated users only). Uses JSONPlaceholder API and `usePost` hook.
- **Pagination**: Lazy-loaded posts list on home page (`/`) with "Load More" button. Uses `usePosts` hook with `useInfiniteQuery`.

## Test
- Run: `npm test`
- Tests cover: Auth (signup/login), API services (posts/comments), `usePost` and `usePosts` hooks.

## Notes
- Responsive with Tailwind CSS (grid layout for posts).
- Uses TanStack Query for data fetching (`usePost`, `usePosts`), Redux for auth, Zod for form validation.