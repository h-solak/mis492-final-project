import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import ColumnBox from "../../../Components/ColumnBox";
import { ChatContext } from "../Chat";
import { format } from "date-fns";
import Avatar from "../../../Components/Avatar";
import useUser from "../../../Contexts/User/useUser";

const ChatPreview = ({ chat }) => {
  const { user } = useUser();
  const { handleGetChat } = useContext(ChatContext);
  const crrDate = new Date();

  let lastMessageDate;

  if (chat?.lastMessage?.createdAt) {
    if (
      //if the last message is not today, format it differently
      format(chat?.lastMessage?.createdAt, "dd MM yyyy") !==
      format(crrDate, "dd MM yyyy")
    ) {
      lastMessageDate = format(chat?.lastMessage?.createdAt, "dd/MM/yyyy");
    } else {
      lastMessageDate = format(chat?.lastMessage?.createdAt, "HH:mm");
    }
  }

  let lastMessageContent = "";
  if (chat?.lastMessage?.sender == user?._id) {
    lastMessageContent = "You: " + chat?.lastMessage?.content;
  } else {
    lastMessageContent = chat?.lastMessage?.content;
  }

  return (
    <Grid
      item
      xs={12}
      className="light-hvr"
      display={"flex"}
      alignItems={"center"}
      gap={1}
      px={2}
      py={1}
      borderBottom={2}
      borderColor={"secondary.light"}
      sx={{
        cursor: "pointer",
      }}
      onClick={() => handleGetChat(chat?.chatId, true)}
    >
      <Avatar name={chat?.username} size={48} />
      <ColumnBox width={"100%"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <ColumnBox>
            <Typography fontWeight={"bold"}>{chat?.username}</Typography>
            <Typography
              fontSize={14}
              color={"secondary.main"}
              fontWeight={chat?.unreadMessagesCount > 0 ? "medium" : "regular"}
              maxWidth={100}
              maxHeight={60}
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {lastMessageContent}
            </Typography>
          </ColumnBox>
          {chat?.lastMessage ? (
            <ColumnBox justifyContent="space-between">
              <Typography
                color={
                  chat?.unreadMessagesCount > 0 ? "primary.light" : "secondary"
                }
                fontWeight={chat?.unreadMessagesCount > 0 ? "bold" : "regular"}
                fontSize={12}
              >
                {lastMessageDate}
              </Typography>
              {chat?.unreadMessagesCount > 0 ? (
                <Box
                  sx={{
                    backgroundColor: "primary.light",
                    p: 0.5,
                    borderRadius: 99,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 11,
                    height: 24,
                    width: 24,
                    alignSelf: "end",
                  }}
                >
                  {chat?.unreadMessagesCount > 10
                    ? "10+"
                    : chat?.unreadMessagesCount}
                </Box>
              ) : null}
            </ColumnBox>
          ) : null}
        </Box>
      </ColumnBox>
    </Grid>
  );
};

export default ChatPreview;
