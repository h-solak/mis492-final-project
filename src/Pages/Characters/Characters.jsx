import React from "react";
import Layout from "../../Layout/Layout";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { Box, Button, Grid, Typography } from "@mui/material";
import ColumnBox from "../../Components/ColumnBox";
import { useNavigate } from "react-router-dom";
import Banner from "../../assets/images/banner.jpeg";
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
import useUser from "../../Contexts/User/useUser";

const Characters = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <Layout disablePaddingX>
      <Grid container>
        <Grid item px={8}>
          <Breadcrumbs
            links={[
              {
                title: `Characters`,
                url: `/characters`,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} px={8}>
          <Typography fontSize={20} fontWeight={"bold"}>
            Character Types
          </Typography>
          <Typography>
            Check out our 5 character types and find your own character by
            taking our quiz.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          my={4}
          sx={{
            background: `url(${Banner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
          gap={2}
          px={6}
          height={120}
        >
          <ColumnBox>
            <Typography fontSize={24} fontWeight={"bold"} color={"#fff"}>
              Find Out Your Type!
            </Typography>
            <Typography color={"#fff"} fontWeight={"light"}>
              Take or retake the quiz to find out your current type.
            </Typography>
          </ColumnBox>
          <Button
            variant="contained"
            onClick={() => navigate("/match/personality-test")}
            sx={{
              borderRadius: 99,
              py: 1.5,
              px: 2,
              fontSize: 18,
            }}
          >
            {user?.personality?.resultMatrix?.length > 0
              ? "Re-take the quiz"
              : "Take the quiz"}
          </Button>
        </Grid>
        {/* Character Type */}
        <Grid item xs={12} display={"flex"} alignItems={"start"}>
          <img
            src={DramaQueen}
            width={225}
            alt="character image"
            style={{
              marginLeft: 64,
              borderRadius: 40,
            }}
          />
          <ColumnBox pl={4}>
            <Box
              px={6}
              py={2}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{
                background:
                  "linear-gradient(270deg, #FFFFFF 0%, rgba(251, 153, 153, 0.5) 50%, rgba(255, 14, 14, 0.8) 100%)",
                borderRadius: 99,
                flex: 1,
              }}
            >
              <img src={DramaQueenIcon} width={28} alt="character icon" />
              <Typography color={"#fff"} fontWeight={"medium"} fontSize={20}>
                DRAMA QUEEN
              </Typography>
            </Box>
            <Typography mt={2} px={6}>
              Hey, if you're someone who digs deep emotional movies that aren't
              afraid to get real, then you're a <b>Drama Queen</b>. You're all
              about those complex characters and real-world issues. Drama's your
              thing!
            </Typography>
          </ColumnBox>
        </Grid>
        {/* Character Type */}
        <Grid item xs={12} display={"flex"} alignItems={"start"} mt={6}>
          <img
            src={ActionMonkey}
            width={225}
            alt="character image"
            style={{
              marginLeft: 64,
              borderRadius: 40,
            }}
          />
          <ColumnBox pl={4}>
            <Box
              px={6}
              py={2}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{
                background:
                  "linear-gradient(270deg, #FFFFFF 0%, #AADB89 50%, #518E18 100%)",
                borderRadius: 99,
                flex: 1,
              }}
            >
              <img src={ActionMonkeyIcon} width={28} alt="character icon" />
              <Typography color={"#fff"} fontWeight={"medium"} fontSize={20}>
                ACTION MONKEY
              </Typography>
            </Box>
            <Typography mt={2} px={6}>
              If you get a kick out of high-speed chases, epic stunts, and
              mind-blowing special effects, then you're an <b>Action Monkey</b>.
              You love living on the edge of your seat with action flicks.
            </Typography>
          </ColumnBox>
        </Grid>
        {/* Character Type */}
        <Grid item xs={12} display={"flex"} alignItems={"start"} mt={6}>
          <img
            src={ComicSans}
            width={225}
            alt="character image"
            style={{
              marginLeft: 64,
              borderRadius: 40,
            }}
          />
          <ColumnBox pl={4}>
            <Box
              px={6}
              py={2}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{
                background:
                  "linear-gradient(270deg, #FDFDF2 0%, #EFD76B 50%, #F4AD15 100%)",
                borderRadius: 99,
                flex: 1,
              }}
            >
              <img src={ComicSansIcon} width={28} alt="character icon" />
              <Typography color={"#fff"} fontWeight={"medium"} fontSize={20}>
                COMIC SANS
              </Typography>
            </Box>
            <Typography mt={2} px={6}>
              If you can't resist a good laugh and always up for a fun time,
              then you're <b>Comic Sans</b>. Comedy's your jam, and you wouldn't
              have it any other way.
            </Typography>
          </ColumnBox>
        </Grid>
        {/* Character Type */}
        <Grid item xs={12} display={"flex"} alignItems={"start"} mt={6}>
          <img
            src={MysticWizard}
            width={225}
            alt="character image"
            style={{
              marginLeft: 64,
              borderRadius: 40,
            }}
          />
          <ColumnBox pl={4}>
            <Box
              px={6}
              py={2}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{
                background:
                  "linear-gradient(270deg, #FFFFFF 0%, #1BC1EE 50%, #2D4ED4 100%)",
                borderRadius: 99,
                flex: 1,
              }}
            >
              <img src={MysticWizardIcon} width={28} alt="character icon" />
              <Typography color={"#fff"} fontWeight={"medium"} fontSize={20}>
                MYSTIC WIZARD
              </Typography>
            </Box>
            <Typography mt={2} px={6}>
              Love stepping into the unknown and the mysterious? Then you're a{" "}
              <b>Mystic Wizard</b>. Thrillers and chills are your go-tos,
              whether it's Sci-Fi or real life based movies.
            </Typography>
          </ColumnBox>
        </Grid>
        {/* Character Type */}
        <Grid item xs={12} display={"flex"} alignItems={"start"} mt={6}>
          <img
            src={RomanticWarrior}
            width={225}
            alt="character image"
            style={{
              marginLeft: 64,
              borderRadius: 40,
            }}
          />
          <ColumnBox pl={4}>
            <Box
              px={6}
              py={2}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{
                background:
                  "linear-gradient(270deg, #FFFFFF 0%, #4A6DCF 50%, #9D0F7A 100%)",
                borderRadius: 99,
                flex: 1,
              }}
            >
              <img src={RomanticWarriorIcon} width={28} alt="character icon" />
              <Typography color={"#fff"} fontWeight={"medium"} fontSize={20}>
                ROMANTIC WARRIOR
              </Typography>
            </Box>
            <Typography mt={2} px={6}>
              If you're a fan of love stories, emotional rollercoasters, and
              heartwarming endings, then you're a <b>Romantic Warrior</b>.
              Romance is your genre, and you're proud of it!
            </Typography>
          </ColumnBox>
        </Grid>
        {/* Character Type */}
        <Grid item xs={12} display={"flex"} alignItems={"start"} mt={6} W>
          <img
            src={PerfectHarmony}
            width={225}
            alt="character image"
            style={{
              marginLeft: 64,
              borderRadius: 40,
            }}
          />
          <ColumnBox
            pl={4}
            sx={{
              flex: 1,
            }}
          >
            <Box
              px={6}
              py={2}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{
                background:
                  "linear-gradient(270deg, #FFFFFF 0%, rgba(142, 149, 169, 0.811765) 50%, #888888 100%)",
                borderRadius: 99,
                flex: 1,
              }}
            >
              <img src={PerfectHarmonyIcon} width={28} alt="character icon" />
              <Typography color={"#fff"} fontWeight={"medium"} fontSize={20}>
                PERFECT HARMONY
              </Typography>
            </Box>
            <Typography mt={2} px={6}>
              If you have a passion for every movie genre, appreciating the
              unique magic each one brings, then you're in{" "}
              <b>Perfect Harmony</b>. Whether it's the thrill of action, the
              intrigue of mystery, the intensity of drama, the charm of romance,
              or the humor of comedy, you embrace them all with equal
              enthusiasm. You see the beauty in every story and savor the
              diverse experiences that movies offer. <b>Perfect Harmony</b> is
              your vibe, and you celebrate the cinematic spectrum in all its
              glory!
            </Typography>
          </ColumnBox>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Characters;
