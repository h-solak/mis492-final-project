import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import {
  getMovieDetails,
  getRecommendationsForAMovie,
} from "../../Services/Tmdb";
import { useParams } from "react-router-dom";
import CenteredBox from "../../Components/CenteredBox";
import { Grid, IconButton, Typography } from "@mui/material";
import MovieItem from "../../Components/Movie/MovieItem";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import ColumnBox from "../../Components/ColumnBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const MovieRecommendations = () => {
  const { movieId } = useParams();
  const [crrMovie, setCrrMovie] = useState(); //movie
  const [movieRecommendations, setMovieRecommendations] = useState({}); //{page, results}
  const [crrPage, setCrrPage] = useState(1); //{page, results}
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetMovieDetails();
  }, []);

  useEffect(() => {
    handleGetMovieRecommendations(crrPage);
  }, [crrPage]);

  //get current movie
  const handleGetMovieDetails = async () => {
    const movie = await getMovieDetails(movieId); //crr movie
    setCrrMovie(movie);
  };

  const handleGetMovieRecommendations = async () => {
    setIsLoading(true);
    const newMovieRecommendations = await getRecommendationsForAMovie(
      movieId,
      crrPage
    );
    setMovieRecommendations(newMovieRecommendations);
    setIsLoading(false);
  };

  if (!movieRecommendations?.total_pages > 0 && !isLoading) {
    return (
      <Layout>
        <CenteredBox>Something Went Wrong!</CenteredBox>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid item xs={12}>
        <Breadcrumbs
          links={[
            {
              title: `Movies`,
              url: `/movies`,
            },
            {
              title: `Recommendations`,
              url: `/movies/recommendations/${movieId}`,
            },
            {
              title: `${crrMovie?.title || "Movie"}`,
              url: `/movies/recommendations/${movieId}`,
            },
          ]}
        />
      </Grid>

      <Grid xs={12} display={"flex"} alignItems={"start"} gap={2} px={4}>
        <LazyLoadImage
          src={
            crrMovie?.backdrop_path
              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${crrMovie?.backdrop_path}`
              : "https://cataas.com/cat"
          }
          height={150}
          width={100}
          alt="movie picture"
          style={{
            position: "relative",
            objectFit: "cover",
            backgroundPosition: "top",
          }}
        />
        <ColumnBox width="60%">
          <Typography fontWeight={600} fontSize={20}>
            You might like these movies if you liked{" "}
            <Typography variant="span" fontWeight={700}>
              {crrMovie?.title}
            </Typography>{" "}
          </Typography>
          <Typography mt={1}>
            You are wasting all of your free time looking for the best movie to
            watch? We got you covered!
          </Typography>
        </ColumnBox>
      </Grid>

      {movieRecommendations?.total_pages > 1 && !isLoading && (
        <Grid container mt={2}>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"end"}
            gap={1}
          >
            <IconButton
              onClick={() => {
                if (crrPage > 1) {
                  setCrrPage((oldPage) => oldPage - 1);
                }
              }}
            >
              <ArrowLeft
                sx={{
                  fontSize: 32,
                }}
              />
            </IconButton>
            <Typography fontSize={12}>
              Page {crrPage}/{movieRecommendations?.total_results || 0}
            </Typography>
            <IconButton
              onClick={() => {
                if (crrPage < movieRecommendations?.total_results) {
                  setCrrPage((oldPage) => oldPage + 1);
                }
              }}
            >
              <ArrowRight
                sx={{
                  fontSize: 32,
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      )}

      {isLoading ? (
        <span
          className="loader"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></span>
      ) : movieRecommendations?.total_results > 0 ? (
        <Grid container marginTop={2} spacing={4} px={4}>
          {movieRecommendations?.results?.map((movie, index) => (
            <MovieItem key={index} movie={movie} />
          ))}
        </Grid>
      ) : null}

      {movieRecommendations?.total_pages > 1 && !isLoading && (
        <Grid container paddingY={4}>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <IconButton
              onClick={() => {
                if (crrPage > 1) {
                  setCrrPage((oldPage) => oldPage - 1);
                }
              }}
            >
              <ArrowLeft
                sx={{
                  fontSize: 32,
                }}
              />
            </IconButton>
            <Typography>
              Page {crrPage}/{movieRecommendations?.total_results || 0}
            </Typography>
            <IconButton
              onClick={() => {
                if (crrPage < movieRecommendations?.total_results) {
                  setCrrPage((oldPage) => oldPage + 1);
                }
              }}
            >
              <ArrowRight
                sx={{
                  fontSize: 32,
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default MovieRecommendations;
