import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../Services/Tmdb";
import ColumnBox from "../../Components/ColumnBox";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Star, Timer } from "@mui/icons-material";
import Layout from "../../Layout/Layout";
import {
  getMovieReviews,
  getUserMovieRates,
  rateMovie,
} from "../../Services/Movie";
import Modal from "../../Components/Modal";
import toast from "react-hot-toast";
import ReviewItem from "./Components/ReviewItem";
import ReviewModal from "./Components/ReviewModal";

const Movie = () => {
  let { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({}); //current movie
  const [rating, setRating] = useState(0); //user's rating
  const [review, setReview] = useState(""); //user's review textfield
  const [userReviews, setUserReviews] = useState([]); //all reviews about the movie
  const [rateModal, setRateModal] = useState(false); //rate&review modal
  const [userRates, setUserRates] = useState([]); //all movie rates of the user

  useEffect(() => {
    getMovie();
    handleGetUserMovieRates();
    handleGetMovieReviews();
  }, []);

  //get current movie
  const getMovie = async () => {
    const crrMovie = await getMovieDetails(movieId);
    setMovie(crrMovie);
    setIsLoading(false);
  };

  const handleGetMovieReviews = async () => {
    const reviews = await getMovieReviews(movieId);
    console.log(reviews);
    setUserReviews(reviews);
  };

  //check if user has rated this movie before
  const handleGetUserMovieRates = async () => {
    const rates = await getUserMovieRates();
    setUserRates(rates);
    const userHasRated = rates?.some((item) => item?.movie === movieId);
    if (userHasRated) {
      const usersRate = rates?.find((item) => item?.movie === movieId);
      setRating(usersRate.rate);
      setReview(usersRate?.review);
    }
  };

  const handleSubmitRate = async () => {
    if (rating > 0) {
      try {
        const userHasVotedBefore = userRates?.some(
          (item) => item?.movie === movieId
        );
        await rateMovie({
          movie: movieId,
          rate: rating,
          review: review,
          moviePoster: movie?.poster_path,
          movieTitle: movie?.title,
          userHasVotedBefore: userHasVotedBefore,
        });
        await handleGetUserMovieRates();
        setRateModal(false);
        toast.success("Your review is saved.");
      } catch (err) {
        console.log(err);
      }
    } else {
      // toast.error("You should rate the movie");
    }
  };

  return isLoading ? (
    <span className="loader absolute-center"></span>
  ) : (
    <Layout container disablePaddingX disablePaddingY>
      {/* Movie Details */}
      <Grid
        item
        xs={12}
        className="full-height"
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/w1280/${
            movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
          })`,
          backgroundPosition: "top",
          backgroundRepeat: "none",
          backgroundSize: "cover",
        }}
      >
        <ColumnBox className="full-height" justifyContent="center" px={4}>
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
                  <Typography fontSize={18} color="#fff" fontWeight={"medium"}>
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
                  <Typography fontSize={18} color="#fff" fontWeight={"medium"}>
                    {userRates?.find((rate) => rate?.movie === movieId)?.rate}
                  </Typography>
                </Box>
              </ColumnBox>
            ) : null}
          </Grid>
          <Typography
            marginTop={2}
            fontWeight={"bold"}
            fontSize={32}
            color={"#fff"}
          >
            {movie?.title}
          </Typography>

          <Typography color={"#fff"}>{movie?.overview}</Typography>
          <Typography marginTop={2} color={"secondary"} fontWeight={"bold"}>
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
        </ColumnBox>
      </Grid>
      {/* Reviews Section */}
      <Grid container p={4} spacing={4}>
        <Grid item xs={12} mt={2}>
          <Typography fontWeight={"medium"} fontSize={20}>
            User Reviews for{" "}
            <Typography variant={"span"} fontWeight={"bold"}>
              {movie?.title}
            </Typography>
          </Typography>
        </Grid>

        {!userReviews ? (
          <Grid item xs={12} mt={2}>
            <Typography color={"secondary"}>
              There are no reviews yet.
            </Typography>
          </Grid>
        ) : (
          userReviews?.map((review) => (
            <ReviewItem
              key={review?._id}
              review={review}
              handleGetMovieReviews={handleGetMovieReviews}
            />
          ))
        )}
      </Grid>
      {/* Rate Modal */}
      <ReviewModal
        movie={movie}
        isModalOpen={rateModal}
        rating={rating}
        setRating={setRating}
        review={review}
        setReview={setReview}
        setIsModalOpen={setRateModal}
        handleSubmitRate={handleSubmitRate}
      />
    </Layout>
  );
};

export default Movie;
