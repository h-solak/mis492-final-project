import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

//not logged in users will see this
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {" "}
      WELCOMEEEEEEEEEEEEEEEEE - YOU ARE NOT LOGGED IN
      <Button variant="contained" onClick={() => navigate("/login")}>
        login
      </Button>
      <Button variant="contained" onClick={() => navigate("/register")}>
        register
      </Button>
    </Layout>
  );
};

export default LandingPage;
