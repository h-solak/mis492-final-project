import React, { useState } from "react";
/* Material UI */
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useUser from "../../Contexts/User/useUser";

/* Avatar */
import Avatar0 from "../../assets/Avatars/spiritedaway.svg";
import AvatarImg from "../AvatarImg";
import { useNavigate } from "react-router-dom";

const ProfilePopover = ({ logout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useUser();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        sx={{ color: "primary", textTransform: "none", fontWeight: "bold" }}
      >
        <AvatarImg no={user?.crrAvatar} width={32} style={{ marginRight: 4 }} />
        {/* {user?.username || "User"} */}
        <KeyboardArrowDownIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List
          sx={{
            width: "100%",
          }}
        >
          {/* <ListItem disablePadding onClick={() => null}>
            <ListItemButton sx={{ gap: 1 }}>
              <ListItemText
                primary={"Change Language"}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            disablePadding
            onClick={() => navigate(`/profile/${user?.username}`)}
            sx={{
              width: "100%",
            }}
          >
            <ListItemButton>
              <ListItemText
                primary={"My Profile"}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={logout}
            sx={{
              width: "100%",
            }}
          >
            <ListItemButton>
              <ListItemText
                primary={"Log out"}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};
export default ProfilePopover;
