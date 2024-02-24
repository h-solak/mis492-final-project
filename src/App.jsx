import React, { useEffect } from "react";
import theme from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./Contexts/User/UserProvider";
import useUser from "./Contexts/User/useUser";
/* Pages */
import Home from "./Pages/Home/Home";
import Layout from "./Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Toaster } from "react-hot-toast";
import AuthGuard from "./Guard/AuthGuard";

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
            <Layout>
              <Routes>
                <Route
                  key="Home"
                  path="/"
                  element={<AuthGuard component={<Home />} />}
                />
                <Route key="Login" path="/login" element={<Login />} />
                <Route key="Login" path="/register" element={<Register />} />
                <Route
                  key="NotFound"
                  path="*"
                  element={<div> PAGE NOT FOUND</div>}
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
