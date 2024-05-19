import {
  ArrowLeft,
  ArrowRight,
  CloseRounded,
  SearchRounded,
  SearchSharp,
} from "@mui/icons-material";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { searchMovie } from "../../Services/Tmdb";
import MovieItem from "../../Components/Movie/MovieItem";
import Layout from "../../Layout/Layout";
import { useSearchParams } from "react-router-dom";
import CenteredBox from "../../Components/CenteredBox";
import MovieNightSvg from "../../assets/illustrations/movienight.svg";
import ColumnBox from "../../Components/ColumnBox";
import NoResults from "../../Components/NoResults";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
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

  useEffect(() => {
    if (watch("searchMovies").length > 0) {
      handleSearch();
    }
  }, [watch("searchMovies")]);

  const handleSearch = async (newPage = 1) => {
    setMoviesLoading(true);
    const values = getValues();
    const newMovieResults = await searchMovie(
      values.searchMovies.trim(),
      newPage
    );
    setMovieResults(newMovieResults);
    setMoviesLoading(false);
    setSearchParams({ search: watch("searchMovies")?.trim(), page: newPage });
  };

  const handlePageChange = (action) => {
    let crrPage =
      parseInt(searchParams?.get("page")) >= 1
        ? parseInt(searchParams?.get("page"))
        : 1;
    if (action == "next" && movieResults?.total_pages >= crrPage) {
      handleSearch(crrPage + 1);
    } else if (action == "previous" && crrPage > 1) {
      handleSearch(crrPage - 1);
    } else {
      return null;
    }
  };

  return (
    <Layout>
      <Grid item xs={12}>
        <Breadcrumbs
          links={[
            {
              title: `Movies`,
              url: `/movies`,
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} px={4}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={"bold"} fontSize={20}>
            Movies
          </Typography>
          <TextField
            size="small"
            ref={searchInputRef}
            placeholder="Search a movie"
            InputProps={{
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
              ) : (
                <SearchRounded color="disabled" />
              ),
            }}
            fullWidth
            {...register("searchMovies", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            sx={{
              flex: 1 / 2,
              "& .MuiInputBase-root": {
                // Overriding the input base class to ensure border radius
                borderRadius: 4,
              },
            }}
            autoFocus
          />
        </Box>
      </Grid>

      {movieResults?.total_results > 0 ? (
        <Grid container marginTop={4} spacing={4} px={4}>
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
      {/* Pagination */}
      {movieResults?.total_pages > 1 && !moviesLoading && (
        <Grid container paddingY={4}>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <IconButton onClick={() => handlePageChange("previous")}>
              <ArrowLeft
                sx={{
                  fontSize: 32,
                }}
              />
            </IconButton>
            <Typography>
              Page {searchParams.get("page")}/{movieResults?.total_pages}
            </Typography>
            <IconButton onClick={() => handlePageChange("next")}>
              <ArrowRight
                sx={{
                  fontSize: 32,
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      )}

      {/* Start screen and No results  */}
      {!movieResults?.total_results == 0 ? null : watch("searchMovies") ? (
        !moviesLoading && <NoResults />
      ) : (
        <CenteredBox flexDirection="column">
          <ColumnBox textAlign="center" gap={1}>
            <img
              src={MovieNightSvg}
              width={350}
              alt="movie"
              className="slide-ltr"
            />
            <Typography color={"secondary"} className="slide-rtl">
              Start your movie night with one search!
            </Typography>
          </ColumnBox>
        </CenteredBox>
      )}
    </Layout>
  );
};

export default Movies;
