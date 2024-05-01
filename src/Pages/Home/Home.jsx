import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import useUser from "../../Contexts/User/useUser";
import LandingPage from "./LandingPage";
import ColumnBox from "../../Components/ColumnBox";
import Layout from "../../Layout/Layout";
import ReleaseRadar from "./Components/ReleaseRadar";

const Home = () => {
  const { user } = useUser();

  if (!user?._id) {
    return <LandingPage />;
  }

  return (
    <Layout>
      <ReleaseRadar />
      <ul>
        <Typography fontSize={18} fontWeight={"bolder"}>
          TODO
        </Typography>
        <li>Profile - UI implementation</li>
        <li>Notifications</li>
        <li>Password: 8 karakter, büyük harf, özel karakter</li>
        <li>
          Match özelliği kullanıldığında yeni match direkt olarak arkadaşlara
          eklenecek, kullanıcı isterse veya eşleşmeyi reddederse kaldırılacak..
        </li>
        <li>!-- Message read status feature</li>
        <li>??? Movie rate bug</li>
        <li>Movie Watchlist feature</li>
        <li>Like & Comment on reviews feature</li>
        <li>Ortak arkadaşlar</li>
        <li>https://api.themoviedb.org/3/movie/now_playing</li>
      </ul>
    </Layout>
  );
};

export default Home;
