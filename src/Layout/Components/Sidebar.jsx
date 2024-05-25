import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../Contexts/User/useUser";
import Logo from "../../assets/logo.svg";
/* Icons */
import {
  Chat,
  Home,
  Movie,
  People,
  Search,
  Bookmark,
  Settings,
  Logout,
  Notifications,
} from "@mui/icons-material";
import CharacterTypesSvg from "../../assets/icons/characterTypes.svg";
import RomanticWarriorIcon from "../../assets/icons/charactersdark/romanticwarrior.svg";
import DramaQueenIcon from "../../assets/icons/charactersdark/dramaqueen.svg";
import ComicSansIcon from "../../assets/icons/charactersdark/comicsans.svg";
import MysticWizardIcon from "../../assets/icons/charactersdark/mysticwizard.svg";
import ActionMonkeyIcon from "../../assets/icons/charactersdark/actionmonkey.svg";
import PerfectHarmonyIcon from "../../assets/icons/charactersdark/perfectharmony.svg";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
/* Other Stuff */
import ColumnBox from "../../Components/ColumnBox";
import { removeAccessToken } from "../../api/config";
import LinkItem from "./LinkItem";
import Avatar from "../../Components/Avatar";
import getCharacterColor from "../../Utilities/getCharacterColor";
const linkItems = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: <Notifications />,
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
    title: "Character types",
    url: "/characters",
    icon: <img src={CharacterTypesSvg} width={22} />,
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
      navigate("/login");
    }
  };

  const notificationsCount = parseInt(
    user?.pendingFriendRequests?.filter(
      (requestItem) => requestItem?.receiver == user?._id
    )?.length
  );

  return isSmScreen ? null : (
    <Grid
      item
      sm={2.5}
      className="sidebar full-height"
      py={2}
      sx={{
        position: "sticky",
        top: 0,
        borderRight: 3,
        borderColor: "secondary.light",
        overflowY: "clip",
        overflowX: "hidden",
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
          <Avatar name={user?.username} size={48} />
          <ColumnBox px={1}>
            <Typography fontSize={15} color={"#000"}>
              {`@${user?.username}` || "User"}
            </Typography>
            {!!user?.personality?.type?.length > 0 ? (
              <Typography
                fontSize={13}
                color={getCharacterColor(user?.personality?.type)}
                fontWeight={"bold"}
              >
                {user?.personality?.type}
              </Typography>
            ) : (
              <Link to="/match/personality-test">
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: 99,
                    py: 0,
                    fontSize: 12,
                  }}
                >
                  {" "}
                  Take The Quiz
                </Button>
              </Link>
            )}
          </ColumnBox>
        </Button>
      </Link>
      <Box>
        {linkItems.map((item, index) => (
          <React.Fragment key={item?.title}>
            <LinkItem
              title={item?.title}
              url={item?.url}
              onClick={item?.onClick}
              icon={item?.icon}
              notification={
                item?.title == "Notifications" ? notificationsCount : 0
              }
            />
            {!!(index == 4) && !!(user?.personality?.type?.length > 0) && (
              <Link to={"/your-type"}>
                <Button
                  sx={{
                    textTransform: "none",
                    borderRadius: 0,
                    width: "100%",
                    textAlign: "left",
                    justifyContent: "start",
                    color: "black",
                    height: 64,
                    paddingX: 4,
                    borderColor: "red",
                    fontWeight: "regular",
                  }}
                  startIcon={
                    user?.personality?.type == "Romantic Warrior" ? (
                      <img
                        src={RomanticWarriorIcon}
                        width={24}
                        alt="character icon"
                      />
                    ) : user?.personality?.type == "Drama Queen" ? (
                      <img
                        src={DramaQueenIcon}
                        width={24}
                        alt="character icon"
                      />
                    ) : user?.personality?.type == "Comic Sans" ? (
                      <img
                        src={ComicSansIcon}
                        width={24}
                        alt="character icon"
                      />
                    ) : user?.personality?.type == "Mystic Wizard" ? (
                      <img
                        src={MysticWizardIcon}
                        width={24}
                        alt="character icon"
                      />
                    ) : user?.personality?.type == "Action Monkey" ? (
                      <img
                        src={ActionMonkeyIcon}
                        width={24}
                        alt="character icon"
                      />
                    ) : (
                      <img
                        src={PerfectHarmonyIcon}
                        width={24}
                        alt="character icon"
                      />
                    )
                  }
                  size="large"
                >
                  <Typography>Yours: {user?.personality?.type}</Typography>
                </Button>
              </Link>
            )}
          </React.Fragment>
        ))}
        <LinkItem title={"Logout"} onClick={handleLogout} icon={<Logout />} />
      </Box>
    </Grid>
  );
};

export default Sidebar;
