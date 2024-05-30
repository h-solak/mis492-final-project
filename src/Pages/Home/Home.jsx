import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUser from "../../Contexts/User/useUser";
import LandingPage from "./LandingPage";
import ColumnBox from "../../Components/ColumnBox";
import Layout from "../../Layout/Layout";
import ReleaseRadar from "./Components/ReleaseRadar";
import { getHome } from "../../Services/Home";
import NowWatching from "./Components/NowWatching";
import PopcornImg from "../../assets/images/popcorn.jpeg";
import HomeBanner1 from "../../assets/images/homebanner1.png";
import HomeBanner2 from "../../assets/images/homebanner2.png";
import { Link, useNavigate } from "react-router-dom";
import NowWatchingBgSvg from "../../assets/backgrounds/nowWatchingRed.svg";
import NowWatchingSvgIcon from "../../assets/icons/nowWatchingOutlined.svg";
import ArrowRightSvg from "../../assets/icons/arrowright.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
  const { user } = useUser();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [homeData, setHomeData] = useState();
  const navigate = useNavigate();

  if (!user?._id) {
    return <LandingPage />;
  }

  useEffect(() => {
    handleGetHome();
  }, []);

  const handleGetHome = async () => {
    setIsPageLoading(true);
    const homeResponse = await getHome();
    setHomeData(homeResponse);
    setIsPageLoading(false);
  };

  const renderHomeNowWatching = () => {
    const friendsWatchingCrr = !!homeData?.find(
      (userItem) => userItem?.nowWatching?.id
    );

    if (friendsWatchingCrr) {
      const filteredHomeData = homeData?.filter(
        (userItem) => userItem?.nowWatching?.id
      );
      const nowWatchingUser = filteredHomeData[filteredHomeData.length - 1];

      return (
        <Box
          mt={4}
          display={"flex"}
          alignItems={"center"}
          gap={2}
          px={4}
          sx={{
            width: "100%",
            height: 44,
            borderRadius: 6,
            background: `url(${NowWatchingBgSvg})`,
            backgroundSize: "cover",
          }}
        >
          <img src={NowWatchingSvgIcon} width={22} alt="" />
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={0.75}
            fontWeight={500}
          >
            <Typography fontWeight={500}>
              {" "}
              <Link to={`/profile/${nowWatchingUser?.username}`}>
                @{nowWatchingUser?.username}
              </Link>
            </Typography>{" "}
            <Typography fontWeight={500}>is now watching </Typography>
            <Tooltip title="Visit movie page">
              <Link to={`/movies/${nowWatchingUser?.nowWatching?.id}`}>
                "{nowWatchingUser?.nowWatching?.title}"
              </Link>
            </Tooltip>
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <Layout pageLoading={isPageLoading} disablePaddingY>
      <ReleaseRadar />

      {/* Intro Banner */}
      <Grid
        mt={8}
        item
        xs={12}
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${PopcornImg})`,
          height: 300,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 4,
        }}
      >
        <ColumnBox
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
          gap={3}
          textAlign="center"
          position="relative"
        >
          <ColumnBox>
            <Typography color={"#ffffff"} fontWeight={700} fontSize={32}>
              WATCH, DISCOVER, MATCH!
            </Typography>
            <Typography color={"#ffffff"} fontWeight={500} fontSize={20}>
              Start your journey with MovieMate!
            </Typography>
          </ColumnBox>
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                user?.personality?.type?.length > 0
                  ? "/match"
                  : "/match/personality-test"
              )
            }
            sx={{
              borderRadius: 99,
              py: 1.5,
              px: 4,
              fontSize: 18,
              position: "absolute",
              bottom: 30,
            }}
          >
            {user?.personality?.type?.length > 0
              ? "MATCH NOW"
              : "TAKE THE QUIZ"}
          </Button>
        </ColumnBox>
      </Grid>
      {!!homeData && renderHomeNowWatching()}

      <Grid item xs={12} mt={4}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <ColumnBox width="50%">
            <Link to={"/friends-activity"}>
              <LazyLoadImage
                src={HomeBanner1}
                width={"100%"}
                height={250}
                alt="tv picture"
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Link>
            <Link to={"/friends-activity"}>
              <Typography
                display={"flex"}
                alignItems="center"
                gap={1}
                fontWeight={600}
                sx={{
                  textDecoration: "underline",
                }}
              >
                See Friends' Activity{" "}
                <img src={ArrowRightSvg} height={16} alt="arrow" />
              </Typography>
            </Link>
          </ColumnBox>
          <ColumnBox width="50%">
            <Link to={"/movies"}>
              <LazyLoadImage
                src={HomeBanner2}
                width={"100%"}
                height={250}
                alt="tv picture"
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Link>
            <Link to={"/movies"}>
              <Typography
                display={"flex"}
                alignItems="center"
                gap={1}
                fontWeight={600}
                sx={{
                  textDecoration: "underline",
                }}
              >
                Discover Movies
                <img src={ArrowRightSvg} height={16} alt="arrow" />
              </Typography>
            </Link>
          </ColumnBox>
        </Box>
      </Grid>
      <Typography width={"100%"} textAlign={"center"} mt={12} py={2}>
        2024 © MovieMate
      </Typography>
    </Layout>
  );
};

export default Home;
