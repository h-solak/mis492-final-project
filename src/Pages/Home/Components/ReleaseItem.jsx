import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ReleaseItem = ({ movie }) => {
  return (
    <Box>
      <Link to={`/movies/${movie?.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`}
          height={200}
          alt="Movie Poster"
          style={{
            objectFit: "",
          }}
        />
      </Link>
    </Box>
  );
};

export default ReleaseItem;
