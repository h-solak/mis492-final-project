import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import AvatarImg from "../../../Components/AvatarImg";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ReviewItem = ({ review }) => {
  return (
    <Grid item xs={12}>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Link to={`/profile/${review.username}`}>
          <Box display={"flex"} alignItems={"center"} gap={0.6}>
            <AvatarImg no={review?.userAvatar} width={40} height={40} />
            <Typography fontWeight={600}>{review?.username}</Typography>
          </Box>
        </Link>
        <Box display={"flex"} alignItems={"center"} gap={0}>
          <Star
            sx={{
              color: "highlight.main",
              fontSize: 20,
            }}
          />
          <Typography fontSize={16}>
            {review?.rate}
            <Typography variant={"span"} fontSize={12}>
              /10
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          wordWrap: "break-word",
        }}
      >
        {review?.review}
      </Typography>
    </Grid>
  );
};

export default ReviewItem;
