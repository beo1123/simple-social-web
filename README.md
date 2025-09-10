# Web Development Test

## Setup
1. Clone repo: `git clone <repo-url>`
2. Install: `npm install`
3. Run: `npm run dev`
4. Open: `http://localhost:3000`

## Features
- **Auth**: Sign up (`/signup`), login (`/login`), logout (via Header). Uses `localStorage` with bcrypt hashing for users and token (`auth_token`). Token also set in cookie for compatibility.
- **Search and Filter**: Search posts by title/body, sort by newest/oldest, filter by user (`userId`/`userName`) via Header/Sidebar. Managed by Redux (`searchSlice`) with client-side filtering.
- **Commenting**: View/add comments on `/posts/:id` (authenticated users only) in a Facebook-like UI. Supports nested comments (replies) with `parentId` stored in `localStorage`. Comments fetched from JSONPlaceholder (`/posts/{id}/comments`) and `localStorage` (`clientComments.ts`).
- **Like/Share**: Like comments (count stored in `localStorage`) and share via copying direct comment links (e.g., `/posts/1#comment-uuid`).
- **Pagination**: Lazy-loaded posts on home page (`/`) with "Load More" button in a Facebook-like feed. Uses SSR for initial page and `useInfiniteQuery` for lazy loading.

## Test
- Run: `npm test`
- Tests cover: Auth (signup/login/validateToken), API services (posts/comments), client-side comments (`clientComments`)

## Notes
- Responsive with Tailwind CSS (Facebook-like single-column feed).
- Uses Next.js Server Components for SSR (`app/page.tsx`), Client Components for interactivity (`PostDetail.tsx`, `PostCard.tsx`, `CommentForm.tsx`, `PostsList.tsx`, `Header.tsx`), TanStack Query for lazy loading (`usePosts`), Redux with `redux-persist` for auth and search state, Zod for form validation.
- Comments and likes stored in `localStorage` (`clientComments.ts`) due to JSONPlaceholder limitations.
- Authentication checked client-side in `PostDetail.tsx` using `localStorage` token.
- Search/filter/sort state persisted via Redux (`searchSlice`).
- Nested comments support unlimited depth with indentation (`ml-8`) for replies.

## Debugging
- **"Post not found"**:
  - Check Console for `fetchPostById error` or `Post not found for ID` in DevTools.
  - Verify `postId` is numeric (1–100). Invalid IDs (e.g., `/posts/999`) trigger errors.
  - Confirm `auth_token` in `localStorage` and `validateToken` passes.
  - Test JSONPlaceholder: `https://jsonplaceholder.typicode.com/posts/1`.
- **Search/Filter Issues**:
  - No results: Log `searchQuery`, `sortBy`, `filterByUser` in `usePosts`.
  - Incorrect sorting: Verify `timestamp` in posts.
  - User filter empty: Check user list derivation in `Header.tsx`.

## Testing New Features
- **Search and Filter**:
  - On `/`, search for "hello", verify matching posts (title/body).
  - Change sort to "Oldest First", verify order.
  - Filter by user (e.g., "User 1"), verify results.
- **Nested Comments**:
  - On `/posts/1`, add a comment, reply to it, verify indentation and `parentId` in `localStorage`.
- **Like/Share**:
  - Like a comment, verify count in UI and `localStorage`.
  - Share a comment, paste link (e.g., `/posts/1#comment-uuid`), confirm navigation.