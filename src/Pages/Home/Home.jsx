import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../Contexts/User/useUser";
import LandingPage from "./LandingPage";
import { getUser } from "../../Services/User";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  if (!user?._id) {
    return <LandingPage />;
  }

  return (
    <Box display={"flex"} gap={2}>
      <Typography variant="h6">You are logged in</Typography>
    </Box>
  );
};

export default Home;
