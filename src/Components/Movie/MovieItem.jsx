import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ColumnBox from "../ColumnBox";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NowWatchingSvg from "../../assets/icons/movieItem/nowWatching.svg";
import NowWatchingActiveSvg from "../../assets/icons/movieItem/nowWatchingActive.svg";
import ReviewSvg from "../../assets/icons/movieItem/review.svg";
import ReviewActiveSvg from "../../assets/icons/movieItem/reviewActive.svg";
import BookmarkSvg from "../../assets/icons/movieItem/bookmark.svg";
import BookmarkActiveSvg from "../../assets/icons/movieItem/bookmarkActive.svg";
import FavoriteSvg from "../../assets/icons/movieItem/favorite.svg";
import FavoriteActiveSvg from "../../assets/icons/movieItem/favoriteActive.svg";
import useUser from "../../Contexts/User/useUser";
import {
  addMovieToCustomWatchlist,
  addToDefaultWatchlist,
  removeFromDefaultWatchlist,
} from "../../Services/Watchlist";
import { addToFavorites, removeFromFavorites } from "../../Services/Favorites";
import { removeNowWatching, setNowWatching } from "../../Services/NowWatching";
import Modal from "../Modals/Modal";
import { Close } from "@mui/icons-material";
import toast from "react-hot-toast";

