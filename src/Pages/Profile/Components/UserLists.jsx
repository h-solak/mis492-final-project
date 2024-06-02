import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ProfileUserContext } from "../Profile";
import ColumnBox from "../../../Components/ColumnBox";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkAdd, Close, Favorite } from "@mui/icons-material";
import useUser from "../../../Contexts/User/useUser";
import { createWatchlist } from "../../../Services/Watchlist";
import Modal from "../../../Components/Modals/Modal";
import toast from "react-hot-toast";
import getCharacterColor from "../../../Utilities/getCharacterColor";

const UserLists = ({ rate }) => {
  const { user, setUser } = useUser();
  const { profileUser } = useContext(ProfileUserContext);
  const [createWatchlistModal, setCreateWatchlistModal] = useState(false);
  const [newWatchlistTitle, setNewWatchlistTitle] = useState("");

  const handleCreateWatchlist = async () => {
    if (newWatchlistTitle?.length > 2) {
      const newUser = await createWatchlist({ title: newWatchlistTitle });
      if (newUser?._id) {
        setUser(newUser);
        setNewWatchlistTitle("");
        setCreateWatchlistModal(false);
      } else {
        toast.error("Something went wrong!");
      }
    } else if (
      newWatchlistTitle?.length <= 2 &&
      newWatchlistTitle?.length > 0
    ) {
      toast.error("Watchlist title should can't be shorter than 3 letters!");
    } else {
      toast.error("Your watchlist needs a title!");
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} mt={8}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottom={1}
          py={1}
        >
          <Typography fontWeight={"medium"}>User Lists</Typography>
          <Button
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            See All Lists
          </Button>
        </Box>
      </Grid>
      <Grid container spacing={2} mt={1}>
        {!!(user?.username == profileUser?.username) && (
          <Grid item>
            <ColumnBox
              alignItems="center"
              gap={0.5}
              onClick={() => setCreateWatchlistModal(true)}
              sx={{
                cursor: "pointer",
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: 200,
                  width: 150,
                  backgroundColor: "secondary.light",
                }}
              >
                <BookmarkAdd
                  sx={{
                    color: "#000",
                    fontSize: 64,
                  }}
                />
              </Box>
              <Typography fontSize={14}>Create List</Typography>
            </ColumnBox>
          </Grid>
        )}
        <Grid item>
          <Link to={`/profile/${profileUser?.username}/watchlist`}>
            <ColumnBox alignItems="center" gap={0.5}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: 200,
                  width: 150,
                  backgroundColor: "primary.light",
                }}
              >
                <Bookmark
                  sx={{
                    color: "#fff",
                    fontSize: 64,
                  }}
                />
              </Box>
              <Typography fontSize={14}>
                Default Watchlist ({profileUser?.defaultWatchlist?.length || 0})
              </Typography>
            </ColumnBox>
          </Link>
        </Grid>
        <Grid item>
          <Link to={`/profile/${profileUser?.username}/favorites`}>
            <ColumnBox alignItems="center" gap={0.5}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: 200,
                  width: 150,
                  backgroundColor: "primary.light",
                }}
              >
                <Favorite
                  sx={{
                    color: "#fff",
                    fontSize: 64,
                  }}
                />
              </Box>
              <Typography fontSize={14}>
                Favorites ({profileUser?.favoriteMovies?.length || 0})
              </Typography>
            </ColumnBox>
          </Link>
        </Grid>
        {!!profileUser?.watchlists?.length > 0 &&
          profileUser?.watchlists?.map((watchlistItem) => (
            <Grid item>
              <Link
                to={`/profile/${profileUser?.username}/watchlist/${watchlistItem?._id}`}
              >
                <ColumnBox alignItems="center" gap={0.5}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                      height: 200,
                      width: 150,
                      backgroundColor: `${getCharacterColor(
                        profileUser?.personality?.type
                      )}20`,
                    }}
                  >
                    <Bookmark
                      sx={{
                        color: "#000",
                        fontSize: 64,
                      }}
                    />
                  </Box>
                  <Typography
                    fontSize={14}
                    maxWidth={150}
                    overflow={"hidden"}
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {watchlistItem?.title || "Watchlist"} (
                    {watchlistItem?.movies?.length || 0})
                  </Typography>
                </ColumnBox>
              </Link>
            </Grid>
          ))}
      </Grid>
      {/* Create Watchlist Modal */}
      <Modal
        isModalOpen={createWatchlistModal}
        setIsModalOpen={setCreateWatchlistModal}
      >
        <Box
          width={"100%"}
          mb={4}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={18} fontWeight={700}>
            Create a New List
          </Typography>
          <IconButton onClick={() => setCreateWatchlistModal(false)}>
            <Close />
          </IconButton>
        </Box>
        <Box display={"flex"} alignItems={"start"} gap={2}>
          <ColumnBox
            alignItems="center"
            gap={0.5}
            onClick={() => setCreateWatchlistModal(true)}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                height: 200,
                width: 150,
                backgroundColor: "secondary.light",
              }}
            >
              <BookmarkAdd
                sx={{
                  color: "#000",
                  fontSize: 64,
                }}
              />
            </Box>
          </ColumnBox>
          <ColumnBox py={2} gap={2}>
            <Typography fontWeight={600}>
              What should be the name of your new list?{" "}
            </Typography>
            <TextField
              size="small"
              placeholder="Enter List Name"
              value={newWatchlistTitle}
              onChange={(e) => setNewWatchlistTitle(e.target.value)}
              sx={{
                borderRadius: 8,
              }}
            />
            <Button
              variant="contained"
              onClick={handleCreateWatchlist}
              sx={{
                mt: 2,
                py: 1,
                px: 4,
                borderRadius: 99,
              }}
            >
              Create List
            </Button>
          </ColumnBox>
        </Box>
      </Modal>
    </Grid>
  );
};

export default UserLists;
