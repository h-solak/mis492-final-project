import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import useUser from "../../Contexts/User/useUser";
import { Box, Button, Grid, Typography } from "@mui/material";
/* icons */
import RomanticWarriorIcon from "../../assets/icons/characters/romanticwarrior.svg";
import DramaQueenIcon from "../../assets/icons/characters/dramaqueen.svg";
import ComicSansIcon from "../../assets/icons/characters/comicsans.svg";
import MysticWizardIcon from "../../assets/icons/characters/mysticwizard.svg";
import ActionMonkeyIcon from "../../assets/icons/characters/actionmonkey.svg";
import PerfectHarmonyIcon from "../../assets/icons/characters/perfectharmony.svg";
/* character images */
import RomanticWarrior from "../../assets/images/characters/romanticwarrior.jpeg";
import DramaQueen from "../../assets/images/characters/dramaqueen.jpeg";
import ComicSans from "../../assets/images/characters/comicsans.jpeg";
import MysticWizard from "../../assets/images/characters/mysticwizard.jpeg";
import ActionMonkey from "../../assets/images/characters/actionmonkey.jpeg";
import PerfectHarmony from "../../assets/images/characters/perfectharmony.jpg";
/* Metric & Genre Images */
import ActionImg from "../../assets/images/yourtypepage/action.png";
import ComedyImg from "../../assets/images/yourtypepage/comedy.png";
import DramaImg from "../../assets/images/yourtypepage/drama.png";
import EmotionalImpactImg from "../../assets/images/yourtypepage/emotionalimpact.png";
import FluidityImg from "../../assets/images/yourtypepage/fluidity.png";
import MysteryImg from "../../assets/images/yourtypepage/mystery.png";
import QuestionImg from "../../assets/images/yourtypepage/question.png";
import RomanticImg from "../../assets/images/yourtypepage/romantic.png";
import VisualTechnicalElementsImg from "../../assets/images/yourtypepage/visualtechnicalelements.png";

import Banner from "../../assets/images/banner.jpeg";

import { discoverMovies } from "../../Services/Tmdb";
import MovieItem from "../../Components/Movie/MovieItem";
import ColumnBox from "../../Components/ColumnBox";
import { useNavigate, useSearchParams } from "react-router-dom";
import CenteredBox from "../../Components/CenteredBox";
import PopcornLoader from "../../assets/animations/popcorn.json";
import Lottie from "lottie-react";

