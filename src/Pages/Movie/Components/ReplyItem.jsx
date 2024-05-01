import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Avatar from "../../../Components/Avatar";
import ColumnBox from "../../../Components/ColumnBox";
import { Link } from "react-router-dom";
import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";

const ReplyItem = () => {
  return (
    <Grid item xs={12} marginTop={2}>
      <Box display={"flex"} alignItems={"start"} gap={1}>
        <Avatar name={"review?.username"} size={32} />
        <ColumnBox>
          <Link to={`/profile/${"review.username"}`}>
            <Typography fontWeight={"bold"}>{"review?.username"}</Typography>
          </Link>
          <Typography>Dude, I don't agree with you...</Typography>
          <Button
            color="dark"
            startIcon={!"isLiked" ? <ThumbUp /> : <ThumbUpOutlined />}
            sx={{
              textTransform: "capitalize",
              alignSelf: "start",
            }}
          >
            Like
          </Button>
        </ColumnBox>
      </Box>
    </Grid>
  );
};

export default ReplyItem;
