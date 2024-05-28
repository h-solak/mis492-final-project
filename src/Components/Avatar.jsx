import { Box, Typography } from "@mui/material";
import React from "react";
import ReactAvatar from "react-avatar";

const Avatar = ({ name, size, isMatched, ...props }) => {
  return (
    <Box position={"relative"}>
      <ReactAvatar name={name} size={size} round={"99px"} {...props} />
      {isMatched ? (
        <Typography
          className="fade-in-rtl"
          sx={{
            position: "absolute",
            // color: "#000",
            right: -5,
            top: "50%",
            fontSize: size / 2.5,
          }}
        >
          🔥
        </Typography>
      ) : null}
    </Box>
  );
};

export default Avatar;
