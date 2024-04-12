import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CameraRoll from "../../assets/images/cameraroll.png";
import Logo from "../../assets/logo.svg";
import CenteredBox from "../../Components/CenteredBox";
import FlexBox from "../../Components/FlexBox";
import ColumnBox from "../../Components/ColumnBox";

//not logged in users will see this
const LandingPage = () => {
  const navigate = useNavigate();
  const isXsScreen = useMediaQuery("(max-width:600px)");

  return (
    <React.Fragment>
      <Grid container marginLeft={isXsScreen ? -16 : -32}>
        <Grid item xs={12} lg={10} xl={9}>
          <img
            src={CameraRoll}
            width={isXsScreen ? "150%" : "120%"}
            height={isXsScreen ? 200 : 400}
            alt="Camera Roll"
            style={{ objectFit: "cover" }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"center"}
        px={4}
        marginTop={isXsScreen ? 0 : -16}
      >
        <Grid item xs={12} sm={12} md={6}>
          <img src={Logo} height={32} alt="Camera Roll" />
          <Typography
            fontWeight={800}
            fontSize={isXsScreen ? 24 : 42}
            lineHeight={1.1}
            marginTop={2}
          >
            WATCH, EXPLORE, MATCH!
          </Typography>
          <Typography marginTop={1}>
            Review the movies you watch using MovieMate, discover your movie
            character and make new friends who love similar movies.
          </Typography>
          <FlexBox gap={1} mt={4} flexDirection={isXsScreen ? "column" : "row"}>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                px: 3,
                borderRadius: 99,
                textTransform: "capitalize",
              }}
              fullWidth={isXsScreen}
            >
              login
            </Button>

            <Button
              color="dark"
              onClick={() => navigate("/login")}
              variant="outlined"
              sx={{
                borderRadius: 99,
                textTransform: "capitalize",
              }}
              fullWidth={isXsScreen}
            >
              register
            </Button>
          </FlexBox>
        </Grid>
      </Grid>

      <Typography
        textAlign={"center"}
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        2024 © MovieMate
      </Typography>
    </React.Fragment>
  );
};

export default LandingPage;
