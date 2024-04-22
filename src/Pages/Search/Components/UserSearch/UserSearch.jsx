import React, { useEffect, useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../../../../Services/Users";
import UserItem from "./UserItem";
import SearchLoader from "../../../../Components/Loaders/SearchLoader";
import NoResults from "../../../../Components/NoResults";
import CenteredBox from "../../../../Components/CenteredBox";
const UserSearch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [userList, setUserList] = useState({
    data: [],
    isLoading: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("searchMovies", searchParams.get("users")?.trim());
  }, []);

  useEffect(() => {
    if (watch("searchMovies")?.trim().length > 0) {
      handleSearch();
    }
  }, [watch("searchMovies")]);

  const handleSearch = async () => {
    setUserList((prevUserList) => ({ ...prevUserList, isLoading: true }));
    const newUserList = await getUsers(watch("searchMovies")?.trim());
    setUserList({ data: newUserList, isLoading: false });
    setSearchParams({ users: watch("searchMovies")?.trim() });
  };
  return (
    <Grid item xs={12} lg={6} mt={4}>
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

      <Grid container spacing={3} pt={4} pb={4} height={"100%"}>
        {userList.isLoading ? (
          <SearchLoader height={"70dvh"} />
        ) : userList?.data && userList?.data.length > 0 ? (
          <>
            <Grid item>
              <Typography color={"secondary"} fontSize={14}>
                {userList?.data?.length} results
              </Typography>
            </Grid>
            {userList?.data?.map((user) => (
              <UserItem key={user?._id} userData={user} />
            ))}
          </>
        ) : searchParams.get("users") ? (
          <NoResults height={"55dvh"} />
        ) : (
          <CenteredBox>Start exploring!</CenteredBox>
        )}
      </Grid>
    </Grid>
  );
};

export default UserSearch;
