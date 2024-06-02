import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import NowWatching from "./Components/NowWatching";
import useUser from "../../Contexts/User/useUser";
import { getFriendActivity } from "../../Services/FriendActivity";
import { Box, Grid, Typography } from "@mui/material";
import Avatar from "../../Components/Avatar";
import { format, formatDistance } from "date-fns";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import ColumnBox from "../../Components/ColumnBox";
import NotesIcon from "@mui/icons-material/Notes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CenteredBox from "../../Components/CenteredBox";
import { NaturePeople } from "@mui/icons-material";

const sortByDate = (array, latestFirst = true) => {
  return array.sort((a, b) =>
    latestFirst
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );
};

const FriendsActivity = () => {
  const { user } = useUser();
  const [homeData, setHomeData] = useState();
  const [allActivites, setAllActivities] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetFriendActivity();
  }, []);

  const handleGetFriendActivity = async () => {
    setLoading(true);
    const homeResponse = await getFriendActivity();
    setHomeData(homeResponse);

    const friendRates = homeResponse
      ?.map((userSection) => {
        const _friendRateArr = userSection.rates || [];
        const _newFriendRateArr = _friendRateArr?.map((rateObj) => {
          return {
            ...rateObj,
            username: userSection?.username,
            type: rateObj?.review?.length > 0 ? "review" : "rate",
          };
        });
        return _newFriendRateArr;
      })
      .flat();

    const friendWatchlists = homeResponse
      ?.map((userSection) => {
        const _friendWatchlistArr = userSection.defaultWatchlist || [];
        const _newFriendWatchlistArr = _friendWatchlistArr?.map(
          (watchlistObj) => {
            return {
              ...watchlistObj,
              username: userSection?.username,
              createdAt: !!watchlistObj?.createdAt
                ? watchlistObj?.createdAt
                : new Date("05/30/2024"),
              type: "watchlist",
            };
          }
        );
        return _newFriendWatchlistArr;
      })
      .flat();

    const friendFavoriteMovies = homeResponse
      ?.map((userSection) => {
        const _friendFavoritesArr = userSection.favoriteMovies || [];
        const _newFriendFavoritesArr = _friendFavoritesArr?.map(
          (favoritesObj) => {
            return {
              ...favoritesObj,
              username: userSection?.username,
              createdAt: !!favoritesObj?.createdAt
                ? favoritesObj?.createdAt
                : new Date("05/30/2024"),
              type: "favorite",
            };
          }
        );
        return _newFriendFavoritesArr;
      })
      .flat();

    const allActivites = [
      ...friendRates,
      ...friendWatchlists,
      ...friendFavoriteMovies,
    ];

    const sortedAllActivites = sortByDate(allActivites);
    setAllActivities(sortedAllActivites);
    console.log(sortedAllActivites?.map((item) => item));

    setLoading(false);
  };
  return (
    <Layout pageLoading={loading}>
      <NowWatching homeData={homeData} loading={loading} />

      <Grid container mt={12}>
        <Grid item xs={12}>
          <Typography fontSize={20} fontWeight={700}>
            Friends' Activity
          </Typography>
        </Grid>
        {!!allActivites?.length > 0 ? (
          <Grid container>
            {allActivites
              ?.filter(
                (activityItem) =>
                  activityItem?.title || activityItem?.movieTitle
              )
              ?.map((activity) => (
                <Grid
                  item
                  xs={12}
                  py={4}
                  borderBottom={2}
                  borderColor={"divider"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Link to={`/profile/${activity?.username}`}>
                        <Avatar name={activity?.username} size={40} />
                      </Link>
                      <Typography fontSize={14}>
                        <Typography variant="span" fontWeight={700}>
                          <Link to={`/profile/${activity?.username}`}>
                            {activity?.username}
                          </Link>
                        </Typography>
                        <Typography variant="span">
                          {activity?.type == "review"
                            ? " commented and rated "
                            : activity?.type == "rate"
                            ? " rated "
                            : " added "}
                        </Typography>
                        <Typography variant="span" fontWeight={700}>
                          <Link
                            to={`/movies/${activity?.movie || activity?.id}`}
                          >
                            {activity?.movieTitle || activity?.title}
                          </Link>
                        </Typography>
                        <Typography variant="span">
                          {activity?.type == "watchlist"
                            ? " to their watchlist"
                            : activity?.type == "favorite"
                            ? " to their favorites"
                            : null}
                        </Typography>
                        .
                      </Typography>
                    </Box>
                    <Typography fontSize={12} color={"secondary"}>
                      {formatDistance(activity?.createdAt, new Date())} ago
                    </Typography>
                  </Box>

                  {!!activity?.moviePoster && (
                    <Box display={"flex"} gap={2} mt={3}>
                      <Link
                        to={`/movies/${
                          activity?.movie || activity?.id || activity?.movieId
                        }`}
                      >
                        <LazyLoadImage
                          src={
                            activity?.moviePoster
                              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${activity?.moviePoster}`
                              : "https://cataas.com/cat"
                          }
                          height={170}
                          alt="movie poster"
                          style={{
                            position: "relative",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <ColumnBox justifyContent="space-between">
                        <ColumnBox>
                          <Typography fontWeight={"bold"}>
                            {activity?.movieTitle || activity?.title}
                          </Typography>
                          <Rating
                            initialValue={
                              activity?.rate > 5 ? 5 : activity?.rate
                            }
                            size={24}
                            disableFillHover={true}
                            readOnly={true}
                            fillColor="#000"
                            style={{ marginTop: 8, pointerEvents: "none" }}
                          />
                          <Typography
                            mt={1}
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 3, // Number of lines you want to show
                              WebkitBoxOrient: "vertical",
                              lineHeight: "1.5em", // Adjust this line height according to your text size
                            }}
                          >
                            {activity?.review}
                          </Typography>
                        </ColumnBox>

                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <Typography fontSize={12} color={"secondary"}>
                            {format(activity?.createdAt, "dd.MM.yyyy")}
                          </Typography>
                          <Typography
                            fontSize={12}
                            color={"dark"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={0.5}
                          >
                            <FavoriteIcon sx={{ fontSize: 12 }} />{" "}
                            {activity?.likes?.length || 0} likes
                          </Typography>
                          <Typography
                            fontSize={12}
                            color={"dark"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={0.5}
                          >
                            <NotesIcon sx={{ fontSize: 12 }} />
                            {activity?.replies?.length || 0} comments
                          </Typography>
                        </Box>
                      </ColumnBox>
                    </Box>
                  )}
                </Grid>
              ))}
          </Grid>
        ) : (
          <ColumnBox mt={4} className="opening-animation">
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <NaturePeople
                sx={{
                  fontSize: 48,
                }}
              />
              <Typography fontWeight={"bold"}>No Activities Found</Typography>
            </Box>
            <Typography color={"secondary"} width={"60%"} mt={1}>
              If you are looking for some friends, try taking our character
              survey and match with people like you!
            </Typography>
          </ColumnBox>
        )}
      </Grid>
    </Layout>
  );
};

export default FriendsActivity;
