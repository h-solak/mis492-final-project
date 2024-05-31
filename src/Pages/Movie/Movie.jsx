import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../Services/Tmdb";
import ColumnBox from "../../Components/ColumnBox";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
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
/* Icons */
import NowWatchingSvg from "../../assets/icons/movieItem/nowWatching.svg";
import NowWatchingActiveSvg from "../../assets/icons/movieItem/nowWatchingActive.svg";
import ReviewSvg from "../../assets/icons/movieItem/review.svg";
import ReviewActiveSvg from "../../assets/icons/movieItem/reviewActive.svg";
import BookmarkSvg from "../../assets/icons/movieItem/bookmark.svg";
import BookmarkActiveSvg from "../../assets/icons/movieItem/bookmarkActive.svg";
import FavoriteSvg from "../../assets/icons/movieItem/favorite.svg";
import FavoriteActiveSvg from "../../assets/icons/movieItem/favoriteActive.svg";
import useUser from "../../Contexts/User/useUser";
import { removeNowWatching, setNowWatching } from "../../Services/NowWatching";
import { addToFavorites, removeFromFavorites } from "../../Services/Favorites";
import {
  addToDefaultWatchlist,
  removeFromDefaultWatchlist,
} from "../../Services/Watchlist";
import { Rating } from "react-simple-star-rating";

