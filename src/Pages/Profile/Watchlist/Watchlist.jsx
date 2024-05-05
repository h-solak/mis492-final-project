import React from "react";
import Layout from "../../../Layout/Layout";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import { Grid, Typography } from "@mui/material";
import useUser from "../../../Contexts/User/useUser";

const Watchlist = () => {
  const { user } = useUser();
  const { username } = useParams();
  return (
    <Layout>
      <Breadcrumbs
        links={[
          {
            title: `${username}`,
            url: `/profile/${username}`,
          },
          {
            title: `Watchlist`,
            url: `/profile/${username}/watchlist`,
          },
        ]}
      />

      <Grid container>
        <Grid item>
          <Typography fontWeight={"bold"}>
            {username != user?.username
              ? "Your watchlist"
              : `${username}'s Watchlist`}
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Watchlist;
