import React, { useEffect, useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { CloseRounded, People, SearchRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { getUsersWithUsernameSearch } from "../../../../Services/Users";
import UserItem from "./UserItem";
import SearchLoader from "../../../../Components/Loaders/SearchLoader";
import NoResults from "../../../../Components/NoResults";
import CenteredBox from "../../../../Components/CenteredBox";
import ColumnBox from "../../../../Components/ColumnBox";
import PeopleSvg from "../../../../assets/illustrations/people.svg";

const UserSearch = ({ searchParams, setSearchParams }) => {
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
    setSearchParams((prevParams) => ({
      ...prevParams,
      type: "users",
    }));
    setValue("users", searchParams.get("users")?.trim());
  }, []);

  useEffect(() => {
    if (watch("users")?.trim().length > 0) {
      handleSearch();
    }
  }, [watch("users")]);

  const handleSearch = async () => {
    setUserList((prevUserList) => ({ ...prevUserList, isLoading: true }));
    const newUserList = await getUsersWithUsernameSearch(
      watch("users")?.trim()
    );
    setUserList({ data: newUserList, isLoading: false });
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      users: watch("users")?.trim(),
    }));
  };
  return (
    <Grid item xs={12} lg={6} mt={4}>
      <TextField
        autoFocus
        placeholder="Search for users..."
        InputProps={{
          startAdornment: <SearchRounded color="disabled" sx={{ mr: 1 }} />,
          endAdornment: watch("users") ? (
            <IconButton
              onClick={() => {
                setValue("users", "");
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
        {...register("users", {
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
          <CenteredBox>
            <ColumnBox alignItems="center">
              <img
                className="fade-in-ltr"
                src={PeopleSvg}
                width={250}
                alt="people"
              />
              <Typography className="fade-in-rtl" mt={1} color={"secondary"}>
                Start exploring new potential friends!
              </Typography>
            </ColumnBox>
          </CenteredBox>
        )}
      </Grid>
    </Grid>
  );
};

export default UserSearch;
