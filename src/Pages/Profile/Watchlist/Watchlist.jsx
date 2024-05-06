import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import useUser from "../../../Contexts/User/useUser";
import { getProfileUser } from "../../../Services/User";
import { CloseRounded, SearchRounded } from "@mui/icons-material";

const Watchlist = () => {
  const { user } = useUser();
  const { username } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({
    _id: "",
    username: "",
    rates: [],
  });

  useEffect(() => {
    //Call this function everytime username param changes, empty brackets cause problems when user jumps on another user's profile
    handleGetProfileUser();
  }, [username]);

  const handleGetProfileUser = async () => {
    setPageLoading(true);
    const crrUser = await getProfileUser(username);
    setProfileUser(crrUser);
    setPageLoading(false);
  };
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
        <Grid item xs={12} sm={12} md={12} px={4}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={"bold"} fontSize={20}>
              {username != user?.username
                ? "Your watchlist"
                : `${username}'s Watchlist`}
            </Typography>
            <TextField
              size="small"
              // ref={searchInputRef}
              placeholder="Search a movie"
              InputProps={{
                endAdornment: !"watch(`searchMovies`)" ? (
                  <IconButton
                    onClick={() => {
                      setValue("searchMovies", "");
                      setSearchParams({});
                    }}
                    sx={{
                      mr: -1,
                    }}
                  >
                    <CloseRounded
                      color="disabled"
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                ) : (
                  <SearchRounded color="disabled" />
                ),
              }}
              fullWidth
              // {...register("searchMovies", {
              //   required: true,
              //   minLength: 3,
              //   maxLength: 20,
              // })}
              sx={{
                flex: 1 / 2,
                "& .MuiInputBase-root": {
                  // Overriding the input base class to ensure border radius
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Watchlist;
