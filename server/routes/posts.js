const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//SHARE A POST
router.post("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user = await User.findById(id);
    const content = req.body.content;
    const newPost = new Post({
      userId: id,
      username: user.username,
      avatar: user.crrAvatar,
      content: content,
    });
    await newPost.save();
    res.status(200).json({ desc: "Your post is successfully shared" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A POST

router.put("/:id", checkJwt, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated successfully!");
    } else {
      res.status(403).json("You can update only your own posts!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A POST

router.delete("/:id", checkJwt, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ desc: "The post has been deleted successfully!" });
    } else {
      res.status(403).json({ desc: "You can delete only your own posts!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIKE/UNLIKE A POST

router.put("/:id/like", checkJwt, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //if didn't like it already
    if (!post.likes.includes(req.body.username)) {
      await post.updateOne({ $push: { likes: req.body.username } });
      res.status(200).json({
        postId: post?._id,
        newLikes: post.likes,
        username: req.body.username,
        desc: "The post has been liked successfully!",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.username } });
      res.status(200).json({
        postId: post?._id,
        newLikes: post.likes,
        username: req.body.username,
        desc: "The post has been unliked successfully!",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A POST

router.get("/:id", checkJwt, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET TIMELINE POSTS

router.get("/timeline/:userId", checkJwt, async (req, res) => {
  try {
    const crrUser = await User.findById(req.params.userId);
    const crrUserPosts = await Post.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    const crrUserAvatar = {
      crrAvatar: crrUser.crrAvatar,
    };
    const mergedCrrUserPosts = crrUserPosts.map((post) =>
      Object.assign(post._doc, crrUserAvatar)
    );
    const friendPosts = await Promise.all(
      crrUser.followings.map(async (friendId) => {
        const friendAllPosts = await Post.find({ userId: friendId }).sort({
          createdAt: -1,
        });
        const friend = await User.findById(friendId);
        const friendAvatar = {
          crrAvatar: friend.crrAvatar,
        };
        const avatarAddedPosts = friendAllPosts?.map((post) => {
          return Object.assign(post._doc, friendAvatar);
        });
        return avatarAddedPosts;
      })
    );
    const fixedFriendPosts = friendPosts.flat(1);

    const allTimelinePosts = fixedFriendPosts.concat(mergedCrrUserPosts);
    const sortedAllTimelinePost = allTimelinePosts.sort(
      (a, b) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    );
    res.status(200).json({
      desc: "Successful",
      posts: sortedAllTimelinePost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
