import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import ColumnBox from "../../../Components/ColumnBox";
import RedTvImg from "../../../assets/images/redtv.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NowWatching = ({ homeData }) => {
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
        {homeData
          ?.filter((userItem) => userItem?.nowWatching?.id)
          ?.map((userItem) => {
            const watchDate = userItem?.nowWatching?.watchDate || new Date();
            return (
              <Box
                key={userItem?.username}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={14}>
                  {/* {format(watchDate, "dd/MM/yyyy") !==
                  format(new Date(), "dd/MM/yyyy")
                    ? format(watchDate, "MMMM d - HH:mm")
                    : format(watchDate, "HH:mm")}{" "} */}
                  {format(watchDate, "MMMM d - HH:mm")}
                </Typography>
                <Typography ml={2} fontSize={14}>
                  {userItem?.username}:
                </Typography>
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
          })}
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
