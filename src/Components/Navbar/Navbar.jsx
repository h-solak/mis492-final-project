import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePopover from "./ProfilePopover";
import { removeAccessToken } from "../../api/config";
import useUser from "../../Contexts/User/useUser";
import { Chat, HomeRounded, Poll } from "@mui/icons-material";
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
        borderBottom: 2,
        borderColor: "secondary.light",
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0)",
        backdropFilter: "blur(5px)",
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
      {/* Center Links */}

      <Box display={"flex"} alignItems={"center"} gap={4}>
        <Link to={"/"}>
          <IconButton>
            <HomeRounded
              sx={{
                fontSize: 32,
              }}
            />
          </IconButton>
        </Link>
        <Link to={"/chat"}>
          <IconButton>
            <Chat
              sx={{
                fontSize: 26,
              }}
            />
          </IconButton>
        </Link>
        <Link to={"/character-survey"}>
          <IconButton>
            <Poll
              sx={{
                fontSize: 28,
              }}
            />
          </IconButton>
        </Link>
      </Box>

      {user?._id && <ProfilePopover logout={logout} />}
    </Grid>
  );
};

export default Navbar;
