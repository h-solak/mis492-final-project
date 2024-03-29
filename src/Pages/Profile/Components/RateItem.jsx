import { Box, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AvatarImg from "../../../Components/AvatarImg";
import dayjs from "dayjs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ColumnBox from "../../../Components/ColumnBox";

const rateItem = ({ rate }) => {
  console.log(rate);
  return (
    <Grid item xs={12} marginBottom={4}>
      <Box display={"flex"} alignItems={"start"} gap={2}>
        <Link to={`/movies/${rate.movie}`}>
          <LazyLoadImage
            src={
              rate?.moviePoster
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${rate?.moviePoster}`
                : "https://cataas.com/cat"
            }
            width={"100px"}
            height={"150px"}
            alt="movie picture"
            style={{
              position: "relative",
              cursor: "pointer",
            }}
          />
        </Link>
        <ColumnBox>
          <Typography fontSize={18} fontWeight={600}>
            {rate?.movieTitle}
          </Typography>

          <Box display={"flex"} alignItems={"center"} gap={0}>
            <Star
              sx={{
                color: "highlight.main",
                fontSize: 20,
              }}
            />
            <Typography fontSize={16}>
              {rate?.rate}
              <Typography variant={"span"} fontSize={12}>
                /10
              </Typography>
            </Typography>
            <Typography color={"secondary"} fontSize={12}>
              ・Watched {dayjs(rate?.createdAt).format("MMMM D, YYYY")}
            </Typography>
            {/* <Rating size="small" value={parseInt(rate?.rate)} max={10} /> */}
          </Box>
          <Typography
            sx={{
              wordWrap: "break-word",
            }}
          >
            {rate?.review}
          </Typography>
        </ColumnBox>
      </Box>
    </Grid>
  );
};

export default rateItem;
