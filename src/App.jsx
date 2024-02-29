import React, { useEffect } from "react";
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

function App() {
  /*
    Film izleme sıklığı
    Beğenilen film türleri

    ...
    bir puan oluşturacak mesela 7den büyük bi puansa eşleşmeye okey verecek sistem...
  
  */

  // useEffect(() => {
  //   getBla();
  // }, []);

  // const getBla = async () => {
  //   await searchMovie("before sun");
  // };

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
                element={<AuthGuard component={<Home />} />}
              />
              <Route key="Login" path="/login" element={<Login />} />
              <Route key="Register" path="/register" element={<Register />} />
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
                key="NotFound"
                path="*"
                element={<div> PAGE NOT FOUND</div>}
              />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
