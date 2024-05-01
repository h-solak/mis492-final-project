import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import {
  Reply,
  ReplyOutlined,
  Star,
  ThumbUp,
  ThumbUpOutlined,
  ThumbUpSharp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import ReplyItem from "./ReplyItem";
import ColumnBox from "../../../Components/ColumnBox";

const ReviewItem = ({ review }) => {
  return (
    <Grid item xs={12}>
      <Box display={"flex"} alignItems={"start"} gap={1}>
        <Link to={`/profile/${review.username}`}>
          <Box display={"flex"} alignItems={"center"} gap={0.6}>
            <Avatar name={review?.username} size={40} />
          </Box>
        </Link>
        <ColumnBox>
          <Box display={"flex"} alignItems={"center"}>
            <Link to={`/profile/${review.username}`}>
              <Typography fontWeight={"bold"}>{review?.username}</Typography>
            </Link>
            <Box display={"flex"} alignItems={"center"} gap={0}>
              <Star
                sx={{
                  color: "highlight.main",
                  fontSize: 20,
                }}
              />
              <Typography fontSize={16}>
                {review?.rate}
                <Typography variant={"span"} fontSize={12}>
                  /10
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              wordWrap: "break-word",
            }}
          >
            {review?.review}
          </Typography>
          {/* Action Buttons */}
          <Box display={"flex"} alignItems={"center"} gap={0}>
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
            <Button
              color="dark"
              startIcon={<ReplyOutlined />}
              sx={{
                textTransform: "capitalize",
                alignSelf: "start",
              }}
            >
              Reply
            </Button>
          </Box>
          {/* Replies  */}
          {[1, 2].map((reply) => (
            <ReplyItem reply={reply} />
          ))}
        </ColumnBox>
      </Box>
    </Grid>
  );
};

export default ReviewItem;
