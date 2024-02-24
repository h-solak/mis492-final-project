import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const TextfieldError = ({ errors, title }) => {
  return (
    errors && (
      <Typography
        color="error"
        padding={0}
        margin={0}
        fontSize={12}
        fontWeight={600}
      >
        {errors.type === "required" && `${title} field is required`}
        {errors.type === "maxLength" &&
          `${title} field should contain 20 characters or less`}
        {errors.type === "minLength" &&
          `${title} field should contain minimum of 3 characters`}
      </Typography>
    )
  );
};

export default TextfieldError;
