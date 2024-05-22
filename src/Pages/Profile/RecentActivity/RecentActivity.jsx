import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import useUser from "../../../Contexts/User/useUser";
import { getProfileUser } from "../../../Services/User";
import { CloseRounded, SearchRounded } from "@mui/icons-material";
import MovieItem from "../../../Components/Movie/MovieItem";
import CenteredBox from "../../../Components/CenteredBox";
import ColumnBox from "../../../Components/ColumnBox";
import NoDataSvg from "../../../assets/illustrations/nodata.svg";
import { Rating } from "react-simple-star-rating";
import { format } from "date-fns";
import { LazyLoadImage } from "react-lazy-load-image-component";

const RecentActivity = () => {
  const { user } = useUser();
  const { username } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({
    _id: "",
    username: "",
    rates: [],
  });

  useEffect(() => {
    //Call this function everytime username param changes, empty brackets cause problems when user jumps on another user's profile
    handleGetProfileUser();
  }, [username]);

  const handleGetProfileUser = async () => {
    setPageLoading(true);
    const crrUser = await getProfileUser(username);
    setProfileUser(crrUser);
    setPageLoading(false);
  };
  return (
    <Layout pageLoading={pageLoading}>
      <Breadcrumbs
        links={[
          {
            title: `${username}`,
            url: `/profile/${username}`,
          },
          {
            title: `Recent Activity`,
            url: `/profile/${username}/watchlist`,
          },
        ]}
      />

      <Grid item xs={12} py={2}>
        <Typography fontSize={20} fontWeight={"bolder"}>
          {profileUser?.username}'s Recent Activity
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        {profileUser?.rates?.map((rate) => (
          <Grid item xs={12} spacing={2} mt={2} px={2}>
            {rate?.movie ? (
              <>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  {/* <Typography fontSize={14} color={"secondary"}>
                    {rate?.review ? "Review" : "Rate"}{" "}
                  </Typography> */}
                  <div
                    style={{
                      width: "160px",
                      height: "1px",
                      backgroundColor: "#989898",
                    }}
                  />
                  <Typography
                    fontSize={14}
                    color={"secondary"}
                    fontWeight={500}
                  >
                    {format(rate?.createdAt, "dd.MM.yyyy")}
                  </Typography>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      backgroundColor: "#989898",
                    }}
                  />
                </Box>

                <Box display={"flex"} gap={2}>
                  {/* findLatestReview(profileUser?.rates, (rate) => rate?.review?.length > 0) */}
                  <Link to={`/movies/${rate?.movie}`}>
                    <LazyLoadImage
                      src={
                        rate?.moviePoster
                          ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${rate?.moviePoster}`
                          : "https://cataas.com/cat"
                      }
                      width={150}
                      alt="movie poster"
                      style={{
                        position: "relative",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                  <ColumnBox justifyContent="space-between">
                    <ColumnBox py={1}>
                      <Typography fontWeight={"bold"}>
                        {rate?.movieTitle}
                      </Typography>
                      <Rating
                        initialValue={rate?.rate > 5 ? 5 : rate?.rate}
                        size={24}
                        disableFillHover={true}
                        readOnly={true}
                        fillColor="#000"
                        style={{ marginTop: 8 }}
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
                        {rate?.review}
                      </Typography>
                    </ColumnBox>

                    {!!rate?.review && (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        pb={1}
                      >
                        <Typography fontSize={12} color={"secondary"}>
                          {rate?.likes?.length || 0} likes
                        </Typography>
                        <Typography fontSize={12} color={"secondary"}>
                          {rate?.replies?.length || 0} comments
                        </Typography>
                      </Box>
                    )}
                  </ColumnBox>
                </Box>
              </>
            ) : (
              <Box py={1}>
                <Typography color={"secondary"}>No comments yet</Typography>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default RecentActivity;
