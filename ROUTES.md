# MCU Dashboard - Routes Reference

## Available Routes

All routes are configured in `/src/app/routes.tsx` using `react-router` (v7.13.0)

### Main Application Routes (with RootLayout)

- `/` - Landing Page (Home)
- `/timeline` - Timeline Page (Phase-based MCU timeline)
- `/heroes` - Heroes Page (Team-based hero sections)
- `/movies` - Movies Database Page (Browse all movies)
- `/movie/:id` - Movie Detail Page (Individual movie details)
- `/movies/:id` - Legacy route that redirects to `/movie/:id` (for backward compatibility)
- `/character/:id` - Character Profile Page (Individual hero details)

### Authentication Routes (without RootLayout)

- `/login` - Login Page
- `/signup` - Sign Up Page

## Important Notes

### Route Naming Convention
- Movie details use `/movie/:id` (singular) as the primary route
- Legacy route `/movies/:id` (plural) automatically redirects to `/movie/:id`
- Character profiles use `/character/:id` (singular)

### Navigation Examples

#### TypeScript/React Router
```tsx
import { useNavigate } from "react-router";

const navigate = useNavigate();

// Navigate to movie detail
navigate("/movie/22");  // ✅ Correct (primary route)
navigate("/movies/22"); // ✅ Also works (redirects to /movie/22)

// Navigate to character profile
navigate("/character/1");  // ✅ Correct
```

#### Link Components
```tsx
<Link to="/movie/22">View Movie</Link>           // ✅ Correct (primary)
<Link to="/movies/22">View Movie</Link>          // ✅ Works (redirects)
<Link to="/character/1">View Character</Link>    // ✅ Correct
```

## Package Information

- **Router Package**: `react-router` v7.13.0
- **DO NOT USE**: `react-router-dom` (not compatible with this environment)
- All imports should be: `import { ... } from "react-router"`

## Recent Fixes

### ✅ Route Compatibility Fix (Latest)
Added a redirect route from `/movies/:id` to `/movie/:id` to handle any legacy links or cached references. This ensures users won't encounter 404 errors when accessing movie details through either URL pattern.

## Current Status

✅ All routes correctly configured
✅ All navigation calls using correct paths
✅ Using `react-router` (not react-router-dom)
✅ Legacy `/movies/:id` route added for backward compatibility
✅ No 404 errors