import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { createContext, useEffect, useRef, useState } from "react";
import {
  deleteMessage,
  getChat,
  getChatList,
  sendMessage,
} from "../../Services/Chat";
import Layout from "../../Layout/Layout";
import ChatPreview from "./Components/ChatPreview";
import CurrentChat from "./Components/CurrentChat";
import { ChatRounded } from "@mui/icons-material";
import CenteredBox from "../../Components/CenteredBox";
import ChatSvg from "../../assets/illustrations/phonechat.svg";
import { io } from "socket.io-client";
import useUser from "../../Contexts/User/useUser";

export const ChatContext = createContext();

const Chat = () => {
  const { user } = useUser();
  const [pageLoading, setPageLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [chats, setChats] = useState([]); //all chat previews on the left
  const [crrChat, setCrrChat] = useState({}); //the chat user is on
  const [content, setContent] = useState(""); //input
  const [userIsOnChat, setUserIsOnChat] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    handleGetChats();
    handleSocketOnStart();
  }, []);

  const handleSocketOnStart = async () => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user?._id);
    socket.current.on("getMessage", async (data) => {
      console.log("1", crrChat?._id, "2", data);
      console.log("MESAJ ULAŞTI KOOOOOOOOOOŞ");
      if (data?.chatId != crrChat?._id) {
        //if user is not on the chat currently, just refresh the previews
        // NOT WORKING !!!!!!!!
        await handleGetChats();
        await handleGetChat(data?.chatId, false); //SHOULD BE REMOVED
      } else {
        await handleGetChats();
        await handleGetChat(data?.chatId, false);
      }
    });
  };

  const handleGetChats = async () => {
    const allChats = await getChatList();
    setChats(allChats);
    setPageLoading(false);
  };

  const handleGetChat = async (chatId, showLoadingEffect = false) => {
    if (showLoadingEffect) {
      //if this function is called because a new message sent, don't use loading effect
      setChatLoading(true);
    }
    const newCrrChat = await getChat({ chatId: chatId });
    setCrrChat(newCrrChat);
    setChatLoading(false);
    setUserIsOnChat(true);
  };

  const handleSendMessage = async (content) => {
    if (content) {
      const chatId = await sendMessage({
        chatId: crrChat?._id,
        content: content,
      });
      socket.current.emit("sendMessage", {
        senderId: user?._id,
        receiverId: crrChat?.participants?.find((id) => id !== user?._id),
        text: content,
        chatId: crrChat?._id,
      });
      setContent("");
      handleGetChat(chatId, false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (messageId) {
      const chatId = await deleteMessage({
        chatId: crrChat?._id,
        messageId: messageId,
      });
      handleGetChat(chatId, false);
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
        handleGetChat,
        handleSendMessage,
        handleDeleteMessage,
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
          </Grid>
          <Grid
            container
            sx={{
              overflowY: "auto",
              maxHeight: "calc(100% - 80px)",
            }}
          >
            {chats?.length > 0 ? (
              chats?.map((chatPreviewItem) => (
                <ChatPreview
                  key={chatPreviewItem?.chatId}
                  chat={chatPreviewItem}
                />
              ))
            ) : (
              <CenteredBox height={"70vh"}>
                <Typography fontWeight={600}>No chats found</Typography>
              </CenteredBox>
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
            <CurrentChat chatLoading={chatLoading} />
          ) : (
            <CenteredBox flexDirection="column" gap={2}>
              <img src={ChatSvg} width={200} />
              <Typography color={"secondary"}>
                Click on a chat to start the conversation!
              </Typography>
            </CenteredBox>
          )}
        </Grid>
      </Layout>
    </ChatContext.Provider>
  );
};

export default Chat;
