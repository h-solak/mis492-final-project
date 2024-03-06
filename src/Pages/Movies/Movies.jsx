import { CloseRounded, SearchRounded, SearchSharp } from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { searchMovie } from "../../Services/Tmdb";
import MovieItem from "./Components/MovieItem";
import Layout from "../../Layout/Layout";
import { useSearchParams } from "react-router-dom";
import CenteredBox from "../../Components/CenteredBox";
import MovieNightSvg from "../../assets/illustrations/movienight.svg";
import ColumnBox from "../../Components/ColumnBox";
import NothingFound from "../../Components/NothingFound";
const Movies = () => {
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [movieResults, setMovieResults] = useState({});
  let [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (searchParams.get("search")) {
      setValue("searchMovies", searchParams.get("search"));
    }
  }, []);

  const handleSearch = async () => {
    setMoviesLoading(true);
    const values = getValues();
    const newMovieResults = await searchMovie(values.searchMovies.trim(), 1);
    setMovieResults(newMovieResults);
    setMoviesLoading(false);
  };
  useEffect(() => {
    if (watch("searchMovies").length > 0) {
      handleSearch(); //Search everytime a value changes
      // history.push(`/search?q=${watch("searchMovies")}`);
      setSearchParams({ search: watch("searchMovies")?.trim() });
    }
  }, [watch("searchMovies")]);

  return (
    <Layout>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          ref={searchInputRef}
          placeholder="Search your favorite movies..."
          InputProps={{
            startAdornment: <SearchRounded color="disabled" sx={{ mr: 1 }} />,
            endAdornment: watch("searchMovies") ? (
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
            ) : null,
          }}
          fullWidth
          {...register("searchMovies", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
        />
      </Grid>
      {movieResults?.total_results > 0 ? (
        <Grid container marginTop={4} spacing={4}>
          {moviesLoading ? (
            <span
              className="loader"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></span>
          ) : (
            movieResults?.results?.map((movie, index) => (
              <MovieItem key={index} movie={movie} />
            ))
          )}
        </Grid>
      ) : null}
      {!movieResults?.total_results == 0 ? null : watch("searchMovies") ? (
        !moviesLoading && <NothingFound />
      ) : (
        <CenteredBox flexDirection="column">
          <ColumnBox textAlign="center" gap={1}>
            <img src={MovieNightSvg} width={350} alt="movie" />
            <Typography color={"secondary"}>
              Start your movie night with one search!
            </Typography>
          </ColumnBox>
        </CenteredBox>
      )}
    </Layout>
  );
};

export default Movies;
