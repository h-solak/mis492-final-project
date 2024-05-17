import React from "react";
import Layout from "../../Layout/Layout";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

const Match = () => {
  return (
    <Layout>
      <Breadcrumbs
        links={[
          {
            title: `Match`,
            url: `/match`,
          },
        ]}
      />
      <Grid container>
        <Link to={"/match/personality-test"}>
          <Button>Go to Personality Test Page</Button>
        </Link>
      </Grid>
    </Layout>
  );
};

export default Match;
