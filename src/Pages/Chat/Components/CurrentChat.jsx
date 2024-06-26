import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import CenterLoader from "../../../Components/CenterLoader";
import CenteredBox from "../../../Components/CenteredBox";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { ChatContext } from "../Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Close } from "@mui/icons-material";
import { findLatestMessage } from "../../../Utilities/chatFunctions";
import UserContext from "../../../Contexts/User/UserContext";
import { Link } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import ColumnBox from "../../../Components/ColumnBox";
import { format } from "date-fns";
import getCharacterColor from "../../../Utilities/getCharacterColor";

const CurrentChat = ({ chatLoading }) => {
  const { user } = useContext(UserContext);
  const { crrChat, setCrrChat, setSearchParams } = useContext(ChatContext);
  const messageContainerRef = useRef();
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    //scroll to the bottom when new message arrives
    scrollToBottomChat();
    handleGetLatestMessageUnread();
  }, [crrChat]);

  const scrollToBottomChat = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
      });
    }
  };

  // BUNU BACKENDDE HALLETMEK LAZIM PROPERTY VERİP: isFirstMessageUnread: true diye
  const handleGetLatestMessageUnread = () => {
    const latestMessage = findLatestMessage(
      crrChat?.messages,
      crrChat?.participants?.find((participant) => participant.id == user?._id)
        ?.read
    );
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
        // sx={{
        //   backgroundColor:
        //     crrChat?.receiver?.personality?.type?.length > 0
        //       ? `${getCharacterColor(crrChat?.receiver?.personality?.type)}25`
        //       : "none",
        // }}
      >
        <Link to={`/profile/${crrChat?.receiver?.username}`}>
          <Box display={"flex"} alignItems={"center"} gap={1} pl={4}>
            <Avatar name={crrChat?.receiver?.username} size={40} />
            <Typography fontWeight={"bold"}>
              {crrChat?.receiver?.username}
            </Typography>
          </Box>
        </Link>
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
        height="calc(100vh - 120px)" //60 top- 60 bottom -> for desktop.. mind top navbar for mobile (56)
        width="100%"
        sx={{
          overflowY: "auto",
        }}
        py={2}
      >
        {crrChat?.messages?.length > 0 ? (
          crrChat?.messages?.map((message) => {
            if (message?.sender == "moviemate") {
              return (
                <ColumnBox pt={2} pb={4} width={"100%"}>
                  <Typography
                    fontSize={14}
                    color={"secondary"}
                    textAlign={"center"}
                  >
                    {" "}
                    {format(message?.createdAt, "dd/MM/yyyy") !==
                    format(new Date(), "dd/MM/yyyy")
                      ? format(message?.createdAt, "MMMM d, yyyy - HH:mm")
                      : format(message?.createdAt, "HH:mm")}{" "}
                    · {message?.content}
                  </Typography>
                </ColumnBox>
              );
            }
            return <Message key={message?._id} message={message} />;
          })
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
            setSearchParams({});
            setAnchorEl(null);
          }}
        >
          <Close
            sx={{
              mr: 1,
            }}
          />
          <Typography fontWeight={"medium"}>Close Chat</Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default CurrentChat;
