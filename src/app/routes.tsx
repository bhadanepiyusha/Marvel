import { createBrowserRouter } from "react-router";

import RootLayout from "./components/RootLayout";
import MovieRedirect from "./components/MovieRedirect";

import LandingPage from "./pages/LandingPage";
import TimelinePage from "./pages/TimelinePage";
import HeroesPage from "./pages/HeroesPage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import CharacterProfile from "./pages/CharacterProfile";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ComicsPage from "./pages/ComicsPage";
import ContactPage from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "timeline",
        Component: TimelinePage,
      },
      {
        path: "heroes",
        Component: HeroesPage,
      },
      {
        path: "movies",
        Component: MoviesPage,
      },
      {
        path: "comics",
        Component: ComicsPage,
      },
      {
  path: "contact",
  Component: ContactPage,
},
      {
        path: "movies/:id",
        Component: MovieRedirect,
      },
      {
        path: "movie/:id",
        Component: MovieDetailPage,
      },
      {
        path: "character/:id",
        Component: CharacterProfile,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
]);                                           