import { Button, Grid } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useUser from "../../Contexts/User/useUser";
/* Icons */
import AvatarImg from "../AvatarImg";
import { Chat, Home, Movie, People } from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const LinkItem = ({ title, url, onClick, icon }) => {
  const { pathname } = useLocation();
  return (
    <Link to={url ? url : null}>
      <Button
        sx={{
          textTransform: "none",
          width: "100%",
          textAlign: "left",
          justifyContent: "start",
          color: pathname == url ? "primary" : "black",
          height: 64,
          paddingX: 2,
          borderLeft: pathname == url ? 2 : 0,
          borderColor: "red",
        }}
        startIcon={icon}
        onClick={onClick ? onClick : () => null}
      >
        {title}
      </Button>
    </Link>
  );
};

const linkItems = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Friends",
    url: "/friends",
    icon: <People />,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: <Chat />,
  },
  {
    title: "Movies",
    url: "/movies",
    icon: <Movie />,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: <BookmarkIcon />,
  },
];

const Sidebar = () => {
  const { user } = useUser();
  const { pathname } = useLocation();

  return (
    <Grid
      item
      xs={0}
      md={2.4}
      className="full-height"
      py={2}
      sx={{
        position: "sticky",
        top: "56px",
      }}
    >
      <Link to={`/profile/${user?.username}`}>
        <Button
          sx={{
            textTransform: "none",
            width: "100%",
            textAlign: "left",
            color:
              pathname == `/profile/${user?.username}` ? "primary" : "black",
            justifyContent: "start",
            height: 64,
          }}
        >
          <AvatarImg
            no={user?.crrAvatar}
            width={32}
            style={{ marginRight: 4 }}
          />
          {user?.username || "User"}
        </Button>
      </Link>
      {linkItems.map((item, index) => (
        <LinkItem
          key={index}
          title={item?.title}
          url={item?.url}
          onClick={item?.onClick}
          icon={item?.icon}
        />
      ))}
    </Grid>
  );
};

export default Sidebar;
