import React from "react";
import theme from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./Contexts/User/UserProvider";
import { Toaster } from "react-hot-toast";
import AuthGuard from "./Guard/AuthGuard";

/* Pages */
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Chat from "./Pages/Chat/Chat";
import Movies from "./Pages/Movies/Movies";
import Movie from "./Pages/Movie/Movie";
import Profile from "./Pages/Profile/Profile";
import CharacterSurvey from "./Pages/CharacterSurvey/CharacterSurvey";
import NotFound from "./Pages/NotFound/NotFound";
import Search from "./Pages/Search/Search";
import Notifications from "./Pages/Notifications/Notifications";
import Watchlist from "./Pages/Profile/Watchlist/Watchlist";

function App() {
  return (
    <React.Fragment>
      <Toaster />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route
                key="Home"
                path="/"
                element={
                  <AuthGuard component={<Home />} isHomeComponent={true} />
                }
              />
              <Route key="Login" path="/login" element={<Login />} />
              <Route key="Register" path="/register" element={<Register />} />
              <Route
                key="Profile"
                path="/profile/:username"
                element={<AuthGuard component={<Profile />} />}
              />
              <Route
                key="Profile"
                path="/profile/:username/watchlist"
                element={<AuthGuard component={<Watchlist />} />}
              />
              <Route
                key="CharacterSurvey"
                path="/character-survey"
                element={<AuthGuard component={<CharacterSurvey />} />}
              />
              <Route
                key="Chat"
                path="/chat"
                element={<AuthGuard component={<Chat />} />}
              />
              <Route
                key="Movies"
                path="/movies"
                element={<AuthGuard component={<Movies />} />}
              />
              <Route
                key="Movie"
                path="/movies/:movieId"
                element={<AuthGuard component={<Movie />} />}
              />
              <Route
                key="Notifications"
                path="/notifications"
                element={<AuthGuard component={<Notifications />} />}
              />
              <Route
                key="Search"
                path="/search"
                element={<AuthGuard component={<Search />} />}
              />
              <Route key="NotFound" path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
