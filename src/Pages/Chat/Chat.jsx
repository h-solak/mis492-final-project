import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { getChat, getChatList, sendMessage } from "../../Services/Chat";
import Layout from "../../Layout/Layout";
import AvatarImg from "../../Components/AvatarImg";
import ColumnBox from "../../Components/ColumnBox";
import ChatPreview from "./Components/ChatPreview";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CurrentChat from "./Components/CurrentChat";
import { ChatRounded } from "@mui/icons-material";

export const ChatContext = createContext();

const Chat = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [chats, setChats] = useState([]); //all chat previews on the left
  const [crrChat, setCrrChat] = useState({}); //the chat user is on
  const [content, setContent] = useState(""); //input

  const getChats = async () => {
    const allChats = await getChatList();
    setChats(allChats);
    setPageLoading(false);
  };

  useEffect(() => {
    getChats();
  }, []);

  const handleGetChat = async (chatId, newMessage = false) => {
    if (!newMessage) {
      //if this function is called because a new message sent, don't use loading effect
      setChatLoading(true);
    }

    const newCrrChat = await getChat({ chatId: chatId });
    console.log("bu", newCrrChat);
    setCrrChat(newCrrChat);
    setChatLoading(false);
  };

  const handleSendMessage = async (content) => {
    if (content) {
      const chatId = await sendMessage({
        chatId: crrChat?._id,
        content: content,
      });
      setContent("");
      handleGetChat(chatId, true); // FIX THIS
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        crrChat,
        setCrrChat,
        content,
        setContent,
        handleSendMessage,
      }}
    >
      <Layout pageLoading={pageLoading} disablePaddingX disablePaddingY>
        {/* User - Chat List  */}
        <Grid
          className="full-height"
          item
          xs={12}
          md={4}
          pb={4}
          borderRight={2}
          borderColor={"secondary.light"}
        >
          <Grid
            item
            xs={12}
            py={2}
            pl={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            height={60}
            borderBottom={2}
            borderColor={"secondary.light"}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <ChatRounded />
              <Typography variant="h6" fontWeight={600}>
                Chats
              </Typography>
            </Box>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            sx={{
              overflowY: "auto",
              maxHeight: "calc(100% - 80px)",
            }}
          >
            {chats?.length > 0 ? (
              chats?.map((chat) => (
                <ChatPreview
                  key={chat?.chatId}
                  chat={chat}
                  handleGetChat={handleGetChat}
                />
              ))
            ) : (
              <Box>No chats found</Box>
            )}
          </Grid>
          <Typography
            textAlign={"center"}
            py={1}
            px={2}
            color={"secondary"}
            sx={{
              position: "absolute",
              bottom: 0,
            }}
          >
            MovieMate® 2024
          </Typography>
        </Grid>
        {/* Chat Messages */}
        <Grid item xs={12} md={8}>
          {crrChat?._id ? (
            <CurrentChat
              chat={crrChat}
              chatLoading={chatLoading}
              handleGetChat={handleGetChat}
            />
          ) : (
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              Click a chat to start it!
            </Box>
          )}
        </Grid>
      </Layout>
    </ChatContext.Provider>
  );
};

export default Chat;
