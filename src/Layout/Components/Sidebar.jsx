import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../Contexts/User/useUser";
import Logo from "../../assets/logo.svg";
/* Icons */
import AvatarImg from "../../Components/AvatarImg";
import {
  Chat,
  Home,
  Movie,
  People,
  Search,
  Bookmark,
  Settings,
  Logout,
} from "@mui/icons-material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ColumnBox from "../../Components/ColumnBox";
import { removeAccessToken } from "../../api/config";
const LinkItem = ({ title, url, onClick, icon, imgIcon }) => {
  const { pathname } = useLocation();
  const isActive = pathname == url;
  return (
    <Link to={url ? url : null}>
      <Button
        sx={{
          textTransform: "none",
          borderRadius: 0,
          width: "100%",
          textAlign: "left",
          justifyContent: "start",
          color: isActive ? "primary" : "black",
          height: 64,
          paddingX: 4,
          borderBottom: isActive ? 3 : 0,
          borderColor: "red",
          fontWeight: "regular",
        }}
        startIcon={icon ? icon : <img src={imgIcon} width={24} height={24} />}
        onClick={onClick ? onClick : () => null}
        size="large"
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
    title: "Search",
    url: "/search",
    icon: <Search />,
  },

  {
    title: "Movies",
    url: "/movies",
    icon: <Movie />,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: <Bookmark />,
  },
  {
    title: "Friend Activity",
    url: "/friends",
    icon: <People />,
  },
  {
    title: "Match",
    url: "/match",
    // imgIcon: MatchSvg,
    icon: <ConnectWithoutContactIcon />,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: <Chat />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];

const Sidebar = () => {
  const { user, setUser } = useUser();
  const { pathname } = useLocation();
  const isSmScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      removeAccessToken();
      setUser({});
    } catch (err) {
    } finally {
      navigate("/");
    }
  };

  return isSmScreen ? null : (
    <Grid
      item
      sm={3}
      className="sidebar full-height"
      py={2}
      sx={{
        position: "sticky",
        top: 0,
        borderRight: 3,
        borderColor: "secondary.light",
      }}
    >
      <Link to={"/"}>
        <img
          src={Logo}
          height={24}
          alt="Logo"
          style={{
            marginTop: 32,
            padding: "0 32px",
          }}
        />
      </Link>
      <Link to={`/profile/${user?.username}`}>
        <Button
          sx={{
            marginTop: 4,
            paddingX: 4,
            width: "100%",
            textTransform: "none",
            textAlign: "left",
            color:
              pathname == `/profile/${user?.username}` ? "primary" : "black",
            justifyContent: "start",
            height: 64,
            backgroundColor: "#f8f8f8",
          }}
        >
          <AvatarImg
            no={user?.crrAvatar}
            width={48}
            style={{ marginRight: 4 }}
          />
          <ColumnBox px={1}>
            <Typography fontSize={15} color={"#000"}>
              {`@${user?.username}` || "User"}
            </Typography>
            <Typography
              fontSize={13}
              color={"primary.light"}
              fontWeight={"bold"}
            >
              {"Drama Queen"}
            </Typography>
          </ColumnBox>
        </Button>
      </Link>
      <Box>
        {linkItems.map((item, index) => (
          <LinkItem
            key={item?.title}
            title={item?.title}
            url={item?.url}
            onClick={item?.onClick}
            icon={item?.icon}
          />
        ))}
        <LinkItem title={"Logout"} onClick={handleLogout} icon={<Logout />} />
      </Box>
    </Grid>
  );
};

export default Sidebar;
