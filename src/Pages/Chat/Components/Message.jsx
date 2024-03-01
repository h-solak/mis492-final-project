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
import dayjs from "dayjs";
import { ChatContext } from "../Chat";
import { ContentCopy, DeleteOutline } from "@mui/icons-material";

const Message = ({ message }) => {
  const { handleDeleteMessage } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { user } = useUser();
  const isReceiver = message?.sender != user?._id;
  return (
    <>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={isReceiver ? "start" : "end"}
        px={4}
      >
        <Paper
          sx={{
            display: "inline-block",
            maxWidth: "70%",
            padding: "8px",
            marginBottom: "8px",
            borderRadius: "10px",
            wordWrap: "break-word",
            backgroundColor: isReceiver ? "#f0f0f0" : "primary.main",
            color: isReceiver ? "#000" : "#fff",
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setAnchorEl(e.currentTarget);
          }}
        >
          {message?.content}
          <Typography
            fontSize={10}
            color={isReceiver ? "#999" : "#d9d9d9"}
            textAlign={"end"}
          >
            {dayjs(message?.createdAt).format("HH:mm")}
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
          <Typography fontWeight={500}>Copy</Typography>
        </MenuItem>
        {!isReceiver ? (
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
            <Typography fontWeight={500}>Delete</Typography>
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
};

export default Message;
