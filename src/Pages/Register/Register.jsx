import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../Services/Auth";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/ColumnBox";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Logo from "../../assets/logo.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GoogleButton from "../../Components/Buttons/GoogleButton";

const Register = () => {
  const navigate = useNavigate();
  const isXsScreen = useMediaQuery("(max-width:599px)");
  const isMobileScreen = useMediaQuery("(max-width:899px)");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await registerUser({
      username: data.username,
      password: data.password,
    });
    if (res === data.username) {
      //backend returns username if register is successful
      navigate("/login");
    }
  };

  return (
    <Grid
      container
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      height={"100dvh"}
      px={isXsScreen ? 4 : 10}
      py={6}
    >
      {/* Navbar for auth pages */}

      <Grid item xs={12} alignItems={"center"} mb={4}>
        <Link to="/" style={{ cursor: "pointer" }}>
          <img src={Logo} height={24} alt="" />
        </Link>
      </Grid>

      {/* Form */}
      <Grid
        item
        xs={12}
        md={6}
        lg={5}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        px={isMobileScreen ? 0 : 10}
      >
        <Typography fontWeight={"bolder"} fontSize={24}>
          Start Your Journey with MovieMate
        </Typography>
        <Link
          variant="body2"
          to={"/login"}
          color="primary"
          sx={{ cursor: "pointer", textDecoration: "none" }}
        >
          <Typography color={"dark.main"}>
            Already have an account?{" "}
            <Typography
              variant="span"
              color={"primary.main"}
              fontWeight={"bold"}
            >
              Login
            </Typography>
          </Typography>
        </Link>
        <GoogleButton />
        <Grid
          item
          xs={12}
          display={"flex"}
          alignItems={"center"}
          sx={{
            maxHeight: 14,
          }}
        >
          <Box
            sx={{
              height: "1px",
              width: "100%",
              backgroundColor: "secondary.main",
            }}
          ></Box>
          <Typography fontSize={12} fontWeight={"medium"}>
            OR
          </Typography>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              backgroundColor: "secondary.main",
            }}
          ></Box>
        </Grid>
        <ColumnBox>
          <TextField
            size="small"
            label="Username"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          <TextfieldError title={"Username"} errors={errors.username} />
        </ColumnBox>

        <ColumnBox>
          <TextField
            type="password"
            size="small"
            label="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
          <TextfieldError title={"Password"} errors={errors.password} />
        </ColumnBox>
        {/* <ColumnBox>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthday"
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
          <TextfieldError title={"Password"} errors={errors.password} />
        </ColumnBox> */}

        <Button
          variant="contained"
          type="submit"
          sx={{
            borderRadius: 99,
            py: 1,
            px: 0,
            fontSize: 16,
            width: 200,
            alignSelf: "center",
          }}
        >
          Register
        </Button>
      </Grid>
      {/* Image */}
      {!isMobileScreen && (
        <Grid item xs={0} md={6} lg={7} px={5}>
          <img
            src={
              "https://images.pexels.com/photos/7991436/pexels-photo-7991436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            height={500}
            width={"100%"}
            alt="Movie"
            style={{ borderRadius: 40, objectFit: "cover" }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Register;
