import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import { Movie, People, LiveTv, ChairAlt } from "@mui/icons-material";
import UserSearch from "./Components/UserSearch/UserSearch";
import MultiSearch from "./Components/MultiSearch/MultiSearch";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchMode, setSearchMode] = useState("multi");
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // setSearchParams((prevParams) => ({ ...prevParams, type: searchMode }));
    if (searchParams.get("type")) {
      setSearchMode(searchParams.get("type"));
    }
  }, []);

  return (
    <Layout>
      <Grid item xs={12} display={"flex"} alignItems={"center"} gap={2}>
        {searchMode == "users" ? (
          <People
            sx={{
              fontSize: 36,
            }}
          />
        ) : (
          <LiveTv
            sx={{
              fontSize: 36,
            }}
          />
        )}
        <Button
          variant={searchMode == "multi" ? "contained" : "outlined"}
          onClick={() => setSearchMode("multi")}
          sx={{
            borderRadius: 32,
          }}
        >
          Movies / Tv Shows / Directors
        </Button>
        <Button
          variant={searchMode == "users" ? "contained" : "outlined"}
          onClick={() => setSearchMode("users")}
          sx={{
            borderRadius: 32,
          }}
        >
          Users
        </Button>
      </Grid>
      {searchMode == "users" ? (
        <UserSearch
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setSearchMode={setSearchMode}
        />
      ) : (
        <MultiSearch
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setSearchMode={setSearchMode}
        />
      )}
    </Layout>
  );
};

export default Search;
