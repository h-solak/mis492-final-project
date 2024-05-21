import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import useUser from "../../Contexts/User/useUser";
import { Box, Grid, Typography } from "@mui/material";
/* icons */
import RomanticWarriorIcon from "../../assets/icons/characters/romanticwarrior.svg";
import DramaQueenIcon from "../../assets/icons/characters/dramaqueen.svg";
import ComicSansIcon from "../../assets/icons/characters/comicsans.svg";
import MysticWizardIcon from "../../assets/icons/characters/mysticwizard.svg";
import ActionMonkeyIcon from "../../assets/icons/characters/actionmonkey.svg";
import PerfectHarmonyIcon from "../../assets/icons/characters/perfectharmony.svg";
/* images */
import RomanticWarrior from "../../assets/images/characters/romanticwarrior.jpeg";
import DramaQueen from "../../assets/images/characters/dramaqueen.jpeg";
import ComicSans from "../../assets/images/characters/comicsans.jpeg";
import MysticWizard from "../../assets/images/characters/mysticwizard.jpeg";
import ActionMonkey from "../../assets/images/characters/actionmonkey.jpeg";
import PerfectHarmony from "../../assets/images/characters/perfectharmony.jpg";
import { discoverMovies } from "../../Services/Tmdb";
import MovieItem from "../../Components/Movie/MovieItem";
import ColumnBox from "../../Components/ColumnBox";
import { useSearchParams } from "react-router-dom";
import CenteredBox from "../../Components/CenteredBox";
import PopcornLoader from "../../assets/animations/popcorn.json";
import Lottie from "lottie-react";

const YourType = () => {
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
    console.log(userMatrix);
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
          <Box display={"flex"} alignItems={"center"} gap={4}>
            <ColumnBox alignItems="center" gap={1}>
              <Typography fontWeight={"bold"}>Top Genre</Typography>
              <img
                src="https://placehold.co/100x100"
                width={100}
                style={{
                  borderRadius: 24,
                }}
              />
            </ColumnBox>
            <ColumnBox alignItems="center" gap={1}>
              <Typography textAlign={"center"} fontWeight={"bold"}>
                YOUR LEAST <br /> FAVORITE GENRE
              </Typography>
              <img
                src="https://placehold.co/100x100"
                width={100}
                style={{
                  borderRadius: 24,
                }}
              />
            </ColumnBox>
            <ColumnBox alignItems="center" gap={1}>
              <Typography fontWeight={"bold"}>Top Genre</Typography>
              <img
                src="https://placehold.co/100x100"
                width={100}
                style={{
                  borderRadius: 24,
                }}
              />
            </ColumnBox>
          </Box>
          <img
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
      </Grid>
    </Layout>
  );
};

export default YourType;
