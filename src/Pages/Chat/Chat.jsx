import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getChatList } from "../../Services/Chat";
import Layout from "../../Layout/Layout";
import AvatarImg from "../../Components/AvatarImg";
import ColumnBox from "../../Components/ColumnBox";

const Chat = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const getChats = async () => {
    const allChats = await getChatList();
    setChats(allChats);
    setPageLoading(false);
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <Layout pageLoading={pageLoading} disablePaddingX disablePaddingY>
      {/* User - Chat List  */}
      <Grid item xs={12} md={4} py={4} px={4}>
        <Grid container>
          <Typography variant="h6">Chats</Typography>
          {chats?.length > 0 ? (
            chats?.map((chat) => (
              <Grid
                key={chat?.chatId}
                item
                xs={12}
                mt={2}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <AvatarImg no={chat?.userAvatar} width={64} />
                <ColumnBox>
                  <Typography fontWeight={600}>{chat?.username}</Typography>
                  <Typography color={"secondary"}>No Messages..</Typography>
                </ColumnBox>
              </Grid>
            ))
          ) : (
            <Box>No chats found</Box>
          )}
        </Grid>
      </Grid>
      {/* Chat Messages */}
      <Grid item xs={12} md={8} py={4} px={4}>
        Messages
      </Grid>
    </Layout>
  );
};

export default Chat;
