import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import CenteredBox from "../../Components/CenteredBox";
import ColumnBox from "../../Components/ColumnBox";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import useUser from "../../Contexts/User/useUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfileUser } from "../../Services/User";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NoDataSvg from "../../assets/illustrations/nodata.svg";
import MovieItem from "../../Components/Movie/MovieItem";
import { deleteCustomWatchlist } from "../../Services/Watchlist";
import { Delete } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";

const CustomWatchlist = () => {
  const navigate = useNavigate();
  const { username, watchlistId } = useParams();
  const { user, setUser } = useUser();
  const [pageLoading, setPageLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({
    _id: "",
    username: "",
    rates: [],
  });
  const [crrWatchlist, setCrrWatchlist] = useState();

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    //Call this function everytime username param changes, empty brackets cause problems when user jumps on another user's profile
    handleGetProfileUser();
  }, [username]);

  const handleGetProfileUser = async () => {
    setPageLoading(true);
    const crrUser = await getProfileUser(username);
    setProfileUser(crrUser);
    setPageLoading(false);

    const watchlist = crrUser?.watchlists?.find(
      (item) => item?._id == watchlistId
    );
    setCrrWatchlist(watchlist);
  };

  const handleDeleteWatchlist = async () => {
    const deleteAction = await deleteCustomWatchlist(watchlistId);
    if (deleteAction) {
      navigate(`/profile/${profileUser?.username}`);
      toast.success("Watchlist deleted successfully.");
    } else {
      toast.error("Something went wrong!");
    }
  };

  if (!"watchlist") {
    return (
      <Layout>
        <CenteredBox>
          <ColumnBox alignItems="center">
            <QuestionMarkIcon
              sx={{
                fontSize: 64,
              }}
            />
            Watchlist not found
          </ColumnBox>
        </CenteredBox>
      </Layout>
    );
  }
  return (
    <Layout pageLoading={pageLoading}>
      <Breadcrumbs
        links={[
          {
            title: `@${username}`,
            url: `/profile/${username}`,
          },
          {
            title: `Watchlists`,
            url: `/profile/${username}/watchlist/${watchlistId}`,
          },
          {
            title: `${crrWatchlist?.title || "Watchlist"}`,
            url: `/profile/${username}/watchlist/${watchlistId}`,
          },
        ]}
      />

      <Grid container>
        <Grid item xs={12} sm={12} md={12} px={4}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={"bold"} fontSize={20}>
              {crrWatchlist?.title}
            </Typography>
            {!!(user?._id == profileUser?._id) && (
              <IconButton
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
        </Grid>

        <Grid container spacing={4} px={4} mt={1}>
          {crrWatchlist?.movies.length > 0 ? (
            crrWatchlist?.movies?.map((movie) => (
              <MovieItem key={movie?.id} movie={movie} />
            ))
          ) : (
            <CenteredBox>
              <ColumnBox alignItems="center" gap={1}>
                <img src={NoDataSvg} width={100} />
                <Typography color={"secondary"}>
                  No movies found in {crrWatchlist?.title}
                </Typography>
                <Link to={"/movies"}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Go to Movies Page
                  </Button>
                </Link>
              </ColumnBox>
            </CenteredBox>
          )}
        </Grid>
      </Grid>

      {/* Actions Menu */}
      {!!(user?._id == profileUser?._id) && (
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={(e) => {
            e.preventDefault();
            setAnchorEl(null);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleDeleteWatchlist}>
            <Delete />
            <Typography fontWeight={"medium"}>Delete Watchlist</Typography>
          </MenuItem>
        </Menu>
      )}
    </Layout>
  );
};

export default CustomWatchlist;
