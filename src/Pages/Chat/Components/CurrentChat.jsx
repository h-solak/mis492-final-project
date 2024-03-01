import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import AvatarImg from "../../../Components/AvatarImg";
import CenterLoader from "../../../Components/CenterLoader";
import CenteredBox from "../../../Components/CenteredBox";
import MessageInput from "./MessageInput";
import { sendMessage } from "../../../Services/Chat";
import Message from "./Message";
import { ChatContext } from "../Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CurrentChat = ({ chatLoading }) => {
  const { crrChat } = useContext(ChatContext);
  const messageContainerRef = useRef();

  useEffect(() => {
    // if (messageContainerRef.current) {
    //   messageContainerRef.current.scrollTop =
    //     messageContainerRef.current.scrollHeight;
    // }
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [crrChat]);

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
        <IconButton sx={{ mr: 2 }}>
          <MoreVertIcon />
        </IconButton>
      </Grid>

      {/* Messages */}
      <Grid
        ref={messageContainerRef}
        height="calc(100vh - 200px)" //60 top-60 bottom-80 navbar
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
    </Grid>
  );
};

export default CurrentChat;
