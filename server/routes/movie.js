const router = require("express").Router();
const Rate = require("../models/Rate");
const ReviewReply = require("../models/ReviewReply");
const User = require("../models/User");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//get the user's rates
router.get("/rates", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const usersRates = await Rate.find({
      user: id,
    });

    return res.status(200).json({ rates: usersRates });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Editing existing rates
router.put("/rate", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movie = req.body.movie;
    const newRate = req.body.rate;
    const newReview = req.body.review;

    await Rate.findOneAndUpdate(
      {
        //query
        user: id,
        movie: movie,
      },
      {
        //update
        rate: newRate,
        review: newReview,
      }
    );

    return res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Rate a movie
router.post("/rate", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const rate = req.body.rate;
    const movie = req.body.movie;
    const review = req.body.review;
    const moviePoster = req.body.moviePoster;
    const movieTitle = req.body.movieTitle;
    const alreadyRated = await Rate.findOne({
      user: id,
      movie: movie,
    });

    //if user haven't rated the movie before, post it..
    if (!alreadyRated) {
      const newRate = new Rate({
        user: id,
        movie: movie,
        rate: rate,
        review: review,
        movieTitle: movieTitle,
        moviePoster: moviePoster,
      });
      await newRate.save();
      return res.status(200).json();
    } else {
      return res.status(400).json();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Get all written reviews for a spesific movie
router.get("/:movieId/reviews", checkJwt, async (req, res) => {
  try {
    const movieId = req.params.movieId;

    //find rates that have reviews that are not empty
    const reviewsData = await Rate.find({
      movie: movieId,
      review: { $ne: "" },
    });

    let reviews = [];

    if (reviewsData) {
      await Promise.all(
        reviewsData?.map(async (reviewItem, index) => {
          const reviewUserData = await User.findById(reviewItem?.user);
          let repliesWithAdditionalData = [];
          //Adding username info to each reply of the replies array
          if (reviewItem?.replies?.length > 0) {
            repliesWithAdditionalData = await Promise.all(
              reviewItem?.replies?.map(async (replyItem) => {
                const replyUserData = await User.findById(replyItem?.userId);
                const newReply = {
                  username: replyUserData?.username,
                  ...replyItem?._doc,
                };
                return newReply;
              })
            );
          }

          console.log("yeyt, ", repliesWithAdditionalData);
          const { replies, ...otherReviewsData } = reviewsData[index]._doc;
          const newReview = {
            username: reviewUserData?.username,
            userAvatar: reviewUserData?.crrAvatar,
            replies:
              repliesWithAdditionalData?.length > 0
                ? repliesWithAdditionalData
                : replies,
            ...otherReviewsData,
          };
          reviews.push(newReview);
        })
      );
    }

    return res.status(200).json({ reviews: reviews });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Send a reply
router.post("/review/reply/:reviewId", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const reviewId = req.params.reviewId;
    const content = req.body.content;
    const review = await Rate.findById(reviewId);

    const reply = new ReviewReply({
      content,
      reviewId,
      userId: id, // Assuming you have a userId associated with the reply
    });
    review.replies.push(reply);
    await review.save();

    return res.status(200).json({ reply: reply });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//like a review, or a reply of a review
router.post("/review/like/:reviewId", checkJwt, async (req, res) => {});

module.exports = router;
