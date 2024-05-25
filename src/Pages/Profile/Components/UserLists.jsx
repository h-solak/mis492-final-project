import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ProfileUserContext } from "../Profile";
import RateItem from "./RateItem";
import MovieItem from "../../../Components/Movie/MovieItem";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ColumnBox from "../../../Components/ColumnBox";
import { Rating } from "react-simple-star-rating";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkAdd, Favorite } from "@mui/icons-material";
import useUser from "../../../Contexts/User/useUser";

const UserLists = ({ rate }) => {
  const { user } = useUser();
  const { profileUser } = useContext(ProfileUserContext);

  const findLatestReview = (arr, condition) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (condition(arr[i])) {
        return arr[i];
      }
    }
    return undefined;
  };

  const crrMovie = findLatestReview(
    profileUser?.rates,
    (rate) => rate?.review?.length > 0
  );

  return (
    <Grid container>
      <Grid item xs={12} mt={8}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottom={1}
          py={1}
        >
          <Typography fontWeight={"medium"}>User Lists</Typography>
          <Button
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            See All Lists
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item>
          <Link to={`/profile/${profileUser?.username}/watchlist`}>
            <ColumnBox alignItems="center" gap={0.5}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: 200,
                  width: 150,
                  backgroundColor: "primary.light",
                }}
              >
                <Bookmark
                  sx={{
                    color: "#fff",
                    fontSize: 64,
                  }}
                />
              </Box>
              <Typography fontSize={14}>
                Default Watchlist ({profileUser?.defaultWatchlist?.length || 0})
              </Typography>
            </ColumnBox>
          </Link>
        </Grid>
        <Grid item>
          <Link to={`/profile/${profileUser?.username}/favorites`}>
            <ColumnBox alignItems="center" gap={0.5}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: 200,
                  width: 150,
                  backgroundColor: "primary.light",
                }}
              >
                <Favorite
                  sx={{
                    color: "#fff",
                    fontSize: 64,
                  }}
                />
              </Box>
              <Typography fontSize={14}>
                Favorites ({profileUser?.favoriteMovies?.length || 0})
              </Typography>
            </ColumnBox>
          </Link>
        </Grid>
        {!!(user?.username == profileUser?.username) && (
          <Grid item>
            <Link to={`/profile/${profileUser?.username}/favorites`}>
              <ColumnBox alignItems="center" gap={0.5}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    height: 200,
                    width: 150,
                    backgroundColor: "secondary.light",
                  }}
                >
                  <BookmarkAdd
                    sx={{
                      color: "#000",
                      fontSize: 64,
                    }}
                  />
                </Box>
                <Typography fontSize={14}>Create List</Typography>
              </ColumnBox>
            </Link>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default UserLists;