const Bottombar = ({ height, movie }) => {
  const movieId = movie?.id;
  const { user, setUser } = useUser();
  const [addToWatchlistModal, setAddToWatchlistModal] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] =
    useState("defaultWatchlist");

  const handleDefaultWatchlist = async () => {
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
        setAddToWatchlistModal(false);
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

  //custom watchlists, default watchlist, favorites...
  const handleAddToWatchlist = async () => {
    if (selectedWatchlist == "favorites") {
      await handleFavorites();
      setAddToWatchlistModal(false);
      toast(
        <Typography>
          <b>{movie?.title}</b> is added to{" "}
          <Typography variant="span" fontWeight={600}>
            Favorites
          </Typography>
        </Typography>,
        {
          icon: "❤️",
        }
      );
    } else if (selectedWatchlist == "defaultWatchlist") {
      await handleDefaultWatchlist();
      setAddToWatchlistModal(false);
      toast(
        <Typography>
          <b>{movie?.title}</b> is added to{" "}
          <Typography variant="span" fontWeight={600}>
            Default Watchlist
          </Typography>
        </Typography>,
        {
          icon: "🎬",
        }
      );
    } else {
      const newUser = await addMovieToCustomWatchlist({
        watchlistId: selectedWatchlist,
        movieId: movieId,
        title: movie?.title,
        posterPath: movie?.poster_path,
        releaseDate: movie?.release_date,
      });
      console.log(newUser);
      if (newUser?._id) {
        setUser(newUser);
        toast(
          <Typography>
            <b>{movie?.title}</b> is added to{" "}
            <Typography variant="span" fontWeight={600}>
              {user?.watchlists?.find((item) => item?._id == selectedWatchlist)
                ?.title || "Watchlist"}
            </Typography>
          </Typography>,
          {
            icon: "🎬",
          }
        );
        setAddToWatchlistModal(false);
      }
    }
  };

  return (
    <Box
      className="movie-item-bottombar"
      position={"absolute"}
      bottom={0}
      zIndex={999}
      sx={{
        overflow: "hidden",
        backgroundColor: "#F9F7F7",
      }}
      height={height}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={1}
      onClick={(e) => e.stopPropagation()}
    >
      <Tooltip title="Favorite">
        <IconButton className="fade-in" onClick={handleFavorites}>
          {user?.favoriteMovies?.find((item) => item?.id == movieId) ? (
            <img src={FavoriteActiveSvg} width={21} alt="Favorite Active" />
          ) : (
            <img src={FavoriteSvg} width={21} alt="Favorite" />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Add to watchlist"
        onClick={() => setAddToWatchlistModal(true)}
        // onClick={handleWatchlist}
      >
        <IconButton className="fade-in">
          {user?.defaultWatchlist?.find((item) => item?.id == movieId) ? (
            <img src={BookmarkActiveSvg} width={15} alt="Bookmark" />
          ) : (
            <img src={BookmarkSvg} width={15} alt="Bookmark" />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Write a review">
        <Link to={`/movies/${movie?.id}`}>
          <IconButton className="fade-in">
            <img src={ReviewSvg} width={21} alt="Review" />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Now watching" onClick={handleNowWatching}>
        <IconButton className="fade-in">
          {user?.nowWatching?.id == movieId ? (
            <img src={NowWatchingActiveSvg} width={21} alt="Now Watching" />
          ) : (
            <img src={NowWatchingSvg} width={21} alt="Now Watching" />
          )}
        </IconButton>
      </Tooltip>
      {/* Add to a watchlist modal */}
      <Modal
        isModalOpen={addToWatchlistModal}
        setIsModalOpen={setAddToWatchlistModal}
      >
        <Box
          width={"100%"}
          mb={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={18} fontWeight={700}>
            Add to a List
          </Typography>
          <IconButton onClick={() => setAddToWatchlistModal(false)}>
            <Close
              sx={{
                color: "#000",
              }}
            />
          </IconButton>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={4}
          px={4}
          py={1}
          mb={2}
        >
          <LazyLoadImage
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`
                : "https://cataas.com/cat"
            }
            height={240}
            alt="movie picture"
            style={{
              position: "relative",
              objectFit: "cover",
            }}
          />
          <ColumnBox gap={8}>
            <ColumnBox gap={2}>
              <Typography fontWeight={700} fontSize={18}>
                Great Choice!
              </Typography>
              <Typography>
                Please choose to which lists you would like to add{" "}
                <Typography
                  variant="span"
                  color={"primary.main"}
                  fontWeight={600}
                >
                  {movie?.title}
                </Typography>
                .
              </Typography>
            </ColumnBox>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="watchlist-select-label">Watchlist</InputLabel>
                <Select
                  labelId="watchlist-select-label"
                  id="watchlist-select"
                  defaultValue={"favorites"}
                  value={selectedWatchlist}
                  onChange={(e) => setSelectedWatchlist(e.target.value)}
                  label="Watchlist"
                  size="small"
                >
                  <MenuItem value="favorites">Favorites</MenuItem>
                  <MenuItem value="defaultWatchlist">
                    Default Watchlist
                  </MenuItem>
                  {!!user?.watchlists?.length > 0 &&
                    user?.watchlists.map((watchlist) => (
                      <MenuItem key={watchlist?._id} value={watchlist?._id}>
                        {watchlist?.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Button
                onClick={handleAddToWatchlist}
                variant="contained"
                sx={{
                  borderRadius: 99,
                  py: 1,
                  px: 6,
                }}
              >
                Add
              </Button>
            </Box>
          </ColumnBox>
        </Box>
      </Modal>
    </Box>
  );
};
const MovieItem = ({ xs = 12, sm = 6, md = 3, height = 240, movie }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!movie?.id) {
    return null;
  }
  return (
    <Grid item xs={xs} sm={sm} md={md} className="opening-animation">
      {/* Grid in this component is a container, ColumnBox is the actual movie item user see on the screen */}
      <ColumnBox
        className="movie-item"
        sx={{
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => navigate("/movies/" + movie?.id)}
        height={height}
      >
        <LazyLoadImage
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`
              : "https://cataas.com/cat"
          }
          width={"100%"}
          height={height}
          alt="movie picture"
          style={{
            position: "relative",
            objectFit: "cover",
          }}
        />
        {/* Image Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "%50" /* Adjust this value to control darkness */,
            background:
              "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))" /* Adjust the last value to control opacity */,
          }}
        ></Box>
        <ColumnBox pt={0.5} position="absolute" sx={{ top: 0, p: 1 }}>
          <Typography fontSize={14} sx={{ color: "#fff" }}>
            {movie?.title}
          </Typography>
          <Typography color={"secondary"} fontSize={12}>
            {movie?.release_date.slice(0, 4)}
          </Typography>
        </ColumnBox>
        <Bottombar height={40} movie={movie} />
      </ColumnBox>
    </Grid>
  );
};

export default MovieItem;
