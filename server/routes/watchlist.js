const router = require("express").Router();
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//create a new watchlist
router.post("/create", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const title = req.body.title;

    const user = await User.findById(id);

    if (title) {
      const newWatchlist = new Watchlist({
        creator: id,
        title: title,
        collaborators: [],
        movies: [],
      });
      user.watchlists.push(newWatchlist);
      await user.save();
      return res.status(200).json({ user: user?._doc });
    }

    return res.status(500).json({ err: "Something went wrong" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//add a movie to a custom watchlist
router.post("/custom-watchlist/:watchlistId", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const watchlistId = req.params.watchlistId;
    const movieId = req.body.movieId;
    const title = req.body.title;
    const poster_path = req.body.posterPath;
    const release_date = req.body.releaseDate;
    const createdAt = new Date();
    const user = await User.findById(id);

    let userWatchlists = user?.watchlists || [];
    let crrWatchlist = userWatchlists.find((item) => item?._id == watchlistId);

    if (
      crrWatchlist?.creator == id ||
      crrWatchlist?.collaborators?.includes(id)
    ) {
      const watchlistIndex = user?.watchlists?.findIndex(
        (item) => item?._id == watchlistId
      );
      console.log("huh", user?.watchlists[watchlistIndex]?.movies);
      if (
        !user?.watchlists[watchlistIndex]?.movies?.some(
          (item) => item.id == movieId
        )
      ) {
        user?.watchlists[watchlistIndex]?.movies?.push({
          id: movieId,
          title: title,
          poster_path: poster_path,
          release_date: release_date,
          createdAt: createdAt,
        });
      }
    }

    await user.save();

    console.log(
      "xd",
      user?.watchlists?.map((item) => console.log(item?.movies))
    );

    return res.status(200).json({ user: user?._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//remove a movie from a custom watchlist
router.delete("/:watchlistId/:movieId", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const watchlistId = req.params.watchlistId;
    const movieId = req.params.movieId;
    const user = await User.findById(id);

    let userWatchlists = user?.watchlists || [];
    let crrWatchlist = userWatchlists.find((item) => item?._id == watchlistId);

    if (
      crrWatchlist?.creator == id ||
      crrWatchlist?.collaborators?.includes(id)
    ) {
      const watchlistIndex = userWatchlists?.findIndex(
        (item) => item?._id == watchlistId
      );

      const moviesAfterDeleting = userWatchlists[
        watchlistIndex
      ]?.movies?.filter((item) => item.id != movieId);

      userWatchlists[watchlistIndex].movies = moviesAfterDeleting;

      user.watchlists = userWatchlists;
      await user.save();
      return res.status(200).json({ user: user?._doc });
    }

    return res.status(500).json({ error: "Something went wrong!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//delete a custom watchlist
router.delete(
  "/custom-watchlist/delete/:watchlistId",
  checkJwt,
  async (req, res) => {
    try {
      const id = getUserIdFromToken(req.headers.authorization);
      const watchlistId = req.params.watchlistId;
      const user = await User.findById(id);

      const crrWatchlistIndex = user?.watchlists?.findIndex(
        (item) => item?._id === watchlistId
      );
      const crrWatchlist = user?.watchlists?.find(
        (item) => item?._id?.toString() == watchlistId
      );

      // const user2 = await User.findByIdAndUpdate(
      //   id,
      //   {
      //     $pull: { watchlists: { _id: watchlistId } },
      //   },
      //   { new: true }
      // );
      // console.log("2", user2?.watchlists?.map((item) => item?._id)?.join(", "));

      console.log(
        `bu bir ${user?.watchlists?.map((item) => item?._id)?.join(", ")}`
      );
      console.log(`bu iki ${crrWatchlist}`);

      // if (crrWatchlist?.creator == id) {}
      if (crrWatchlist?._id) {
        userWatchlists = userWatchlists?.filter(
          (item) => item?._id?.toString() != watchlistId
        );
        user.watchlists = userWatchlists;
        await user.save();

        return res.status(200).json({ success: true });
      }
      return res.status(200).json({ success: true });

      // return res.status(500).json({ error: "Something went wrong!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

//add movie to default watchlist
router.post("/", checkJwt, async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    const id = req.body.id;
    const title = req.body.title;
    const poster_path = req.body.posterPath;
    const release_date = req.body.releaseDate;
    const createdAt = new Date();

    const user = await User.findById(userId);

    let newWatchlist = user?.defaultWatchlist || [];
    newWatchlist.push({
      id,
      title,
      poster_path,
      release_date,
      createdAt,
    });

    user.defaultWatchlist = newWatchlist;
    await user.save();

    return res.status(200).json({ watchlist: newWatchlist });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//remove movie from default watchlist
router.delete("/:movieId", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movieId = req.params.movieId;
    const user = await User.findById(id);

    let newWatchlist = user?.defaultWatchlist || [];
    newWatchlist = newWatchlist?.filter((item) => item?.id != movieId);

    user.defaultWatchlist = newWatchlist;
    await user.save();

    return res.status(200).json({ watchlist: newWatchlist });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
