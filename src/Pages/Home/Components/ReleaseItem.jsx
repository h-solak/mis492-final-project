import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MovieItem from "../../../components/Movie/MovieItem";

const ReleaseItem = ({ movie }) => {
  return (
    <Box>
      <MovieItem movie={movie} xs={12} sm={12} md={12} lg={12} xl={12} />
    </Box>
  );
};

export default ReleaseItem;
