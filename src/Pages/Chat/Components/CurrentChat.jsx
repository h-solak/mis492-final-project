import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import AvatarImg from "../../../Components/AvatarImg";
import CenterLoader from "../../../Components/CenterLoader";
import CenteredBox from "../../../Components/CenteredBox";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../../Services/Chat";
import Message from "./Message";
import { ChatContext } from "../Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Close } from "@mui/icons-material";

const CurrentChat = ({ chatLoading }) => {
  const { crrChat, setCrrChat } = useContext(ChatContext);
  const messageContainerRef = useRef();
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    //scroll to the bottom when new message arrives
    scrollToBottomChat();
  }, [crrChat]);

  const scrollToBottomChat = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        // behavior: "smooth", //this is slow if the previous chat 10+ messages
      });
    }
  };

  return chatLoading ? (
    <CenterLoader />
  ) : (
    <Grid container>
      {/* Top bar  */}
      <Grid
        item
        xs={12}
        py={1}
        height={60}
        borderTop={2}
        borderBottom={2}
        borderColor={"secondary.light"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"} gap={1} pl={4}>
          <AvatarImg no={crrChat?.receiver?.avatar} width={40} />
          <Typography fontWeight={600}>
            {crrChat?.receiver?.username}
          </Typography>
        </Box>
        <IconButton
          sx={{ mr: 2 }}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Grid>

      {/* Messages */}
      <Grid
        ref={messageContainerRef}
        height="calc(100vh - 176px)" //60 top- 60 bottom -56 top navbar ->
        width="100%"
        sx={{
          overflowY: "auto",
        }}
        py={2}
      >
        {crrChat?.messages?.length > 0 ? (
          crrChat?.messages?.map((message) => (
            <Message key={message?._id} message={message} />
          ))
        ) : (
          <CenteredBox>Start the conversation!</CenteredBox>
        )}
      </Grid>

      {/* Input */}
      <Grid item xs={12}>
        <MessageInput />
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
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            setCrrChat({});
            setAnchorEl(null);
          }}
        >
          <Close
            sx={{
              mr: 1,
            }}
          />
          <Typography fontWeight={500}>Close Chat</Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default CurrentChat;
