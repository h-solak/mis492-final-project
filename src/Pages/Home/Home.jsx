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
        <li>Socket ile chat mesajı anlık güncelleme</li>
        <li>Mesaj görüldü özelliği???</li>
        <li>Post paylaşma, likelama, keşfet özelliği</li>
      </ul>
    </Layout>
  );
};

export default Home;
