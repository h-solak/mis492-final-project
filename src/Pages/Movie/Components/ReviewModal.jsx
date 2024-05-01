import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ColumnBox from "../../../Components/ColumnBox";
import Modal from "../../../Components/Modal";
import { Rating } from "react-simple-star-rating";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

const ReviewModal = ({
  isModalOpen,
  setIsModalOpen,
  movie,
  rating,
  setRating,
  review,
  setReview,
  handleSubmitRate,
}) => {
  const isMobileScreen = useMediaQuery("(max-width:899px)");
  return (
    <Modal
      title={"Review"}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <Box display={"flex"} alignItems={"start"} gap={8}>
        {!isMobileScreen && (
          <ColumnBox>
            <img
              src={`https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`}
              height={270}
              width={170}
              alt=""
              style={{
                objectFit: "cover",
              }}
            />
            <Button
              color="dark"
              startIcon={<FavoriteBorderOutlined />}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Add to favorites!!!!
            </Button>
          </ColumnBox>
        )}
        <ColumnBox gap={4} minWidth="400px">
          <Typography fontWeight={"bold"}>
            Write a review for{" "}
            <Typography
              component={"span"}
              color={"primary.main"}
              fontWeight={"bold"}
            >
              {movie?.title}
            </Typography>
            .
          </Typography>
          {/* <Rating
            size="large"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            max={5}
            sx={{
              width: "100%",
              flex: 1,
            }}
          /> */}
          <ColumnBox>
            <Typography fontWeight={"bold"} mb={1}>
              Rate
            </Typography>
            <Rating
              onClick={(newRate) => setRating(newRate)}
              initialValue={rating}
              size={32}
            />
          </ColumnBox>
          <ColumnBox>
            <Typography fontWeight={"bold"} mb={1}>
              Comment
            </Typography>
            <TextField
              multiline
              minRows={8}
              maxRows={8}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="How did it make you feel?"
              sx={{
                borderRadius: 99,
              }}
            />
          </ColumnBox>
          <Button
            size="large"
            variant="contained"
            onClick={() => handleSubmitRate()}
            sx={{
              px: 3,
              borderRadius: 99,
              alignSelf: "start",
            }}
            disabled={!rating > 0}
          >
            Publish
          </Button>
        </ColumnBox>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
