import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../Services/Tmdb";
import ColumnBox from "../../Components/ColumnBox";
import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import { Star, Timer } from "@mui/icons-material";
import Layout from "../../Layout/Layout";
import { getUserRates, rateMovie } from "../../Services/Movie";
import BaseModal from "../../Components/Modal";
import toast from "react-hot-toast";

const Movie = () => {
  let { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({}); //current movie
  const [rating, setRating] = useState(0); //current movie rating
  const [rateModal, setRateModal] = useState(false);
  const [userRates, setUserRates] = useState([]); //all movie rates of the user

  const handleRateChange = async (event, newValue) => {
    try {
      const userHasVotedBefore = userRates?.some(
        (item) => item?.movie === movieId
      );

      setRating(newValue);

      await rateMovie({
        movie: movieId,
        rate: newValue,
        userHasVotedBefore: userHasVotedBefore,
      });

      //refresh
      await handleGetUserRates();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const getMovie = async () => {
    const crrMovie = await getMovieDetails(movieId);
    setMovie(crrMovie);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovie(movieId);
    handleGetUserRates();
  }, []);

  const handleGetUserRates = async () => {
    const rates = await getUserRates();
    setUserRates(rates);
    const userHasRated = rates?.some((item) => item?.movie === movieId);
    if (userHasRated) {
      const usersRate = rates?.find((item) => item?.movie === movieId)?.rate;
      setRating(usersRate);
    }
  };

  return isLoading ? (
    <span className="loader absolute-center"></span>
  ) : (
    <Layout
      container
      paddingTop={4}
      disablePaddingY
      alignItems={"center"}
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/w1280/${
          movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
        })`,
        backgroundPosition: "top",
        backgroundRepeat: "none",
        backgroundSize: "cover",
        height: "calc(100vh - 80px)",
      }}
    >
      <Grid item xs={12}>
        <Grid item display={"flex"} alignItems={"center"} gap={2}>
          <Button
            variant="contained"
            color="highlight"
            onClick={() => {
              setRateModal(true);
            }}
          >
            Rate
          </Button>
          {movie?.vote_average ? (
            <ColumnBox>
              <Typography color={"#fff"}>User Rating</Typography>

              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Star
                  sx={{
                    color: "highlight.main",
                  }}
                />
                <Typography fontSize={18} color="#fff" fontWeight={500}>
                  {movie?.vote_average?.toString()?.slice(0, 3)}
                </Typography>
              </Box>
            </ColumnBox>
          ) : null}

          {userRates?.some((rate) => rate?.movie === movieId) ? (
            <ColumnBox textAlign="centerr">
              <Typography color={"#fff"}>Your Rating</Typography>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Star
                  sx={{
                    color: "#fff",
                  }}
                />
                <Typography fontSize={18} color="#fff" fontWeight={500}>
                  {userRates?.find((rate) => rate?.movie === movieId)?.rate}
                </Typography>
              </Box>
            </ColumnBox>
          ) : null}
        </Grid>
        <Typography marginTop={2} fontWeight={600} fontSize={32} color={"#fff"}>
          {movie?.title}
        </Typography>

        <Grid item xs={12} md={8} marginTop={2}>
          <Typography color={"#fff"}>{movie?.overview}</Typography>
        </Grid>
        <Typography marginTop={2} color={"secondary"} fontWeight={600}>
          {movie?.release_date.slice(0, 4)} - <Timer sx={{ fontSize: 16 }} />{" "}
          {movie?.runtime} minutes
        </Typography>
        {/* <Typography marginTop={0} color={"#fff"}>
          {movie?.genres?.map((genre) => genre.name).join(", ")}
        </Typography> */}
        {movie?.genres && (
          <Grid container gap={2} marginTop={2}>
            {movie?.genres?.map((genre) => (
              <Grid
                key={genre?.id}
                item
                px={2}
                py={0.2}
                sx={{ backgroundColor: "primary.main", borderRadius: 4 }}
              >
                <Typography color={"#fff"} fontSize={14}>
                  {genre?.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Rate Modal */}
        <BaseModal
          title={"Rate this movie"}
          isModalOpen={rateModal}
          setIsModalOpen={setRateModal}
        >
          <ColumnBox textAlign="center">
            <Typography fontWeight={500}>{movie?.title}</Typography>
            <Rating
              size="large"
              value={rating}
              onChange={handleRateChange}
              max={10}
            />
          </ColumnBox>
        </BaseModal>
      </Grid>
    </Layout>
  );
};

export default Movie;
