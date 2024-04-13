import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Movie, People, LiveTv, ChairAlt } from "@mui/icons-material";
import UserSearch from "./Components/UserSearch/UserSearch";

const Search = () => {
  const [searchMode, setSearchMode] = useState("users");
  return (
    <Layout>
      <Grid item xs={12} display={"flex"} alignItems={"center"} gap={2}>
        {searchMode == "users" ? (
          <People />
        ) : searchMode == "movies" ? (
          <LiveTv />
        ) : (
          <ChairAlt />
        )}
        <Button
          variant={searchMode == "users" ? "contained" : "outlined"}
          onClick={() => setSearchMode("users")}
        >
          Users
        </Button>
        <Button
          variant={searchMode == "movies" ? "contained" : "outlined"}
          onClick={() => setSearchMode("movies")}
        >
          Movies
        </Button>
        <Button
          variant={searchMode == "directors" ? "contained" : "outlined"}
          onClick={() => setSearchMode("directors")}
        >
          Directors
        </Button>
      </Grid>
      {searchMode == "users" ? <UserSearch /> : null}
    </Layout>
  );
};

export default Search;
