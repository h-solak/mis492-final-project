import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { getUser, loginUser } from "../../Services/User";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/Forms/ColumnBox";
import useUser from "../../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await loginUser({
      username: data.username,
      password: data.password,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid
          item
          sm={12}
          md={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          <ColumnBox>
            <TextField
              type="text"
              size="small"
              label="Username"
              autoComplete="on"
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
              autoComplete="on"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />
            <TextfieldError title={"Password"} errors={errors.password} />
          </ColumnBox>

          <Button variant="contained" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
