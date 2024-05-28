import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ColumnBox from "../../Components/ColumnBox";
import Avatar from "../../Components/Avatar";
import useUser from "../../Contexts/User/useUser";
import { useForm } from "react-hook-form";
import TextfieldError from "../../Components/Forms/TextFieldError";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import cities from "../../constants/cities";
import { changePrivacySettings, updateUser } from "../../Services/User";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, setUser } = useUser();
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: user?.privacy?.profileVisible,
    friendsListVisible: user?.privacy?.friendsListVisible,
    matchedFriendsVisible: user?.privacy?.matchedFriendsVisible,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const crrUser = await updateUser({
      username: data?.username,
      gender: data?.gender,
      city: data?.city,
      birthday: data?.birthday,
      about: data?.about,
    });

    console.log("new", crrUser);

    if (crrUser?._id) {
      setUser(crrUser);
    }
  };

  useEffect(() => {
    console.log(privacySettings);
  }, [privacySettings]);

  const handlePrivacyChange = async (event, action) => {
    let newSettings;
    if (action == "profileVisible") {
      newSettings = {
        ...privacySettings,
        profileVisible: event.target.checked,
      };
    } else if (action == "friendsListVisible") {
      newSettings = {
        ...privacySettings,
        friendsListVisible: event.target.checked,
      };
    } else {
      newSettings = {
        ...privacySettings,
        matchedFriendsVisible: event.target.checked,
      };
    }

    console.log("result", newSettings);
    const crrUser = await changePrivacySettings(newSettings);
    setPrivacySettings(newSettings);

    setUser(crrUser);
  };

  return (
    <Layout>
      <Breadcrumbs
        links={[
          {
            title: `Settings`,
            url: `/settings`,
          },
        ]}
      />
      <Grid container>
        <Grid item xs={12}>
          <ColumnBox mt={1} mb={2}>
            <Typography fontSize={20} fontWeight={"bolder"} mb={-0.5}>
              Settings
            </Typography>
            <Typography>
              Change your profile information, or password.
            </Typography>
          </ColumnBox>
        </Grid>

        {/* Details Form */}
        <Grid
          item
          xs={12}
          mt={4}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography fontWeight={600} pb={1}>
            Public Profile
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
            sx={{
              border: 1,
              borderColor: "primary.light",
              borderRadius: 4,
              p: 8,
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Avatar name={user?.username} size={140} />
            </Box>
            <ColumnBox gap={3}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography
                  fontWeight={600}
                  sx={{
                    width: 100,
                  }}
                >
                  Nickname
                </Typography>
                <TextField
                  defaultValue={user?.username}
                  size="small"
                  sx={{
                    flex: 1,
                  }}
                  {...register("username", {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  })}
                  inputProps={{ maxLength: 20 }}
                />
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography
                  fontWeight={600}
                  sx={{
                    width: 100,
                  }}
                >
                  Gender
                </Typography>
                <Select
                  defaultValue={user?.gender || "female"}
                  {...register("gender", {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  })}
                  size="small"
                  sx={{
                    flex: 1,
                  }}
                >
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                </Select>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography
                  fontWeight={600}
                  sx={{
                    width: 100,
                  }}
                >
                  City
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={user?.city || "İstanbul"}
                  {...register("city", {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  })}
                  size="small"
                  sx={{
                    flex: 1,
                  }}
                >
                  {cities?.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography
                  fontWeight={600}
                  sx={{
                    width: 100,
                  }}
                >
                  Birthday
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={
                      dayjs(user?.birthday) || dayjs(new Date("01/01/2005"))
                    }
                    sx={{
                      fontSize: 14,
                    }}
                    slotProps={{ textField: { size: "small" } }}
                    // {...register("birthday", {
                    //   required: true,
                    // })}
                    onChange={(value) => setValue("birthday", value)}
                  />
                </LocalizationProvider>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography
                  fontWeight={600}
                  sx={{
                    width: 100,
                  }}
                >
                  About
                </Typography>
                <TextField
                  defaultValue={user?.desc}
                  multiline
                  rows={3}
                  size="small"
                  {...register("about", {
                    required: true,
                    maxLength: 75,
                  })}
                  maxLength={10}
                  sx={{
                    fontSize: 12,
                    flex: 1,
                  }}
                  inputProps={{ maxLength: 75 }}
                />
              </Box>

              <Button
                variant="contained"
                type="submit"
                disabled={
                  !!(
                    watch("username") == user?.username &&
                    watch("gender") == user?.gender &&
                    watch("birthday") == user?.birthday &&
                    watch("about") == user?.desc
                  )
                }
              >
                Save
              </Button>
            </ColumnBox>
          </Box>
        </Grid>

        <Grid item xs={12} mt={8}>
          <Typography fontWeight={700} fontSize={18}>
            Privacy
          </Typography>
          <Box display={"flex"} alignItems={"center"} mt={2}>
            <Box width={175} />
            <Typography fontSize={14} fontWeight={600}>
              Show on Profile
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} mt={2}>
            <Typography width={200}>Profile</Typography>
            <FormControlLabel
              checked={privacySettings.profileVisible}
              defaultChecked={user?.privacy?.profileVisible}
              onChange={async (event) =>
                handlePrivacyChange(event, "profileVisible")
              }
              control={<Switch color="success" />}
            />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography width={200}>Friends List</Typography>
            <FormControlLabel
              checked={privacySettings.friendsListVisible}
              defaultChecked={user?.privacy?.friendsListVisible}
              onChange={async (event) =>
                handlePrivacyChange(event, "friendsListVisible")
              }
              control={<Switch color="success" />}
            />
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography width={200}>Matched Profiles</Typography>
            <FormControlLabel
              checked={privacySettings.matchedFriendsVisible}
              defaultChecked={user?.privacy?.matchedFriendsVisible}
              onChange={async (event) =>
                handlePrivacyChange(event, "matchedFriendsVisible")
              }
              control={<Switch color="success" />}
            />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Settings;
