import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import GoogleIcon from "../../assets/icons/google.svg";

const GoogleButton = () => {
  const isMobileScreen = useMediaQuery("(max-width:899px)");

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<img src={GoogleIcon} height={16} />}
      sx={{
        py: 1,
        textTransform: "capitalize",
        color: "dark.main",
        borderRadius: 2,
        fontSize: isMobileScreen ? 12 : 14,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      Continue With Google
    </Button>
  );
};

export default GoogleButton;
