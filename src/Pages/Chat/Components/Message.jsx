import {
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
  makeStyles,
} from "@mui/material";
import React, { useContext, useState } from "react";
import useUser from "../../../Contexts/User/useUser";
import { ChatContext } from "../Chat";
import { ContentCopy, DeleteOutline } from "@mui/icons-material";
import { format } from "date-fns";

function isDateToday(date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

const Message = ({ message }) => {
  const { handleDeleteMessage } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { user } = useUser();
  const isUserSender = message?.sender == user?._id;
  return (
    <>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={isUserSender ? "end" : "start"}
        px={4}
      >
        <Paper
          sx={{
            display: "inline-block",
            minWidth: 100,
            maxWidth: "70%",
            py: 0.8,
            px: 1,
            marginBottom: "8px",
            borderRadius: "10px",
            wordWrap: "break-word",
            backgroundColor: isUserSender ? "primary.main" : "#f0f0f0",
            color: isUserSender ? "#fff" : "#000",
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setAnchorEl(e.currentTarget);
          }}
        >
          <Typography>{message?.content}</Typography>
          <Typography
            fontSize={10}
            color={isUserSender ? "#d9d9d9" : "#999"}
            textAlign={"end"}
          >
            {format(message?.createdAt, "dd/MM/yyyy") !==
            format(new Date(), "dd/MM/yyyy")
              ? format(message?.createdAt, "MMMM d, yyyy - HH:mm")
              : format(message?.createdAt, "HH:mm")}
          </Typography>
        </Paper>
      </Grid>
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
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(message?.content);
            setAnchorEl(null);
          }}
        >
          <ContentCopy
            sx={{
              mr: 1,
            }}
          />
          <Typography fontWeight={"medium"}>Copy</Typography>
        </MenuItem>
        {isUserSender ? (
          <MenuItem
            onClick={() => {
              handleDeleteMessage(message?._id);
              setAnchorEl(null);
            }}
          >
            <DeleteOutline
              sx={{
                mr: 1,
              }}
            />
            <Typography fontWeight={"medium"}>Delete</Typography>
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
};

export default Message;
