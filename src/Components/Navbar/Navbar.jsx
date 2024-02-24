import { Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfilePopover from "./ProfilePopover";
import { removeAccessToken } from "../../api/config";
import useUser from "../../Contexts/User/useUser";
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
      height={"80px"}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
      paddingX={4}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer",
        }}
      >
        Movie Matcher
      </Typography>
      {user?._id && <ProfilePopover logout={logout} />}
    </Grid>
  );
};

export default Navbar;
