import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePopover from "./ProfilePopover";
import { removeAccessToken } from "../../api/config";
import useUser from "../../Contexts/User/useUser";
import { Chat, HomeRounded, Movie, Poll } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const logout = async () => {
    removeAccessToken();
    setUser({});
    navigate("/login");
  };
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={"56px"}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(5px)",
        boxShadow:
          "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
      }}
      paddingX={4}
    >
      <Link to="/">
        <Typography
          variant="h5"
          color={"primary"}
          fontWeight={600}
          sx={{
            cursor: "pointer",
          }}
        >
          MovieMate
        </Typography>
      </Link>

      {!user?._id ? null : (
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <ProfilePopover logout={logout} />
        </Box>
      )}
    </Grid>
  );
};

export default Navbar;
