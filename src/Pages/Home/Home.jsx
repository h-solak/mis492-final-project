import { Button, Grid, Typography } from "@mui/material";
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
    </Layout>
  );
};

export default Home;

{
  /* <Grid item xs={12}>
  <Typography variant="h6" fontWeight={"bold"} fontSize={32}>
    Welcome, {user?.username || "User"}!
  </Typography>
  <ul>
    <Typography fontSize={18} fontWeight={"bolder"}>
      TODO
    </Typography>
    <li>Mesaj görüldü özelliği???</li>
    <li>Movie rate bug</li>
    <li>Movie Watchlist feature</li>
    <li>Post paylaşma, likelama, keşfet özelliği</li>
    <li>Friends feature: TWO TYPES: MATCHED (yanında) / NORMAL FRIENDS</li>
    <li>Ortak arkadaşlar</li>
    <li>https://api.themoviedb.org/3/movie/now_playing</li>
  </ul>
</Grid>; */
}
