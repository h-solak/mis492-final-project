import { Grid, Paper, makeStyles } from "@mui/material";
import React from "react";
import useUser from "../../../Contexts/User/useUser";

const Message = ({ message }) => {
  const { user } = useUser();
  const isReceiver = message?.sender != user?._id;
  return (
    <Grid
      item
      xs={12}
      display={"flex"}
      justifyContent={isReceiver ? "start" : "end"}
      px={4}
    >
      <Paper
        sx={{
          display: "inline-block",
          maxWidth: "70%",
          padding: "8px",
          marginBottom: "8px",
          borderRadius: "10px",
          wordWrap: "break-word",
          backgroundColor: isReceiver ? "#f0f0f0" : "#007bff",
          color: isReceiver ? "#000" : "#fff",
        }}
      >
        {message?.content}
      </Paper>
    </Grid>
  );
};

export default Message;
