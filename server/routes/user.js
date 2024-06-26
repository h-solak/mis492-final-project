const User = require("../models/User");
const Rate = require("../models/Rate");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//GET A USER PROFILE
router.get("/:username", checkJwt, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const userMovieRates = await Rate.find({
      user: user?._id,
    });
    const sortedUserMovieRates = userMovieRates.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const { password, privateChats, ...otherUserData } = user._doc; //get the user except password

    const allUserData = {
      ...otherUserData,
      rates: sortedUserMovieRates,
    };

    return res.status(200).json({ user: allUserData });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET A USER PROFILE USING ID
router.get("/withId/:userId", checkJwt, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userMovieRates = await Rate.find({
      user: user?._id,
    });
    const sortedUserMovieRates = userMovieRates
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const { password, privateChats, ...otherUserData } = user._doc; //get the user except password

    const allUserData = {
      ...otherUserData,
      rates: sortedUserMovieRates,
    };

    return res.status(200).json({ user: allUserData });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE USER - settings
router.put("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user = await User.findById(id);

    const birthday = req.body.birthday || user?.birthday;

    function isUserOver18(date) {
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 18;
    }

    user.username = req.body.username;
    user.gender = req.body.gender;
    user.city = req.body.city;
    user.birthday = isUserOver18(birthday) ? birthday : user?.birthday;
    user.desc = req.body.about;

    await user.save();

    return res
      .status(200)
      .json({ user: user, isAgeOver18: isUserOver18(birthday) });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//User privacy settings
router.put("/privacy", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user = await User.findById(id);
    const { profileVisible, friendsListVisible, matchedFriendsVisible } =
      req.body;

    console.log(req.body);

    user.privacy.profileVisible = profileVisible ? true : false;
    user.privacy.friendsListVisible = friendsListVisible ? true : false;
    user.privacy.matchedFriendsVisible = matchedFriendsVisible ? true : false;

    await user.save();

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//DELETE USER
router.delete("/:id", checkJwt, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account is successfully deleted!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your own account!");
  }
});

// //GET A USER
// router.get("/:username", checkJwt, async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username });
//     if (user?._id) {
//       const userPosts = await Post.find({ username: req.params.username }).sort(
//         {
//           createdAt: -1,
//         }
//       );
//       const userAvatar = {
//         crrAvatar: user.crrAvatar,
//       };
//       const mergedUserPosts = userPosts?.map((post) =>
//         Object.assign(post._doc, userAvatar)
//       );
//       const { password, updatedAt, email, ...other } = user._doc;
//       const userArr = Object.assign(other, { posts: mergedUserPosts });
//     return res.status(200).json({ data: userArr });
//     } else {
//     return res.status(404).json({ desc: "User Not Found" });
//     }
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//FOLLOW A USER
router.put("/follow/:id", checkJwt, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //user that will be followed
      const crrUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await crrUser.updateOne({ $push: { followings: req.params.id } });
        return res.status(200).json({
          followedUser: user?._id,
          desc: `Following ${user?.username}`,
        });
      } else {
        return res.status(403).json({
          desc: `You are already following ${user?.username}`,
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      desc: "You cannot follow yourself!",
    });
  }
});

//UNFOLLOW A USER
router.put("/unfollow/:id", checkJwt, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id); //user that will be unfollowed
      const crrUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await crrUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json({
          unfollowedUser: user?._id,
          desc: `${user?.username} has been unfollowed`,
        });
      } else {
        return res.status(403).json({
          unfollowedUser: user.username,
          desc: `You are not following ${user?.username}`,
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      desc: "You cannot unfollow yourself!",
    });
  }
});

// //CHANGE AVATAR OF THE USER
// router.put("/avatar/:userId", checkJwt, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId); //user that will be unfollowed
//     await user.updateOne({ $set: { crrAvatar: req.body.avatarId } });
//     return res.status(200).json({
//       desc: "User avatar has been changed.",
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// //USER SUGGESTIONS (5 suggestions on timeline)
// router.get("/timeline/suggestions/:userId", checkJwt, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const followings = user.followings;
//     const newUsers = await User.find().sort({ createdAt: 1 }).limit(20);
//     const filteredUsers = newUsers.filter((newUser) => {
//       return (
//         newUser._id.toString() !== user._id.toString() &&
//         !followings.includes(newUser._id)
//       );
//     });
//     const suggestedUsers = filteredUsers?.map((suggestedUser) => {
//       const { password, updatedAt, email, ...other } = suggestedUser._doc;
//       return {
//         userId: suggestedUser._id,
//         username: suggestedUser.username,
//         crrAvatar: suggestedUser.crrAvatar,
//         //followers: suggestedUser.followers,
//       };
//     });
//   return res.status(200).json({
//       suggestedUsers: suggestedUsers.slice(-5),
//     });
//   } catch (err) {
//   return res.status(500).json(err);
//   }
// });

module.exports = router;
