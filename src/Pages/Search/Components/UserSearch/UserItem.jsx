import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import AvatarImg from "../../../../Components/AvatarImg";
import ColumnBox from "../../../../Components/ColumnBox";
import { HourglassFull, PersonAdd, PersonRemove } from "@mui/icons-material";
import useUser from "../../../../Contexts/User/useUser";

const UserItem = ({ userData }) => {
  const { user } = useUser();
  const { _id, username, crrAvatar, friends, desc } = userData;
  const isFriend = user?.friends?.includes(_id);
  return (
    <Grid item xs={12} display={"flex"} alignItems={"center"} gap={1}>
      {isFriend ? (
        <Button
          size="small"
          variant="outlined"
          color="dark"
          startIcon={<PersonRemove />}
        >
          Remove
        </Button>
      ) : !"Pending" ? (
        <Button
          size="small"
          variant="outlined"
          color="dark"
          startIcon={<HourglassFull />}
        >
          Pending
        </Button>
      ) : (
        <Button
          size="small"
          variant="outlined"
          color="dark"
          startIcon={<PersonAdd />}
        >
          Friend
        </Button>
      )}
      <AvatarImg no={crrAvatar} width={48} />
      <ColumnBox>
        <Typography>@{username}</Typography>
        <Typography color={"secondary"} fontSize={14}>
          {desc}
        </Typography>
      </ColumnBox>
    </Grid>
  );
};

export default UserItem;
