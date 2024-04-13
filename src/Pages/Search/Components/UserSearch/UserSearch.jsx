import React, { useEffect, useState } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../../../../Services/Users";
import UserItem from "./UserItem";
const UserSearch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (searchParams.get("users")) {
      setValue("searchMovies", searchParams.get("users"));
    }
  }, []);

  useEffect(() => {
    if (watch("searchMovies")?.length > 0) {
      handleSearch();
    }
  }, [watch("searchMovies")]);

  const handleSearch = async () => {
    const newUserList = await getUsers(watch("searchMovies"));
    setUserList(newUserList);
    setSearchParams({ users: watch("searchMovies")?.trim() });
  };
  return (
    <Grid item xs={12} mt={4}>
      <TextField
        placeholder="Search for users..."
        InputProps={{
          startAdornment: <SearchRounded color="disabled" sx={{ mr: 1 }} />,
          endAdornment: watch("searchMovies") ? (
            <IconButton
              onClick={() => {
                setValue("searchMovies", "");
                setSearchParams({});
              }}
              sx={{
                mr: -1,
              }}
            >
              <CloseRounded
                color="disabled"
                sx={{
                  cursor: "pointer",
                }}
              />
            </IconButton>
          ) : null,
          style: {
            borderRadius: 99,
            height: 40,
          },
        }}
        fullWidth
        {...register("searchMovies", {
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
        sx={{
          fontSize: 16,
        }}
      />

      <Grid container spacing={3} mt={2}>
        {userList
          ? userList?.map((user) => (
              <UserItem key={user?._id} userData={user} />
            ))
          : null}
      </Grid>
    </Grid>
  );
};

export default UserSearch;
