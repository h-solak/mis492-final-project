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

const RecentCommentsPreview = ({ rate }) => {
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
          <Typography fontWeight={"medium"}>Recent Comments</Typography>
          <Button
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            See All Comments
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={2} mt={1} px={2}>
        {crrMovie?.movie ? (
          <Box display={"flex"} gap={2} mt={2}>
            {/* findLatestReview(profileUser?.rates, (rate) => rate?.review?.length > 0) */}
            <Link to={`/movies/${crrMovie?.movie}`}>
              <LazyLoadImage
                src={
                  crrMovie?.moviePoster
                    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${crrMovie?.moviePoster}`
                    : "https://cataas.com/cat"
                }
                height={170}
                alt="movie poster"
                style={{
                  position: "relative",
                  objectFit: "cover",
                }}
              />
            </Link>
            <ColumnBox justifyContent="space-between">
              <ColumnBox>
                <Typography fontWeight={"bold"}>
                  {crrMovie?.movieTitle}
                </Typography>
                <Rating
                  initialValue={crrMovie?.rate > 5 ? 5 : crrMovie?.rate}
                  size={24}
                  disableFillHover={true}
                  readOnly={true}
                  fillColor="#000"
                  style={{ marginTop: 8 }}
                />
                <Typography
                  mt={1}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // Number of lines you want to show
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.5em", // Adjust this line height according to your text size
                  }}
                >
                  {crrMovie?.review}
                </Typography>
              </ColumnBox>

              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography fontSize={12} color={"secondary"}>
                  {format(crrMovie?.createdAt, "dd.MM.yyyy")}
                </Typography>
                <Typography fontSize={12} color={"secondary"}>
                  {crrMovie?.likes?.length || 0} likes
                </Typography>
                <Typography fontSize={12} color={"secondary"}>
                  {crrMovie?.replies?.length || 0} comments
                </Typography>
              </Box>
            </ColumnBox>
          </Box>
        ) : (
          <Box py={1}>
            <Typography color={"secondary"}>No comments yet</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default RecentCommentsPreview;