const YourType = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [movieRecommendations, setMovieRecommendations] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("first-time")) {
      setTimeout(() => {
        setSearchParams({});
      }, 2000);
    }
  }, []);

  const handleDiscoverMovies = async () => {
    //Genre Ids --> Romance: 10749, Drama: 18, Comedy: 35, Mystery: 9648,  Action: 28

    const getGenreId = (index) =>
      index == 0
        ? 10749
        : index == 1
        ? 18
        : index == 2
        ? 35
        : index == 3
        ? 9648
        : 28;

    const userMatrix = user?.personality?.resultMatrix?.map((item) => item[0]);

    let withGenreIds = [
      getGenreId(
        userMatrix.reduce(
          (maxIdx, currentValue, currentIndex, arr) =>
            currentValue > arr[maxIdx] ? currentIndex : maxIdx,
          0
        )
      ),
    ];
    let withoutGenreIds = [
      getGenreId(
        userMatrix.reduce(
          (minIdx, currentValue, currentIndex, arr) =>
            currentValue < arr[minIdx] ? currentIndex : minIdx,
          0
        )
      ),
    ];
    const movies = await discoverMovies({
      withGenreIds: withGenreIds,
      withoutGenreIds: withoutGenreIds,
    });
    setMovieRecommendations(movies?.results);
  };

  useEffect(() => {
    if (user?.personality?.type?.length > 0) {
      handleDiscoverMovies();
    }
  }, []);

  const leastFavoriteGenre = user?.personality?.resultMatrix?.reduce(
    (minIdx, currentValue, currentIndex, arr) =>
      currentValue < arr[minIdx] ? currentIndex : minIdx,
    0
  );
  return (
    <Layout disablePaddingX>
      {/* If user has a type */}
      <Grid container px={1}>
        {searchParams.get("first-time") && (
          <CenteredBox>
            <ColumnBox alignItems="center">
              <Lottie
                animationData={PopcornLoader}
                loop={true}
                style={{
                  width: 150,
                }}
              />
              <Typography>We are analyzing your survey...</Typography>
            </ColumnBox>
          </CenteredBox>
        )}
        <Grid item xs={12}>
          <Box
            px={6}
            py={2}
            display={"flex"}
            alignItems={"center"}
            gap={1}
            sx={{
              background:
                user?.personality?.type == "Romantic Warrior"
                  ? "linear-gradient(270deg, #FFFFFF 0%, #4A6DCF 50%, #9D0F7A 100%)"
                  : user?.personality?.type == "Drama Queen"
                  ? "linear-gradient(270deg, #FFFFFF 0%, rgba(251, 153, 153, 0.5) 50%, rgba(255, 14, 14, 0.8) 100%)"
                  : user?.personality?.type == "Comic Sans"
                  ? "linear-gradient(270deg, #FDFDF2 0%, #EFD76B 50%, #F4AD15 100%)"
                  : user?.personality?.type == "Mystic Wizard"
                  ? "linear-gradient(270deg, #FFFFFF 0%, #1BC1EE 50%, #2D4ED4 100%)"
                  : user?.personality?.type == "Action Monkey"
                  ? "linear-gradient(270deg, #FFFFFF 0%, #AADB89 50%, #518E18 100%)"
                  : "linear-gradient(270deg, #FFFFFF 0%, rgba(142, 149, 169, 0.811765) 50%, #888888 100%)",
              borderRadius: 4,
              flex: 1,
            }}
          >
            <img
              className="fade-in"
              src={
                user?.personality?.type == "Romantic Warrior"
                  ? RomanticWarriorIcon
                  : user?.personality?.type == "Drama Queen"
                  ? DramaQueenIcon
                  : user?.personality?.type == "Comic Sans"
                  ? ComicSansIcon
                  : user?.personality?.type == "Mystic Wizard"
                  ? MysticWizardIcon
                  : user?.personality?.type == "Action Monkey"
                  ? ActionMonkeyIcon
                  : PerfectHarmonyIcon
              }
              width={28}
              alt="character icon"
            />
            <Typography
              className="fade-in"
              color={"#fff"}
              fontWeight={"medium"}
              fontSize={24}
              textTransform={"uppercase"}
            >
              {user?.personality?.type}
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pl={8}
          pr={4}
          mt={4}
        >
          <Box
            className="fade-in-ltr"
            display={"flex"}
            alignItems={"center"}
            gap={4}
          >
            <ColumnBox
              alignItems="center"
              gap={1}
              position="relative"
              minWidth={150}
            >
              <Typography
                fontWeight={"bold"}
                textAlign={"center"}
                sx={{
                  position: "absolute",
                  top: -40,
                  width: 150,
                }}
              >
                TOP GENRE
              </Typography>
              <img
                src={
                  user?.personality?.type == "Drama Queen"
                    ? DramaImg
                    : user?.personality?.type == "Action Monkey"
                    ? ActionImg
                    : user?.personality?.type == "Comic Sans"
                    ? ComedyImg
                    : user?.personality?.type == "Mystic Wizard"
                    ? MysticWizard
                    : user?.personality?.type == "Romantic Warrior"
                    ? RomanticImg
                    : QuestionImg
                }
                width={125}
                alt="metric"
                style={{
                  borderRadius: 24,
                }}
              />
            </ColumnBox>
            <ColumnBox
              alignItems="center"
              gap={1}
              position="relative"
              minWidth={150}
            >
              <Typography
                textAlign={"center"}
                fontWeight={"bold"}
                sx={{
                  position: "absolute",
                  top: -50,
                  width: 150,
                }}
              >
                YOUR LEAST <br /> FAVORITE GENRE
              </Typography>
              <img
                src={
                  leastFavoriteGenre == 0
                    ? RomanticImg
                    : leastFavoriteGenre == 1
                    ? DramaImg
                    : leastFavoriteGenre == 2
                    ? ComedyImg
                    : leastFavoriteGenre == 3
                    ? MysteryImg
                    : leastFavoriteGenre == 4
                    ? ActionImg
                    : QuestionImg
                }
                width={125}
                alt="metric"
                style={{
                  borderRadius: 24,
                }}
              />
            </ColumnBox>
            <ColumnBox
              alignItems="center"
              gap={1}
              position="relative"
              minWidth={150}
            >
              <Typography
                fontWeight={"bold"}
                textAlign={"center"}
                sx={{
                  position: "absolute",
                  top: -47,
                  width: 150,
                  lineHeight: 1.25,
                }}
              >
                YOUR FAVORITE METRIC
              </Typography>
              <img
                src={
                  user?.personality?.favoriteMetric == "Emotional Impact"
                    ? EmotionalImpactImg
                    : user?.personality?.favoriteMetric ==
                      "Visual and Technical Elements"
                    ? VisualTechnicalElementsImg
                    : FluidityImg
                }
                width={125}
                alt="metric"
                style={{
                  borderRadius: 24,
                }}
              />
            </ColumnBox>
          </Box>
          <img
            className="fade-in-rtl"
            src={
              user?.personality?.type == "Romantic Warrior"
                ? RomanticWarrior
                : user?.personality?.type == "Drama Queen"
                ? DramaQueen
                : user?.personality?.type == "Comic Sans"
                ? ComicSans
                : user?.personality?.type == "Mystic Wizard"
                ? MysticWizard
                : user?.personality?.type == "Action Monkey"
                ? ActionMonkey
                : PerfectHarmony
            }
            width={250}
            alt="character image"
            style={{ borderRadius: 40 }}
          />
        </Grid>
        {!!movieRecommendations && (
          <Grid item xs={12} mt={8} px={8}>
            <Typography fontSize={20} fontWeight={"bold"}>
              {user?.personality?.type}'s Recommendations
            </Typography>
            <Typography>
              Here are some customized movie recommendations for you! Moviemate
              will get the best movies after analyzing your movie taste.
            </Typography>
            <Grid container mt={1} pl={2} spacing={4}>
              {movieRecommendations?.map((movie) => (
                <MovieItem key={movie?.id} movie={movie} />
              ))}
            </Grid>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          my={8}
          sx={{
            background: `url(${Banner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          px={12}
          height={240}
        >
          <ColumnBox>
            <Typography
              fontSize={24}
              fontWeight={"bold"}
              color={"#fff"}
              textAlign={"center"}
            >
              Hey {user?.personality?.type}!
            </Typography>
            <Typography
              color={"#fff"}
              fontWeight={"light"}
              textAlign={"center"}
            >
              Find compatible friends and start a conversation.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/match")}
              sx={{
                borderRadius: 99,
                py: 1,
                px: 4,
                mt: 1,
                fontSize: 18,
                alignSelf: "center",
              }}
            >
              MATCH
            </Button>
          </ColumnBox>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default YourType;
