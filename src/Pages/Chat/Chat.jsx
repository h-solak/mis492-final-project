import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { createContext, useEffect, useRef, useState } from "react";
import {
  deleteMessage,
  getChat,
  getChatIdByUserId,
  getChatList,
  sendMessage,
} from "../../Services/Chat";
import Layout from "../../Layout/Layout";
import ChatPreview from "./Components/ChatPreview";
import CurrentChat from "./Components/CurrentChat";
import { ChatRounded, PersonSearch } from "@mui/icons-material";
import CenteredBox from "../../Components/CenteredBox";
import ChatSvg from "../../assets/illustrations/phonechat.svg";
import { io } from "socket.io-client";
import useUser from "../../Contexts/User/useUser";
import toast from "react-hot-toast";
import Avatar from "../../Components/Avatar";
import ChatPreviewLoader from "./Components/ChatPreviewLoader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../Components/Modals/Modal";
import { getUsers } from "../../Services/Users";

export const ChatContext = createContext();

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  let [searchParams, setSearchParams] = useSearchParams();
  const [chatPreviewsAreLoading, setChatPreviewsAreLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [chats, setChats] = useState([]); //all chat previews on the left
  const [crrChat, setCrrChat] = useState({}); //the chat user is on
  const [content, setContent] = useState(""); //input
  const [userIsOnChat, setUserIsOnChat] = useState(false);
  const socket = useRef(null);

  const [friends, setFriends] = useState([]);
  const [friendsModal, setFriendsModal] = useState(false);

  const handleGetFriends = async () => {
    const userFriends = user?.friends?.map((friend) => friend?.id);
    if (!userFriends?.length > 0) return;
    const usersData = await getUsers(userFriends);
    setFriends(usersData);
  };

  useEffect(() => {
    /* Get chats on page load */
    handleGetChats();

    handleGetFriends(); //for friends modal *to message*

    if (searchParams.get("chatId")) {
      handleGetChat(searchParams.get("chatId"));
    }

    //start socket ( https:// )
    socket.current = io(
      "ws://localhost:15492" || "ws://movie-mate-492.netlify.app"
    );
    socket.current.emit("addUser", user?._id);
    socket.current.on("getMessage", (data) => {
      updateChatsAfterNewMessage(data);
    });
    return () => socket.current.disconnect();
  }, []);

  const handleGetChats = async () => {
    const allChats = await getChatList();
    setChats(allChats);
    setChatPreviewsAreLoading(false);
  };

  const handleGetChat = async (chatId, showLoadingEffect = false) => {
    setSearchParams({ chatId: chatId });
    if (showLoadingEffect) {
      //if this function is called because a new message sent, don't use loading effect
      setChatLoading(true);
    }
    const newCrrChat = await getChat({ chatId: chatId });
    setCrrChat(newCrrChat);
    setChatLoading(false);
    setUserIsOnChat(true);
    await handleGetChats(); //call this at the end to update chat previews
  };

  const handleSendMessage = async (content) => {
    if (content) {
      const chatId = await sendMessage({
        chatId: crrChat?._id,
        content: content,
      });

      socketSendOrDeleteMessage();

      console.log(
        "receiver!!!",
        crrChat?.participants?.find(
          (participant) => participant.id !== user?._id
        )?.id
      );
      setContent("");
      await handleGetChat(chatId, false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (messageId) {
      const chatId = await deleteMessage({
        chatId: crrChat?._id,
        messageId: messageId,
      });
      socketSendOrDeleteMessage();
      await handleGetChat(chatId, false);
    }
  };

  const socketSendOrDeleteMessage = (isEmptyMessage = false) => {
    socket.current.emit("sendOrDeleteMessage", {
      senderId: user?._id,
      receiverId: crrChat?.participants?.find(
        (participant) => participant.id !== user?._id
      )?.id,
      content: isEmptyMessage ? "" : content,
      chatId: crrChat?._id,
      username: user?.username,
      avatar: user?.crrAvatar,
    });
  };

  /*----- SOCKET OPERATIONS -----*/
  /* If user is on the chat currently, refresh chat messages and previews -- but if user is not, then only refresh the preview*/
  const updateChatsAfterNewMessage = (data) => {
    const chatId = data?.chatId;
    handleGetChats();
    /* !!! If we don't use the setter function below, socket won't be able to see the state (it will see the initial state which is empty obj)*/
    setCrrChat((prevCrrChat) => {
      if (chatId == prevCrrChat?._id) {
        //if user is currently on the chat that has a new message, get it
        handleGetChat(chatId, false);
        socketSendOrDeleteMessage(true); //to update read status for the other user when new message arrives and is read
      } else {
        //if new message has arrived and user is not on that chat
        if (data?.content) {
          toast(() => (
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Box display={"flex"} alignItems={"center"} gap={0.5}>
                <Avatar name={data?.username} size={24} />
                <Typography fontWeight={"bold"}>{data?.username}:</Typography>
                <Typography>
                  {data?.content?.length > 12
                    ? `${data?.content.slice(0, 12)}...`
                    : data?.content}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleGetChat(chatId, false)}
              >
                Reply
              </Button>
            </Box>
          ));
        }
      }
      const copyPrevCrrChat = prevCrrChat;
      return copyPrevCrrChat;
    });
  };

  //inside friends modal
  const handleOpenChatOrCreateOne = async (id, isMatch) => {
    //SHOULD CREATE CHAT AND SET THE FIRST MESSAGE TO ***YOU ARE A MATCH***
    const chatId = await getChatIdByUserId(id, isMatch);
    if (chatId) {
      handleGetChat(chatId);
      setFriendsModal(false);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout disablePaddingX disablePaddingY>
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
          chatPreviewsAreLoading,
          searchParams,
          setSearchParams,
        }}
      >
        {/* User - Chat List  */}
        <Grid
          className="full-height"
          item
          xs={12}
          md={4}
          pb={4}
          border={2}
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
              <Typography variant="h6" fontWeight={"bold"}>
                Chats
              </Typography>
            </Box>
          </Grid>
          <Grid
            container
            sx={{
              overflowY: "auto",
              maxHeight: "calc(100% - 66px)",
            }}
          >
            <Grid
              item
              xs={12}
              className="light-hvr"
              display={"flex"}
              alignItems={"center"}
              gap={1}
              px={4}
              py={1}
              borderBottom={2}
              borderColor={"secondary.light"}
              sx={{
                cursor: "pointer",
              }}
              height={60}
              onClick={() => setFriendsModal(true)}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <PersonSearch />
                <Typography fontWeight={600}>Find your friends</Typography>
              </Box>
            </Grid>
            {!!chatPreviewsAreLoading && <ChatPreviewLoader />}
            {chats?.length > 0 ? (
              chats?.map((chatPreviewItem) => (
                <ChatPreview
                  key={chatPreviewItem?.chatId}
                  chat={chatPreviewItem}
                />
              ))
            ) : !chatPreviewsAreLoading ? (
              <CenteredBox>
                <Typography>There are no chats yet!</Typography>
              </CenteredBox>
            ) : null}
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
                {chats?.length > 0
                  ? "Click on a chat to start the conversation!"
                  : "Find new friends using MovieMate and comeback to chat with them!"}
              </Typography>
            </CenteredBox>
          )}
        </Grid>
        {/* Friends Modal */}
        <Modal isModalOpen={friendsModal} setIsModalOpen={setFriendsModal}>
          <Grid
            container
            spacing={3}
            sx={{
              overflowY: "scroll",
              height: "60vh",
            }}
          >
            <Grid item xs={12}>
              <Typography fontSize={18} fontWeight={700}>
                Your Friends
              </Typography>
            </Grid>
            {!!friends?.length > 0 &&
              friends?.map((friend) => {
                const { _id, username } = friend;
                const isMatched =
                  user?.friends?.find((userItem) => userItem?.id == _id)
                    ?.type == "match";
                return (
                  <Grid
                    item
                    xs={12}
                    key={_id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    px={2}
                  >
                    <Link to={`/profile/${username}`}>
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Avatar
                          name={username}
                          size={40}
                          style={{
                            boxShadow:
                              user?._id == _id
                                ? "rgba(0, 0, 0, 0.16) 0px 1px4px, rgba(255, 0, 0, 0.8) 0px 0px 0px 3px"
                                : 0,
                          }}
                          isMatched={isMatched}
                        />{" "}
                        <Typography>{username}</Typography>
                      </Box>
                    </Link>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ChatRounded />}
                      onClick={() =>
                        handleOpenChatOrCreateOne(_id, isMatched ? "yes" : "no")
                      }
                    >
                      Message
                    </Button>
                  </Grid>
                );
              })}
          </Grid>
        </Modal>
      </ChatContext.Provider>
    </Layout>
  );
};

export default Chat;
