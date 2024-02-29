import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import AvatarImg from "../../../Components/AvatarImg";
import ColumnBox from "../../../Components/ColumnBox";
import * as dayjs from "dayjs";

const ChatPreview = ({ chat, handleGetChat }) => {
  const crrDate = new Date();
  let lastMessageDate;

  if (
    dayjs(chat?.lastMessage?.createdAt).format("DD/MM/YYYY") !==
    dayjs(crrDate).format("DD/MM/YYYY")
  ) {
    //from now DOESNT WORK
    // lastMessageDate = dayjs(chat?.lastMessage?.createdAt).fromNow();
    lastMessageDate = dayjs(chat?.lastMessage?.createdAt).format("DD/MM/YYYY");
  } else {
    lastMessageDate = dayjs(chat?.lastMessage?.createdAt).format("HH:mm");
  }

  return (
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
      onClick={() => handleGetChat(chat?.chatId)}
    >
      <AvatarImg no={chat?.userAvatar} width={64} />
      <ColumnBox width={"100%"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography fontWeight={600}>{chat?.username}</Typography>
          {chat?.lastMessage ? (
            <Typography color={"secondary"} fontSize={12}>
              {lastMessageDate}
            </Typography>
          ) : null}
        </Box>
        <Typography color={"secondary"}>
          {chat?.lastMessage?.content?.length > 10
            ? `${chat?.lastMessage?.content?.slice(0, 10)}...`
            : chat?.lastMessage?.content}
        </Typography>
      </ColumnBox>
    </Grid>
  );
};

export default ChatPreview;
