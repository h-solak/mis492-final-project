import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../Contexts/User/useUser";
import LandingPage from "./LandingPage";
import ColumnBox from "../../Components/ColumnBox";
import Layout from "../../Layout/Layout";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  if (!user?._id) {
    return <LandingPage />;
  }

  return (
    <Layout>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={600} fontSize={32}>
          Welcome, {user?.username || "User"}!
        </Typography>
        <ul>
          <Typography fontSize={18} fontWeight={700}>
            TODO
          </Typography>
          <li>Movie Reviews ekle movie kısmında alta</li>
          <li>Movies page PAGINATION</li>
          <li>Mesaj görüldü özelliği???</li>
          <li>Movie Watchlist feature</li>
          <li>Post paylaşma, likelama, keşfet özelliği</li>
          <li>
            Friends feature: TWO TYPES: MATCHED (yanında) / NORMAL FRIENDS
          </li>
          <li>Ortak arkadaşlar</li>
          <li>https://api.themoviedb.org/3/movie/now_playing</li>
        </ul>
      </Grid>
    </Layout>
  );
};

export default Home;
