import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ColumnBox from "../../../Components/ColumnBox";
import Modal from "../../../Components/Modal";
import { Rating } from "react-simple-star-rating";
import { Bookmark, Favorite } from "@mui/icons-material";
import useUser from "../../../Contexts/User/useUser";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../Services/Favorites";
import {
  addToDefaultWatchlist,
  removeFromDefaultWatchlist,
} from "../../../Services/Watchlist";

const ReviewModal = ({
  isModalOpen,
  setIsModalOpen,
  movie,
  rating,
  setRating,
  review,
  setReview,
  handleSubmitRate,
}) => {
  const isMobileScreen = useMediaQuery("(max-width:899px)");
  const { user, setUser } = useUser();

  const isFavorite = user?.favoriteMovies?.find(
    (item) => item?.id == movie?.id
  );
  const isWatchlist = user?.defaultWatchlist?.find(
    (item) => item?.id == movie?.id
  );

  const handleWatchlist = async () => {
    if (!user?.defaultWatchlist?.find((item) => item?.id == movie?.id)) {
      //add to default watchlist
      const newWatchlist = await addToDefaultWatchlist({
        id: movie?.id,
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
      const newWatchlist = await removeFromDefaultWatchlist({
        movieId: movie?.id,
      });
      if (newWatchlist?.length > 0) {
        setUser((userItem) => ({
          ...userItem,
          defaultWatchlist: newWatchlist,
        }));
      }
    }
  };

  const handleFavorites = async () => {
    if (!user?.favoriteMovies?.find((item) => item?.id == movie?.id)) {
      //add to favorites
      const newFavorites = await addToFavorites({
        id: movie?.id,
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
      const newFavorites = await removeFromFavorites({ movieId: movie?.id });
      if (newFavorites?.length > 0) {
        setUser((userItem) => ({
          ...userItem,
          favoriteMovies: newFavorites,
        }));
      }
    }
  };

  return (
    <Modal
      title={"Review"}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <Box display={"flex"} alignItems={"start"} gap={8}>
        {!isMobileScreen && (
          <ColumnBox>
            <img
              src={`https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`}
              height={270}
              width={170}
              alt=""
              style={{
                objectFit: "cover",
              }}
            />
            <Box display={"flex"} alignItems={"center"}>
              <IconButton onClick={handleFavorites}>
                <Favorite
                  sx={{
                    color: isFavorite ? "primary.light" : "#000",
                  }}
                />
              </IconButton>
              <IconButton onClick={handleWatchlist}>
                <Bookmark
                  sx={{
                    color: isWatchlist ? "primary.light" : "#000",
                  }}
                />
              </IconButton>
            </Box>
          </ColumnBox>
        )}
        <ColumnBox gap={4} minWidth="400px">
          <Typography fontWeight={"bold"}>
            Write a review for{" "}
            <Typography
              component={"span"}
              color={"primary.main"}
              fontWeight={"bold"}
            >
              {movie?.title}
            </Typography>
            .
          </Typography>
          {/* <Rating
            size="large"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            max={5}
            sx={{
              width: "100%",
              flex: 1,
            }}
          /> */}
          <ColumnBox>
            <Typography fontWeight={"bold"} mb={1}>
              Rate
            </Typography>
            <Rating
              onClick={(newRate) => setRating(newRate)}
              initialValue={rating}
              size={32}
            />
          </ColumnBox>
          <ColumnBox>
            <Typography fontWeight={"bold"} mb={1}>
              Comment
            </Typography>
            <TextField
              multiline
              minRows={8}
              maxRows={8}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="How did it make you feel?"
              sx={{
                borderRadius: 99,
              }}
            />
          </ColumnBox>
          <Button
            size="large"
            variant="contained"
            onClick={() => handleSubmitRate()}
            sx={{
              px: 3,
              borderRadius: 99,
              alignSelf: "start",
            }}
            disabled={!rating > 0}
          >
            Publish
          </Button>
        </ColumnBox>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
