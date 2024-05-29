import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../Services/Auth";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/ColumnBox";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import GoogleButton from "../../Components/Buttons/GoogleButton";
import cities from "../../constants/cities";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const isXsScreen = useMediaQuery("(max-width:599px)");
  const isMobileScreen = useMediaQuery("(max-width:899px)");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      function isUserOver18(date) {
        const birthDate = new Date(date);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 18;
      }

      if (isUserOver18(data.birthday)) {
        const res = await registerUser({
          username: data.username,
          password: data.password,
          birthday: data.birthday,
          city: data.city,
          gender: data.gender,
        });
        if (res === data.username) {
          //backend returns username if register is successful
          navigate("/login");
        }
      } else {
        toast.error("You have to be older than 18!");
      }

      console.log(data);
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(watch("birthday"));
  }, []);

  return (
    <Grid container px={isXsScreen ? 4 : 10} py={6}>
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
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
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
            inputProps={{ maxLength: 20 }}
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
            inputProps={{ maxLength: 20 }}
            autoComplete="new-password"
          />
          <TextfieldError title={"Password"} errors={errors.password} />
        </ColumnBox>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birth Date"
            defaultValue={dayjs(new Date("01/01/2005"))}
            sx={{
              fontSize: 14,
            }}
            slotProps={{ textField: { size: "small" } }}
            onChange={(value) => setValue("birthday", value)}
          />
        </LocalizationProvider>

        <Box display={"flex"} alignItems={"center"} gap={2}>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select
              label="City"
              defaultValue={"İstanbul"}
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
          </FormControl>
        </Box>

        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              fontSize: 14,
            }}
          >
            Gender
          </FormLabel>
          <RadioGroup
            defaultValue={"female"}
            row
            onChange={(e) => setValue("gender", e.target.value)}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

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