const Movie = () => {
  let { movieId } = useParams();
  const { user, setUser } = useUser();
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
        await handleGetMovieReviews();
        setRateModal(false);
        toast.success("Your review is saved.");
      } catch (err) {
        console.log(err);
      }
    } else {
      // toast.error("You should rate the movie");
    }
  };

  const handleWatchlist = async () => {
    if (!user?.defaultWatchlist?.find((item) => item?.id == movieId)) {
      //add to default watchlist
      const newWatchlist = await addToDefaultWatchlist({
        id: movieId,
        title: movie?.title,
        posterPath: movie?.poster_path,
        releaseDate: movie?.release_date,
      });
      if (newWatchlist?.length > 0) {
        setUser((userItem) => ({
          ...userItem,
          defaultWatchlist: newWatchlist,
        }));
      }
    } else {
      //remove movie from watchlist
      const newWatchlist = await removeFromDefaultWatchlist({ movieId });
      if (newWatchlist?.length > 0) {
        setUser((userItem) => ({
          ...userItem,
          defaultWatchlist: newWatchlist,
        }));
      }
    }
  };

  const handleFavorites = async () => {
    if (!user?.favoriteMovies?.find((item) => item?.id == movieId)) {
      //add to favorites
      const newFavorites = await addToFavorites({
        id: movieId,
        title: movie?.title,
        posterPath: movie?.poster_path,
        releaseDate: movie?.release_date,
      });
      if (newFavorites?.length > 0) {
        setUser((userItem) => ({
          ...userItem,
          favoriteMovies: newFavorites,
        }));
      }
    } else {
      //remove movie from favorites
      const newFavorites = await removeFromFavorites({ movieId });
      if (newFavorites?.length > 0) {
        setUser((userItem) => ({
          ...userItem,
          favoriteMovies: newFavorites,
        }));
      }
    }
  };

  const handleNowWatching = async () => {
    if (!(user?.nowWatching?.id == movieId)) {
      const newNowWatching = await setNowWatching({ movie });
      if (newNowWatching) {
        setUser((userItem) => ({ ...userItem, nowWatching: newNowWatching }));
      }
    } else {
      //remove now watching
      const newNowWatching = await removeNowWatching();
      setUser((userItem) => ({ ...userItem, nowWatching: newNowWatching }));
    }
  };

  return isLoading ? (
    <span className="loader absolute-center"></span>
  ) : (
    <Layout container disablePaddingX disablePaddingY>
      {/* Movie Details */}
      <Grid
        container
        className="full-height"
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/w1280/${
            movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
          })`,
          backgroundPosition: "top",
          backgroundRepeat: "none",
          backgroundSize: "cover",
        }}
        alignItems={"center"}
        justifyContent={"space-between"}
        position={"relative"}
      >
        <Grid item xs={8} md={8.5} px={4}>
          <ColumnBox justifyContent="center" px={4}>
            <Typography
              marginTop={2}
              fontWeight={"bold"}
              fontSize={32}
              color={"#fff"}
            >
              {movie?.title}
            </Typography>
            {!!movie?.vote_average && (
              <ColumnBox>
                <Box display={"flex"} alignItems={"center"} gap={0.5}>
                  <Star
                    sx={{
                      color: "highlight.main",
                    }}
                  />
                  <Typography fontSize={18} color="#fff" fontWeight={"medium"}>
                    {parseFloat(movie?.vote_average?.toString()?.slice(0, 2)) /
                      2}
                    /5
                  </Typography>
                </Box>
              </ColumnBox>
            )}

            <Typography color={"#fff"}>{movie?.overview}</Typography>
            {movie?.genres && (
              <Grid container gap={2} marginTop={2}>
                {movie?.genres?.map((genre) => (
                  <Grid
                    key={genre?.id}
                    item
                    px={2}
                    py={1}
                    sx={{ backgroundColor: "primary.main", borderRadius: 4 }}
                  >
                    <Typography color={"#fff"} fontSize={14}>
                      {genre?.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
            <Typography marginTop={2} color={"secondary"} fontWeight={"bold"}>
              {movie?.release_date.slice(0, 4)} -{" "}
              <Timer sx={{ fontSize: 16 }} /> {movie?.runtime} minutes
            </Typography>
          </ColumnBox>
        </Grid>
        {/* Right side of the movie details */}
        <Grid
          item
          xs={4}
          md={3.5}
          sx={{
            overflowX: "hidden",
          }}
        >
          <ColumnBox
            alignItems="start"
            textAlign="start"
            sx={{
              background: "#fff",
              borderRadius: "24px 0px 0px 24px",
              p: 3,
              gap: 1,
            }}
          >
            <Button
              color="dark"
              startIcon={
                user?.nowWatching?.id == movieId ? (
                  <img
                    src={NowWatchingActiveSvg}
                    width={21}
                    height={21}
                    alt="Review Active"
                  />
                ) : (
                  <img
                    src={NowWatchingSvg}
                    width={21}
                    height={21}
                    alt="Favorite"
                  />
                )
              }
              sx={{
                textTransform: "none",
                fontSize: 15,
                whiteSpace: "nowrap",
              }}
              onClick={handleNowWatching}
            >
              Show as “Now Watching”
            </Button>
            <Button
              color="dark"
              startIcon={
                userRates?.some((item) => item?.movie == movieId) ? (
                  <img
                    src={ReviewActiveSvg}
                    width={21}
                    height={21}
                    alt="Review Active"
                  />
                ) : (
                  <img src={ReviewSvg} width={21} height={21} alt="Review" />
                )
              }
              sx={{
                textTransform: "none",
                fontSize: 15,
              }}
              onClick={() => {
                setRateModal(true);
              }}
            >
              {userRates?.some((item) => item?.movie == movieId)
                ? "Edit your review"
                : "Add a Review"}
            </Button>
            <Button
              color="dark"
              startIcon={
                user?.defaultWatchlist?.find((item) => item?.id == movieId) ? (
                  <img
                    src={BookmarkActiveSvg}
                    width={21}
                    height={21}
                    alt="Bookmark Active"
                  />
                ) : (
                  <img
                    src={BookmarkSvg}
                    width={21}
                    height={21}
                    alt="Bookmark"
                  />
                )
              }
              sx={{
                textTransform: "none",
                fontSize: 15,
              }}
              onClick={handleWatchlist}
            >
              {user?.defaultWatchlist?.find((item) => item?.id == movieId)
                ? "Saved to Watchlist"
                : "Add to Watchlist"}
            </Button>
            <Button
              color="dark"
              startIcon={
                user?.favoriteMovies?.find((item) => item?.id == movieId) ? (
                  <img
                    src={FavoriteActiveSvg}
                    width={21}
                    height={21}
                    alt="Favorite Active"
                  />
                ) : (
                  <img
                    src={FavoriteSvg}
                    width={21}
                    height={21}
                    alt="Favorite"
                  />
                )
              }
              sx={{
                textTransform: "none",
                fontSize: 15,
              }}
              onClick={handleFavorites}
            >
              {user?.favoriteMovies?.find((item) => item?.id == movieId)
                ? "Saved to Favorites"
                : "Add to Favorites"}
            </Button>
          </ColumnBox>
        </Grid>
        {!!userRates?.find((rate) => rate?.movie === movieId)?.rate && (
          <ColumnBox position={"absolute"} bottom={100} right={75}>
            <Typography textAlign={"center"} color={"#fff"}>
              Your rating
            </Typography>
            <Rating
              initialValue={
                userRates?.find((rate) => rate?.movie === movieId)?.rate > 5
                  ? 5
                  : userRates?.find((rate) => rate?.movie === movieId)?.rate
              }
              size={40}
              disableFillHover
              readOnly
              fillColor="#FFE500"
              style={{ marginLeft: "8px", pointerEvents: "none" }}
            />
          </ColumnBox>
        )}
      </Grid>
      {/* Reviews Section */}
      {!!userReviews?.length > 0 && (
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
      )}

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
