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
      <ColumnBox gap={2}>
        <Typography variant="h6">
          Welcome, {user?.username || "User"}!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/chat")}
          size="small"
        >
          Go to Chat Page
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/movies")}
          size="small"
        >
          Go to Movies Page
        </Button>
      </ColumnBox>
      <ul>
        TODO
        <li>Form oluşturup sonuçlarını google spreadsheete yolla</li>
        <li>Movies page PAGINATION</li>
        <li>Movie review'a optional YAZI ekle</li>
        <li>Mesaj görüldü özelliği???</li>
        <li>Movie Watchlist feature</li>
        <li>Post paylaşma, likelama, keşfet özelliği</li>
        <li>Friends feature: TWO TYPES: MATCHED (yanında) / NORMAL FRIENDS</li>
        <li>Ortak arkadaşlar</li>
        <li>https://api.themoviedb.org/3/movie/now_playing</li>
      </ul>
    </Layout>
  );
};

export default Home;
