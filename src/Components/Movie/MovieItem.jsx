import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import ColumnBox from "../ColumnBox";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Bookmark, Favorite, LiveTv, Reviews } from "@mui/icons-material";
import NowWatchingSvg from "../../assets/icons/movieItem/nowWatching.svg";
import NowWatchingActiveSvg from "../../assets/icons/movieItem/nowWatchingActive.svg";
import ReviewSvg from "../../assets/icons/movieItem/review.svg";
import ReviewActiveSvg from "../../assets/icons/movieItem/reviewActive.svg";
import BookmarkSvg from "../../assets/icons/movieItem/bookmark.svg";
import BookmarkActiveSvg from "../../assets/icons/movieItem/bookmarkActive.svg";
import FavoriteSvg from "../../assets/icons/movieItem/favorite.svg";
import FavoriteActiveSvg from "../../assets/icons/movieItem/favoriteActive.svg";

const Bottombar = ({ height }) => {
  return (
    <Box
      className="movie-item-bottombar"
      position={"absolute"}
      bottom={0}
      zIndex={999}
      sx={{
        backgroundColor: "#F9F7F7",
      }}
      height={height}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={1}
    >
      <Tooltip title="Favorite">
        <IconButton className="fade-in">
          <img src={FavoriteActiveSvg} width={21} alt="Live" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add to watchlist">
        <IconButton className="fade-in">
          <img src={BookmarkSvg} width={15} alt="Live" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Write a review">
        <IconButton className="fade-in">
          <img src={ReviewSvg} width={21} alt="Live" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Now watching">
        <IconButton className="fade-in">
          <img src={NowWatchingSvg} width={21} alt="Live" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
const MovieItem = ({ xs = 6, sm = 3, md = 3, height = 240, movie }) => {
  const navigate = useNavigate();
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
        <Bottombar height={40} />
      </ColumnBox>
    </Grid>
  );
};

export default MovieItem;

//Movie
// {
//
//         {
//           "adult": false,
//           "backdrop_path": "/7jjwdoIVPJp7gcDo9uE1sVZi2Rs.jpg",
//           "genre_ids": [
//               18,
//               10749
//           ],
//           "id": 296096,
//           "original_language": "en",
//           "original_title": "Me Before You",
//           "overview": "A small town girl is caught between dead-end jobs. A high-profile, successful man becomes wheelchair bound following an accident. The man decides his life is not worth living until the girl is hired for six months to be his new caretaker. Worlds apart and trapped together by circumstance, the two get off to a rocky start. But the girl becomes determined to prove to the man that life is worth living and as they embark on a series of adventures together, each finds their world changing in ways neither of them could begin to imagine.",
//           "popularity": 109.532,
//           "poster_path": "/Ia3dzj5LnCj1ZBdlVeJrbKJQxG.jpg",
//           "release_date": "2016-06-01",
//           "title": "Me Before You",
//           "video": false,
//           "vote_average": 7.924,
//           "vote_count": 11784
//       }

// {/* Vote Average  */}
// {movie?.vote_average && (
//   <Box
//     display={"flex"}
//     alignItems={"center"}
//     sx={{
//       position: "absolute",
//       right: "0%",
//       top: "0",
//       p: 1,
//       background: "#00000050",
//       borderRadius: 2,
//     }}
//   >
//     <StarIcon
//       sx={{
//         fontSize: 14,
//         color: "orange",
//       }}
//     />
//     <Typography
//       fontSize={12}
//       sx={{
//         color: "#fff",
//       }}
//     >
//       {movie?.vote_average?.toString()?.slice(0, 3)}
//     </Typography>
//   </Box>
// )}
