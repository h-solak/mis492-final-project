import React, { useContext } from "react";
import NowWatchingBgSvg from "../../../assets/backgrounds/nowWatchingRed.svg";
import { Box, Tooltip, Typography } from "@mui/material";
import { ProfileUserContext } from "../Profile";
import useUser from "../../../Contexts/User/useUser";
import { Link } from "react-router-dom";

const ProfileNowWatching = () => {
  const { user } = useUser();
  const { profileUser } = useContext(ProfileUserContext);
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      px={4}
      sx={{
        width: "100%",
        height: 44,
        borderRadius: 6,
        background: `url(${NowWatchingBgSvg})`,
        backgroundSize: "cover",
      }}
    >
      <Typography fontWeight={"medium"}>
        Now Watching{" "}
        <Tooltip title="Visit movie page">
          <Link to={`/movies/${profileUser?.nowWatching?.id}`}>
            "{profileUser?.nowWatching?.title}"
          </Link>
        </Tooltip>
      </Typography>
    </Box>
  );
};

export default ProfileNowWatching;
