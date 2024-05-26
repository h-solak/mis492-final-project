import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Avatar from "../../../Components/Avatar";
import ColumnBox from "../../../Components/ColumnBox";
import { Link } from "react-router-dom";
import { ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { format, formatDistance } from "date-fns";

const ReplyItem = ({ reply }) => {
  return (
    <Grid item xs={12} marginTop={2}>
      <Box display={"flex"} alignItems={"start"} gap={1}>
        <Avatar name={reply?.username} size={32} />
        <ColumnBox>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Link to={`/profile/${reply.username}`}>
              <Typography fontWeight={"bold"}>{reply?.username}</Typography>
            </Link>
            <Typography color={"secondary"} fontSize={12}>
              {formatDistance(reply?.createdAt, new Date())} ago
            </Typography>
          </Box>
          <Typography>{reply?.content}</Typography>
        </ColumnBox>
      </Box>
    </Grid>
  );
};

export default ReplyItem;
