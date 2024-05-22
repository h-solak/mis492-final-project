import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ProfileUserContext } from "../Profile";
import RateItem from "./RateItem";
import MovieItem from "../../../Components/Movie/MovieItem";

const RecentActivityPreview = ({ rate }) => {
  const { profileUser } = useContext(ProfileUserContext);

  console.log(profileUser?.rates);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottom={1}
          py={1}
        >
          <Typography fontWeight={"medium"}>Recent Activity</Typography>
          <Button
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            See All Activity
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        spacing={2}
        mt={1}
        sx={{
          overflow: "hidden",
          height: profileUser?.rates?.length > 0 ? 260 : 40,
        }}
      >
        {profileUser?.rates?.length > 0 ? (
          profileUser?.rates?.slice(-10)?.map((rate) => {
            const movie = {
              id: rate?.movie,
              title: rate?.movieTitle,
              poster_path: rate?.moviePoster,
              release_date: rate?.release_date || "",
            };
            return <MovieItem movie={movie} md={3} />;
          })
        ) : (
          <Box px={2} py={1}>
            <Typography color={"secondary"}>No activity yet</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default RecentActivityPreview;
