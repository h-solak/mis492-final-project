import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
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
import useUser from "../../../Contexts/User/useUser";
import { replyReview } from "../../../Services/Movie";

const ReviewItem = ({ review, handleGetMovieReviews }) => {
  const [isReplyInputOpen, setIsReplyInputOpen] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const { user } = useUser();

  const handleReplyReview = async () => {
    if (replyInput?.length > 0) {
      const newReply = await replyReview({
        reviewId: review?._id,
        content: replyInput,
      });
      setIsReplyInputOpen(false);
      setReplyInput("");
      await handleGetMovieReviews();
    }
  };
  return (
    <Grid item xs={12}>
      <Box display={"flex"} alignItems={"start"} gap={1}>
        <Link to={`/profile/${review.username}`}>
          <Box display={"flex"} alignItems={"center"} gap={0.6}>
            <Avatar name={review?.username} size={40} />
          </Box>
        </Link>
        <ColumnBox width="100%">
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
              onClick={() => setIsReplyInputOpen(!isReplyInputOpen)}
            >
              Reply
            </Button>
          </Box>
          {/* Reply Input */}
          {!!isReplyInputOpen && (
            <Box display={"flex"} alignItems={"center"} gap={2} width={"100%"}>
              <Avatar name={user?.username} size={32} />
              <TextField
                variant="standard"
                size="small"
                placeholder="Add a reply"
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                sx={{
                  flex: 1,
                }}
              />
              <Button
                color="secondary"
                onClick={() => {
                  setIsReplyInputOpen(false);
                  setReplyInput("");
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleReplyReview}>
                Send
              </Button>
            </Box>
          )}

          {/* All Replies  */}
          {review?.replies?.map((reply) => (
            <ReplyItem reply={reply} />
          ))}
        </ColumnBox>
      </Box>
    </Grid>
  );
};

export default ReviewItem;
