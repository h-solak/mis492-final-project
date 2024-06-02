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
import NotFound from "./Pages/NotFound/NotFound";
import Search from "./Pages/Search/Search";
import Notifications from "./Pages/Notifications/Notifications";
import Watchlist from "./Pages/Profile/Watchlist/Watchlist";
import WatchlistNavigator from "./Pages/WatchlistNavigator/WatchlistNavigator";
import Match from "./Pages/Match/Match";
import PersonalityTest from "./Pages/Match/Pages/PersonalityTest/PersonalityTest";
import Characters from "./Pages/Characters/Characters";
import YourType from "./Pages/YourType/YourType";
import Favorites from "./Pages/Profile/Favorites/Favorites";
import RecentActivity from "./Pages/Profile/RecentActivity/RecentActivity";
import Settings from "./Pages/Settings/Settings";
import FriendsActivity from "./Pages/FriendsActivity/FriendsActivity";
import RecentComments from "./Pages/Profile/RecentComments/RecentComments";
import MovieRecommendations from "./Pages/MovieRecommendations/MovieRecommendations";

function App() {
  //
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
                key="Favorites"
                path="/profile/:username/favorites"
                element={<AuthGuard component={<Favorites />} />}
              />
              <Route
                key="WatchlistNavigator"
                path="/watchlist"
                element={<AuthGuard component={<WatchlistNavigator />} />}
              />
              <Route
                key="RecentActivity"
                path="/profile/:username/recent-activity"
                element={<AuthGuard component={<RecentActivity />} />}
              />
              <Route
                key="RecentComments"
                path="/profile/:username/recent-comments"
                element={<AuthGuard component={<RecentComments />} />}
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
                key="Movie Recommendations"
                path="/movies/recommendations/:movieId"
                element={<AuthGuard component={<MovieRecommendations />} />}
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
              <Route
                key="Match"
                path="/match"
                element={<AuthGuard component={<Match />} />}
              />
              <Route
                key="PersonalityTest"
                path="/match/personality-test"
                element={<AuthGuard component={<PersonalityTest />} />}
              />
              <Route
                key="Characters"
                path="/characters"
                element={<AuthGuard component={<Characters />} />}
              />
              <Route
                key="Your Type"
                path="/your-type"
                element={<AuthGuard component={<YourType />} />}
              />
              <Route
                key="Friends Activity"
                path="/friends-activity"
                element={<AuthGuard component={<FriendsActivity />} />}
              />
              <Route
                key="Settings"
                path="/settings"
                element={<AuthGuard component={<Settings />} />}
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
