import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import useUser from "../../Contexts/User/useUser";
import RomanticWarrior from "../../assets/images/characters/romanticwarrior.jpeg";
import DramaQueen from "../../assets/images/characters/dramaqueen.jpeg";
import ComicSans from "../../assets/images/characters/comicsans.jpeg";
import MysticWizard from "../../assets/images/characters/mysticwizard.jpeg";
import ActionMonkey from "../../assets/images/characters/actionmonkey.jpeg";
import PerfectHarmony from "../../assets/images/characters/perfectharmony.jpg";
import ColumnBox from "../../Components/ColumnBox";
import { matchUser } from "../../Services/Match";
import { getProfileUser, getProfileUserUsingId } from "../../Services/User";
import Avatar from "../../Components/Avatar";
import getCharacterColor from "../../Utilities/getCharacterColor";
import CountdownTimer from "./Components/Countdown";
import toast from "react-hot-toast";
import { getChatIdByUserId } from "../../Services/Chat";

const Match = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [genderFilter, setGenderFilter] = useState("none");
  const [ageSlider, setAgeSlider] = useState([18, 30]);
  const [currentMatch, setCurrentMatch] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const lastMatch = user?.friends
    .filter((friend) => friend?.type == "match")
    .slice(-1)[0];

  useEffect(() => {
    handleUserHasActiveMatch();
  }, []);

  const handleAgeSliderChange = (event, newValue, activeThumb) => {
    const minDistance = 1;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setAgeSlider([
        Math.min(newValue[0], ageSlider[1] - minDistance),
        ageSlider[1],
      ]);
    } else {
      setAgeSlider([
        ageSlider[0],
        Math.max(newValue[1], ageSlider[0] + minDistance),
      ]);
    }
  };

  const handleUserHasActiveMatch = async () => {
    setPageLoading(true);
    function hasTwoWeeksPassed(dateString) {
      if (!dateString) return false;
      const inputDate = new Date(dateString);
      const twoWeeksAfter = new Date(
        inputDate.getTime() + 2 * 7 * 24 * 60 * 60 * 1000
      );
      const currentDate = new Date();
      return currentDate > twoWeeksAfter;
    }

    if (!hasTwoWeeksPassed(lastMatch?.matchDate)) {
      const crrActiveMatch = await getProfileUserUsingId(lastMatch?.id);
      setCurrentMatch(crrActiveMatch);
    }
    setPageLoading(false);
  };

  const lastMatchDate = user?.friends
    .filter((friend) => friend?.type == "match")
    .slice(-1)[0]?.matchDate;

  const handleMatchUser = async () => {
    const newMatch = await matchUser();
    if (newMatch?._id) {
      window.location.reload();
    } else {
      toast.error("No match found! Please try again later!");
    }
  };

  const handleSendMessage = async () => {
    //SHOULD CREATE CHAT AND SET THE FIRST MESSAGE TO ***YOU ARE A MATCH***
    const chatId = await getChatIdByUserId(currentMatch?._id, true);
    if (chatId) {
      navigate(`/chat?chatId=${chatId}`);
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout pageLoading={pageLoading}>
      <Breadcrumbs
        links={[
          {
            title: `Match`,
            url: `/match`,
          },
        ]}
      />
      <Grid container>
        <Grid item xs={12}>
          <Typography fontSize={20} fontWeight={"medium"}>
            Match
          </Typography>
          <Typography>
            Find friends with similar movie taste. Don’t forget that you can
            only match with one person in a week. If you have made a match
            before this week please come back later :)
          </Typography>
        </Grid>
        {!user?.personality?.type?.length > 0 ? (
          <Grid
            container
            mt={6}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 8,
              position: "relative",
            }}
          >
            <Box position={"absolute"} left={-6} top={-32}>
              <svg
                width="87"
                height="87"
                viewBox="0 0 87 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_416_152)">
                  <path
                    d="M67.9173 9.19585L5.30078 26.4414L19 76.1816L81.6165 58.936L67.9173 9.19585Z"
                    fill="#F9F9F9"
                  />
                  <path
                    d="M67.4516 7.7129L36.9333 16.1181L31.5268 17.6071L3.97761 25.1946C3.07197 25.444 2.53936 26.3815 2.78899 27.2879L7.19027 43.2684L16.544 77.2306C16.7936 78.137 17.7309 78.6689 18.6365 78.4194L46.185 70.8322L51.5915 69.3431L82.1098 60.9379C83.0162 60.6883 83.548 59.751 83.2986 58.8453L73.9449 24.8832L69.5436 8.90267C69.2948 7.99608 68.3573 7.46347 67.4516 7.7129ZM34.1489 21.2228C34.0202 20.7555 34.2949 20.2721 34.7622 20.1434L37.8107 19.3038L38.5695 19.0949C39.0367 18.9662 39.5201 19.2408 39.6488 19.7081L40.6974 23.5154C40.8261 23.9826 40.5515 24.4661 40.0842 24.5948L39.3254 24.8037L36.2769 25.6433C35.8096 25.772 35.3262 25.4974 35.1975 25.0301L34.1489 21.2228ZM25.0821 23.72C24.9534 23.2527 25.228 22.7693 25.6953 22.6406L29.5026 21.592C29.9699 21.4633 30.4533 21.7379 30.582 22.2052L31.6306 26.0125C31.7593 26.4798 31.4846 26.9632 31.0173 27.0919L27.2101 28.1405C26.7428 28.2692 26.2594 27.9946 26.1307 27.5273L25.0821 23.72ZM25.1792 72.2796C25.3079 72.7469 25.0333 73.2303 24.566 73.359L20.7587 74.4076C20.2914 74.5363 19.808 74.2617 19.6793 73.7944L18.6307 69.9871C18.502 69.5198 18.7766 69.0364 19.2439 68.9077L23.0512 67.8591C23.5185 67.7304 24.0019 68.005 24.1306 68.4723L25.1792 72.2796ZM13.7898 30.9261C13.9185 31.3934 13.6439 31.8768 13.1766 32.0055L9.36931 33.0541C8.90202 33.1828 8.41861 32.9082 8.28991 32.4409L7.24133 28.6336C7.11263 28.1663 7.38726 27.6829 7.85455 27.5542L11.6618 26.5056C12.1291 26.3769 12.6125 26.6516 12.7412 27.1188L13.7898 30.9261ZM34.0992 69.8229C34.2279 70.2902 33.9533 70.7736 33.486 70.9023L29.6787 71.9509C29.2114 72.0796 28.728 71.8049 28.5993 71.3377L27.5507 67.5304C27.422 67.0631 27.6966 66.5797 28.1639 66.451L31.9712 65.4024C32.4385 65.2737 32.9219 65.5483 33.0506 66.0156L34.0992 69.8229ZM22.7098 28.4694C22.8385 28.9367 22.5639 29.4201 22.0966 29.5488L18.2893 30.5974C17.822 30.7261 17.3386 30.4515 17.2099 29.9842L16.1613 26.1769C16.0326 25.7096 16.3073 25.2262 16.7746 25.0975L20.5818 24.0489C21.0491 23.9202 21.5325 24.1949 21.6612 24.6621L22.7098 28.4694ZM43.0192 67.3662C43.1479 67.8335 42.8733 68.3169 42.406 68.4456L38.5987 69.4942C38.1314 69.6229 37.648 69.3482 37.5193 68.881L36.4707 65.0737C36.342 64.6064 36.6167 64.123 37.0839 63.9943L40.8912 62.9457C41.3585 62.817 41.8419 63.0916 41.9706 63.5589L43.0192 67.3662ZM39.8687 53.7336C39.2579 54.3527 38.2051 54.0793 37.9741 53.2404L33.4798 36.9224C33.2488 36.0835 34.0122 35.3091 34.8547 35.5287L51.2332 39.7957C52.0748 40.0148 52.3637 41.0636 51.7531 41.6834L39.8687 53.7336ZM52.0861 64.869C52.2148 65.3363 51.9401 65.8197 51.4728 65.9484L50.7141 66.1574L47.6656 66.997C47.1983 67.1257 46.7149 66.8511 46.5862 66.3838L45.5376 62.5765C45.4089 62.1092 45.6835 61.6258 46.1508 61.4971L49.1993 60.6575L49.9581 60.4485C50.4254 60.3198 50.9088 60.5945 51.0375 61.0618L52.0861 64.869ZM61.0061 62.4123C61.1348 62.8796 60.8601 63.363 60.3928 63.4917L56.5856 64.5403C56.1183 64.669 55.6349 64.3944 55.5062 63.9271L54.4576 60.1198C54.3289 59.6525 54.6035 59.1691 55.0708 59.0404L58.8781 57.9918C59.3454 57.8631 59.8288 58.1378 59.9575 58.6051L61.0061 62.4123ZM49.6167 21.0589C49.7454 21.5261 49.4708 22.0096 49.0035 22.1383L45.1962 23.1868C44.7289 23.3155 44.2455 23.0409 44.1168 22.5736L43.0682 18.7663C42.9395 18.299 43.2141 17.8156 43.6814 17.6869L47.4887 16.6384C47.956 16.5097 48.4394 16.7843 48.5681 17.2516L49.6167 21.0589ZM69.9268 59.9554C70.0555 60.4227 69.7809 60.9061 69.3136 61.0348L65.5063 62.0834C65.039 62.2121 64.5556 61.9375 64.4269 61.4702L63.3783 57.6629C63.2496 57.1956 63.5243 56.7122 63.9916 56.5835L67.7988 55.5349C68.2661 55.4062 68.7495 55.6809 68.8782 56.1481L69.9268 59.9554ZM58.5374 18.6019C58.6661 19.0692 58.3915 19.5526 57.9242 19.6813L54.1169 20.7299C53.6496 20.8586 53.1662 20.584 53.0375 20.1167L51.989 16.3094C51.8603 15.8421 52.1349 15.3587 52.6022 15.23L56.4095 14.1814C56.8767 14.0527 57.3602 14.3274 57.4889 14.7947L58.5374 18.6019ZM78.8468 57.4987C78.9755 57.966 78.7009 58.4494 78.2336 58.5781L74.4263 59.6267C73.959 59.7554 73.4756 59.4808 73.3469 59.0135L72.2983 55.2062C72.1696 54.7389 72.4443 54.2555 72.9116 54.1268L76.7188 53.0782C77.1861 52.9495 77.6695 53.2241 77.7982 53.6914L78.8468 57.4987ZM67.4574 16.1452C67.5861 16.6125 67.3115 17.0959 66.8442 17.2246L63.0369 18.2732C62.5696 18.4019 62.0862 18.1273 61.9575 17.66L60.909 13.8527C60.7803 13.3854 61.0549 12.902 61.5222 12.7733L65.3295 11.7247C65.7967 11.596 66.2802 11.8707 66.4089 12.338L67.4574 16.1452Z"
                    fill="#D22215"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_416_152">
                    <rect
                      width="70.0897"
                      height="70.0897"
                      fill="white"
                      transform="translate(0 18.6113) rotate(-15.3984)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Grid item xs={12} md={6} textAlign={"center"} px={8} py={16}>
              <Typography fontSize={24} fontWeight={"medium"}>
                We Can’t Match You Right Now!
              </Typography>
              <Typography mt={4}>
                We can't match you with someone yet because we don't know your
                personality.
                <br />
                <br />
                Complete the MovieMate Personality quiz and start matching!
              </Typography>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/match/personality-test")}
                sx={{
                  alignSelf: "end",
                  px: 8,
                  py: 1.5,
                  borderRadius: 99,
                  mt: 4,
                }}
              >
                {" "}
                Start The Quiz
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              py={16}
              sx={{
                height: "100%",
                borderRadius: "0 32px 32px 0",
                background:
                  "linear-gradient(180deg, #141d54 0%, #ff0000 48.4%, #141d54 100%)",
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"hidden"}
              position={"relative"}
            >
              <img
                src={RomanticWarrior}
                width={150}
                style={{ borderRadius: 40, marginRight: -16 }}
                alt="character"
              />
              <img
                src={DramaQueen}
                width={150}
                style={{ borderRadius: 40 }}
                alt="character"
              />
              <img
                src={ComicSans}
                width={150}
                style={{ borderRadius: 40 }}
                alt="character"
              />
              <img
                src={MysticWizard}
                width={150}
                style={{ borderRadius: 40 }}
                alt="character"
              />
              <img
                src={ActionMonkey}
                width={150}
                style={{ borderRadius: 40 }}
                alt="character"
              />
              <Typography
                color={"#fff"}
                textAlign={"center"}
                position={"absolute"}
                bottom={32}
              >
                you are <br />
                <Typography
                  variant="span"
                  fontSize={24}
                  color={"#fff"}
                  fontWeight={"medium"}
                >
                  ?
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        ) : currentMatch?._id && lastMatch?.sender == user?._id ? (
          // has a character and a current match
          <Grid
            container
            mt={6}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 8,
              position: "relative",
            }}
          >
            <Box position={"absolute"} left={-6} top={-32}>
              <svg
                width="87"
                height="87"
                viewBox="0 0 87 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_416_152)">
                  <path
                    d="M67.9173 9.19585L5.30078 26.4414L19 76.1816L81.6165 58.936L67.9173 9.19585Z"
                    fill="#F9F9F9"
                  />
                  <path
                    d="M67.4516 7.7129L36.9333 16.1181L31.5268 17.6071L3.97761 25.1946C3.07197 25.444 2.53936 26.3815 2.78899 27.2879L7.19027 43.2684L16.544 77.2306C16.7936 78.137 17.7309 78.6689 18.6365 78.4194L46.185 70.8322L51.5915 69.3431L82.1098 60.9379C83.0162 60.6883 83.548 59.751 83.2986 58.8453L73.9449 24.8832L69.5436 8.90267C69.2948 7.99608 68.3573 7.46347 67.4516 7.7129ZM34.1489 21.2228C34.0202 20.7555 34.2949 20.2721 34.7622 20.1434L37.8107 19.3038L38.5695 19.0949C39.0367 18.9662 39.5201 19.2408 39.6488 19.7081L40.6974 23.5154C40.8261 23.9826 40.5515 24.4661 40.0842 24.5948L39.3254 24.8037L36.2769 25.6433C35.8096 25.772 35.3262 25.4974 35.1975 25.0301L34.1489 21.2228ZM25.0821 23.72C24.9534 23.2527 25.228 22.7693 25.6953 22.6406L29.5026 21.592C29.9699 21.4633 30.4533 21.7379 30.582 22.2052L31.6306 26.0125C31.7593 26.4798 31.4846 26.9632 31.0173 27.0919L27.2101 28.1405C26.7428 28.2692 26.2594 27.9946 26.1307 27.5273L25.0821 23.72ZM25.1792 72.2796C25.3079 72.7469 25.0333 73.2303 24.566 73.359L20.7587 74.4076C20.2914 74.5363 19.808 74.2617 19.6793 73.7944L18.6307 69.9871C18.502 69.5198 18.7766 69.0364 19.2439 68.9077L23.0512 67.8591C23.5185 67.7304 24.0019 68.005 24.1306 68.4723L25.1792 72.2796ZM13.7898 30.9261C13.9185 31.3934 13.6439 31.8768 13.1766 32.0055L9.36931 33.0541C8.90202 33.1828 8.41861 32.9082 8.28991 32.4409L7.24133 28.6336C7.11263 28.1663 7.38726 27.6829 7.85455 27.5542L11.6618 26.5056C12.1291 26.3769 12.6125 26.6516 12.7412 27.1188L13.7898 30.9261ZM34.0992 69.8229C34.2279 70.2902 33.9533 70.7736 33.486 70.9023L29.6787 71.9509C29.2114 72.0796 28.728 71.8049 28.5993 71.3377L27.5507 67.5304C27.422 67.0631 27.6966 66.5797 28.1639 66.451L31.9712 65.4024C32.4385 65.2737 32.9219 65.5483 33.0506 66.0156L34.0992 69.8229ZM22.7098 28.4694C22.8385 28.9367 22.5639 29.4201 22.0966 29.5488L18.2893 30.5974C17.822 30.7261 17.3386 30.4515 17.2099 29.9842L16.1613 26.1769C16.0326 25.7096 16.3073 25.2262 16.7746 25.0975L20.5818 24.0489C21.0491 23.9202 21.5325 24.1949 21.6612 24.6621L22.7098 28.4694ZM43.0192 67.3662C43.1479 67.8335 42.8733 68.3169 42.406 68.4456L38.5987 69.4942C38.1314 69.6229 37.648 69.3482 37.5193 68.881L36.4707 65.0737C36.342 64.6064 36.6167 64.123 37.0839 63.9943L40.8912 62.9457C41.3585 62.817 41.8419 63.0916 41.9706 63.5589L43.0192 67.3662ZM39.8687 53.7336C39.2579 54.3527 38.2051 54.0793 37.9741 53.2404L33.4798 36.9224C33.2488 36.0835 34.0122 35.3091 34.8547 35.5287L51.2332 39.7957C52.0748 40.0148 52.3637 41.0636 51.7531 41.6834L39.8687 53.7336ZM52.0861 64.869C52.2148 65.3363 51.9401 65.8197 51.4728 65.9484L50.7141 66.1574L47.6656 66.997C47.1983 67.1257 46.7149 66.8511 46.5862 66.3838L45.5376 62.5765C45.4089 62.1092 45.6835 61.6258 46.1508 61.4971L49.1993 60.6575L49.9581 60.4485C50.4254 60.3198 50.9088 60.5945 51.0375 61.0618L52.0861 64.869ZM61.0061 62.4123C61.1348 62.8796 60.8601 63.363 60.3928 63.4917L56.5856 64.5403C56.1183 64.669 55.6349 64.3944 55.5062 63.9271L54.4576 60.1198C54.3289 59.6525 54.6035 59.1691 55.0708 59.0404L58.8781 57.9918C59.3454 57.8631 59.8288 58.1378 59.9575 58.6051L61.0061 62.4123ZM49.6167 21.0589C49.7454 21.5261 49.4708 22.0096 49.0035 22.1383L45.1962 23.1868C44.7289 23.3155 44.2455 23.0409 44.1168 22.5736L43.0682 18.7663C42.9395 18.299 43.2141 17.8156 43.6814 17.6869L47.4887 16.6384C47.956 16.5097 48.4394 16.7843 48.5681 17.2516L49.6167 21.0589ZM69.9268 59.9554C70.0555 60.4227 69.7809 60.9061 69.3136 61.0348L65.5063 62.0834C65.039 62.2121 64.5556 61.9375 64.4269 61.4702L63.3783 57.6629C63.2496 57.1956 63.5243 56.7122 63.9916 56.5835L67.7988 55.5349C68.2661 55.4062 68.7495 55.6809 68.8782 56.1481L69.9268 59.9554ZM58.5374 18.6019C58.6661 19.0692 58.3915 19.5526 57.9242 19.6813L54.1169 20.7299C53.6496 20.8586 53.1662 20.584 53.0375 20.1167L51.989 16.3094C51.8603 15.8421 52.1349 15.3587 52.6022 15.23L56.4095 14.1814C56.8767 14.0527 57.3602 14.3274 57.4889 14.7947L58.5374 18.6019ZM78.8468 57.4987C78.9755 57.966 78.7009 58.4494 78.2336 58.5781L74.4263 59.6267C73.959 59.7554 73.4756 59.4808 73.3469 59.0135L72.2983 55.2062C72.1696 54.7389 72.4443 54.2555 72.9116 54.1268L76.7188 53.0782C77.1861 52.9495 77.6695 53.2241 77.7982 53.6914L78.8468 57.4987ZM67.4574 16.1452C67.5861 16.6125 67.3115 17.0959 66.8442 17.2246L63.0369 18.2732C62.5696 18.4019 62.0862 18.1273 61.9575 17.66L60.909 13.8527C60.7803 13.3854 61.0549 12.902 61.5222 12.7733L65.3295 11.7247C65.7967 11.596 66.2802 11.8707 66.4089 12.338L67.4574 16.1452Z"
                    fill="#D22215"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_416_152">
                    <rect
                      width="70.0897"
                      height="70.0897"
                      fill="white"
                      transform="translate(0 18.6113) rotate(-15.3984)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Grid
              item
              xs={12}
              md={6}
              px={8}
              pt={12}
              pb={8}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              gap={8}
              textAlign={"center"}
            >
              <Typography fontSize={20} fontWeight={"bold"}>
                Here Is Your Match For The Week!
              </Typography>
              <ColumnBox>
                <Typography mb={2}>
                  You can match with someone new in
                </Typography>
                <CountdownTimer initialDate={lastMatchDate} />
              </ColumnBox>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              py={8}
              className="red-to-bg"
              sx={{
                height: "100%",
                borderRadius: "0 32px 32px 0",
                background:
                  "linear-gradient(180deg, #ff4444 0%, #fdcccc 48.4%, #ffffff 100%)",
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"hidden"}
              position={"relative"}
            >
              <ColumnBox alignItems="center" gap={3}>
                <Avatar
                  name={currentMatch?.username}
                  size={200}
                  isMatched={true}
                />
                <ColumnBox alignItems="center" gap={0.5}>
                  <Link to={`/profile/${currentMatch?.username}`}>
                    <Typography fontWeight={"medium"}>
                      @{currentMatch?.username}
                    </Typography>
                  </Link>
                  <Typography
                    color={getCharacterColor(currentMatch?.personality?.type)}
                    fontWeight={"bold"}
                    sx={{
                      background: "#fff",
                      px: 2,
                      py: 0.5,
                      borderRadius: 99,
                    }}
                  >
                    {currentMatch?.personality?.type}
                  </Typography>
                  <Typography>
                    {currentMatch?.age}{" "}
                    <Typography
                      variant="span"
                      fontSize={20}
                      fontWeight={"bolder"}
                      mx={1}
                    >
                      ·
                    </Typography>{" "}
                    {currentMatch?.gender}
                  </Typography>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={handleSendMessage}
                    sx={{
                      alignSelf: "self-start",
                      px: 8,
                      py: 1.5,
                      borderRadius: 99,
                      mt: 8,
                    }}
                  >
                    Start Chat
                  </Button>
                </ColumnBox>
              </ColumnBox>
            </Grid>
          </Grid>
        ) : (
          // Has a character & no current match (not a sender)
          <Grid
            container
            mt={6}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 8,
              position: "relative",
            }}
          >
            <Box position={"absolute"} left={-6} top={-32}>
              <svg
                width="87"
                height="87"
                viewBox="0 0 87 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_416_152)">
                  <path
                    d="M67.9173 9.19585L5.30078 26.4414L19 76.1816L81.6165 58.936L67.9173 9.19585Z"
                    fill="#F9F9F9"
                  />
                  <path
                    d="M67.4516 7.7129L36.9333 16.1181L31.5268 17.6071L3.97761 25.1946C3.07197 25.444 2.53936 26.3815 2.78899 27.2879L7.19027 43.2684L16.544 77.2306C16.7936 78.137 17.7309 78.6689 18.6365 78.4194L46.185 70.8322L51.5915 69.3431L82.1098 60.9379C83.0162 60.6883 83.548 59.751 83.2986 58.8453L73.9449 24.8832L69.5436 8.90267C69.2948 7.99608 68.3573 7.46347 67.4516 7.7129ZM34.1489 21.2228C34.0202 20.7555 34.2949 20.2721 34.7622 20.1434L37.8107 19.3038L38.5695 19.0949C39.0367 18.9662 39.5201 19.2408 39.6488 19.7081L40.6974 23.5154C40.8261 23.9826 40.5515 24.4661 40.0842 24.5948L39.3254 24.8037L36.2769 25.6433C35.8096 25.772 35.3262 25.4974 35.1975 25.0301L34.1489 21.2228ZM25.0821 23.72C24.9534 23.2527 25.228 22.7693 25.6953 22.6406L29.5026 21.592C29.9699 21.4633 30.4533 21.7379 30.582 22.2052L31.6306 26.0125C31.7593 26.4798 31.4846 26.9632 31.0173 27.0919L27.2101 28.1405C26.7428 28.2692 26.2594 27.9946 26.1307 27.5273L25.0821 23.72ZM25.1792 72.2796C25.3079 72.7469 25.0333 73.2303 24.566 73.359L20.7587 74.4076C20.2914 74.5363 19.808 74.2617 19.6793 73.7944L18.6307 69.9871C18.502 69.5198 18.7766 69.0364 19.2439 68.9077L23.0512 67.8591C23.5185 67.7304 24.0019 68.005 24.1306 68.4723L25.1792 72.2796ZM13.7898 30.9261C13.9185 31.3934 13.6439 31.8768 13.1766 32.0055L9.36931 33.0541C8.90202 33.1828 8.41861 32.9082 8.28991 32.4409L7.24133 28.6336C7.11263 28.1663 7.38726 27.6829 7.85455 27.5542L11.6618 26.5056C12.1291 26.3769 12.6125 26.6516 12.7412 27.1188L13.7898 30.9261ZM34.0992 69.8229C34.2279 70.2902 33.9533 70.7736 33.486 70.9023L29.6787 71.9509C29.2114 72.0796 28.728 71.8049 28.5993 71.3377L27.5507 67.5304C27.422 67.0631 27.6966 66.5797 28.1639 66.451L31.9712 65.4024C32.4385 65.2737 32.9219 65.5483 33.0506 66.0156L34.0992 69.8229ZM22.7098 28.4694C22.8385 28.9367 22.5639 29.4201 22.0966 29.5488L18.2893 30.5974C17.822 30.7261 17.3386 30.4515 17.2099 29.9842L16.1613 26.1769C16.0326 25.7096 16.3073 25.2262 16.7746 25.0975L20.5818 24.0489C21.0491 23.9202 21.5325 24.1949 21.6612 24.6621L22.7098 28.4694ZM43.0192 67.3662C43.1479 67.8335 42.8733 68.3169 42.406 68.4456L38.5987 69.4942C38.1314 69.6229 37.648 69.3482 37.5193 68.881L36.4707 65.0737C36.342 64.6064 36.6167 64.123 37.0839 63.9943L40.8912 62.9457C41.3585 62.817 41.8419 63.0916 41.9706 63.5589L43.0192 67.3662ZM39.8687 53.7336C39.2579 54.3527 38.2051 54.0793 37.9741 53.2404L33.4798 36.9224C33.2488 36.0835 34.0122 35.3091 34.8547 35.5287L51.2332 39.7957C52.0748 40.0148 52.3637 41.0636 51.7531 41.6834L39.8687 53.7336ZM52.0861 64.869C52.2148 65.3363 51.9401 65.8197 51.4728 65.9484L50.7141 66.1574L47.6656 66.997C47.1983 67.1257 46.7149 66.8511 46.5862 66.3838L45.5376 62.5765C45.4089 62.1092 45.6835 61.6258 46.1508 61.4971L49.1993 60.6575L49.9581 60.4485C50.4254 60.3198 50.9088 60.5945 51.0375 61.0618L52.0861 64.869ZM61.0061 62.4123C61.1348 62.8796 60.8601 63.363 60.3928 63.4917L56.5856 64.5403C56.1183 64.669 55.6349 64.3944 55.5062 63.9271L54.4576 60.1198C54.3289 59.6525 54.6035 59.1691 55.0708 59.0404L58.8781 57.9918C59.3454 57.8631 59.8288 58.1378 59.9575 58.6051L61.0061 62.4123ZM49.6167 21.0589C49.7454 21.5261 49.4708 22.0096 49.0035 22.1383L45.1962 23.1868C44.7289 23.3155 44.2455 23.0409 44.1168 22.5736L43.0682 18.7663C42.9395 18.299 43.2141 17.8156 43.6814 17.6869L47.4887 16.6384C47.956 16.5097 48.4394 16.7843 48.5681 17.2516L49.6167 21.0589ZM69.9268 59.9554C70.0555 60.4227 69.7809 60.9061 69.3136 61.0348L65.5063 62.0834C65.039 62.2121 64.5556 61.9375 64.4269 61.4702L63.3783 57.6629C63.2496 57.1956 63.5243 56.7122 63.9916 56.5835L67.7988 55.5349C68.2661 55.4062 68.7495 55.6809 68.8782 56.1481L69.9268 59.9554ZM58.5374 18.6019C58.6661 19.0692 58.3915 19.5526 57.9242 19.6813L54.1169 20.7299C53.6496 20.8586 53.1662 20.584 53.0375 20.1167L51.989 16.3094C51.8603 15.8421 52.1349 15.3587 52.6022 15.23L56.4095 14.1814C56.8767 14.0527 57.3602 14.3274 57.4889 14.7947L58.5374 18.6019ZM78.8468 57.4987C78.9755 57.966 78.7009 58.4494 78.2336 58.5781L74.4263 59.6267C73.959 59.7554 73.4756 59.4808 73.3469 59.0135L72.2983 55.2062C72.1696 54.7389 72.4443 54.2555 72.9116 54.1268L76.7188 53.0782C77.1861 52.9495 77.6695 53.2241 77.7982 53.6914L78.8468 57.4987ZM67.4574 16.1452C67.5861 16.6125 67.3115 17.0959 66.8442 17.2246L63.0369 18.2732C62.5696 18.4019 62.0862 18.1273 61.9575 17.66L60.909 13.8527C60.7803 13.3854 61.0549 12.902 61.5222 12.7733L65.3295 11.7247C65.7967 11.596 66.2802 11.8707 66.4089 12.338L67.4574 16.1452Z"
                    fill="#D22215"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_416_152">
                    <rect
                      width="70.0897"
                      height="70.0897"
                      fill="white"
                      transform="translate(0 18.6113) rotate(-15.3984)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Grid
              item
              xs={12}
              md={6}
              px={8}
              pt={12}
              pb={8}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <FormControl>
                <FormLabel
                  sx={{
                    textAlign: "start",
                    fontWeight: "medium",
                    color: "#000",
                  }}
                >
                  I am looking for a
                </FormLabel>
                <RadioGroup
                  row
                  defaultValue="female"
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="Doesn't matter"
                  />
                </RadioGroup>
              </FormControl>
              <ColumnBox textAlign="start" mt={8}>
                <Typography mb={2} fontWeight={"medium"}>
                  Within age range
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={0.5}>
                  <Typography>{ageSlider[0]}</Typography>
                  <Slider
                    getAriaLabel={() => "Minimum Range"}
                    value={ageSlider}
                    onChange={handleAgeSliderChange}
                    valueLabelDisplay="auto"
                  />
                  <Typography>{ageSlider[1]}</Typography>
                </Box>
              </ColumnBox>
              <Button
                size="large"
                variant="contained"
                onClick={handleMatchUser}
                sx={{
                  alignSelf: "self-start",
                  px: 8,
                  py: 1.5,
                  borderRadius: 99,
                  mt: 8,
                }}
              >
                Match Now
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              py={16}
              className="red-to-bg"
              sx={{
                height: "100%",
                borderRadius: "0 32px 32px 0",
                background:
                  "linear-gradient(180deg, #ff4444 0%, #fdcccc 48.4%, #ffffff 100%)",
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"hidden"}
              position={"relative"}
            >
              {user?.personality?.type == "Romantic Warrior" ? (
                <img
                  src={RomanticWarrior}
                  width={250}
                  style={{ borderRadius: 40 }}
                  alt="character"
                />
              ) : user?.personality?.type == "Drama Queen" ? (
                <img
                  src={DramaQueen}
                  width={250}
                  style={{ borderRadius: 40 }}
                  alt="character"
                />
              ) : user?.personality?.type == "Comic Sans" ? (
                <img
                  src={ComicSans}
                  width={250}
                  style={{ borderRadius: 40 }}
                  alt="character"
                />
              ) : user?.personality?.type == "Mystic Wizard" ? (
                <img
                  src={MysticWizard}
                  width={250}
                  style={{ borderRadius: 40 }}
                  alt="character"
                />
              ) : user?.personality?.type == "Action Monkey" ? (
                <img
                  src={ActionMonkey}
                  width={250}
                  style={{ borderRadius: 40 }}
                  alt="character"
                />
              ) : (
                <img
                  src={PerfectHarmony}
                  width={250}
                  style={{ borderRadius: 40 }}
                  alt="character"
                />
              )}
              <Typography
                textAlign={"center"}
                position={"absolute"}
                bottom={32}
              >
                you are <br />
                <Typography
                  variant="span"
                  fontSize={24}
                  color={"primary.main"}
                  fontWeight={"bold"}
                >
                  {user?.personality?.type}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default Match;
