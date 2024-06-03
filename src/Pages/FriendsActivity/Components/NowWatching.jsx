import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ColumnBox from "../../../Components/ColumnBox";
import RedTvImg from "../../../assets/images/redtv.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ShimmerLoading from "../../../Components/Loaders/ShimmerLoading";

const sortNowWatchingByDate = (array, latestFirst = true) => {
  return array.sort((a, b) =>
    latestFirst
      ? new Date(b?.nowWatching?.watchDate) -
        new Date(a?.nowWatching?.watchDate)
      : new Date(a?.nowWatching?.watchDate) -
        new Date(b?.nowWatching?.watchDate)
  );
};

const NowWatching = ({ homeData, loading }) => {
  const [nowWatchingUserData, setNowWatchingUserData] = useState();
  useEffect(() => {
    let newData = sortNowWatchingByDate(
      homeData.filter((userItem) => userItem?.nowWatching?.id)
    );
    setNowWatchingUserData(newData);
  }, [homeData]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <ColumnBox mt={1} mb={2}>
          <Typography fontSize={20} fontWeight={"bolder"} mb={-0.5}>
            Now Watching
          </Typography>
          <Typography>See what your friends are currently watching!</Typography>
        </ColumnBox>
      </Grid>
      <ColumnBox
        p={4}
        sx={{
          width: "100%",
          background: "#F9F9F9",
          borderRadius: 4,
          border: 1,
          borderColor: "primary.main",
          position: "relative",
        }}
      >
        {loading ? (
          <>
            <ColumnBox width={"100%"} gap={2} px={2}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <ShimmerLoading height={15} width={"10%"} />
                <ShimmerLoading height={15} width={"75%"} />
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <ShimmerLoading height={15} width={"10%"} />
                <ShimmerLoading height={15} width={"75%"} />
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <ShimmerLoading height={15} width={"10%"} />
                <ShimmerLoading height={15} width={"75%"} />
              </Box>
            </ColumnBox>
          </>
        ) : nowWatchingUserData?.filter((userItem) => userItem?.nowWatching?.id)
            ?.length > 0 ? (
          nowWatchingUserData
            ?.filter((userItem) => userItem?.nowWatching?.id)
            ?.map((userItem) => {
              const watchDate = userItem?.nowWatching?.watchDate || new Date();
              return (
                <Box
                  key={userItem?.username}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Typography fontSize={14} width={110}>
                    {/* {format(watchDate, "dd/MM/yyyy") !==
                  format(new Date(), "dd/MM/yyyy")
                    ? format(watchDate, "MMMM d - HH:mm")
                    : format(watchDate, "HH:mm")}{" "} */}
                    {format(watchDate, "MMMM d - HH:mm")}
                  </Typography>
                  <Link to={`/profile/${userItem?.username}`}>
                    <Typography ml={2} fontSize={14}>
                      {userItem?.username}:
                    </Typography>
                  </Link>
                  <Link to={`/movies/${userItem?.nowWatching?.id}`}>
                    <Typography
                      color={"primary.main"}
                      fontWeight={"bold"}
                      fontSize={14}
                      ml={0.5}
                    >
                      {userItem?.nowWatching?.title} (
                      {userItem?.nowWatching?.release_date?.slice(0, 4)})
                    </Typography>
                  </Link>
                </Box>
              );
            })
        ) : (
          <Typography color={"secondary"}>
            No one is watching a movie right now. Maybe they need some movie
            suggestions, huh?
          </Typography>
        )}
        <LazyLoadImage
          src={RedTvImg}
          width={75}
          alt="tv picture"
          style={{
            position: "absolute",
            bottom: -30,
            right: 30,
            objectFit: "cover",
          }}
        />
      </ColumnBox>
    </Grid>
  );
};

export default NowWatching;
