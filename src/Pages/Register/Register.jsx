import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../Services/User";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/Forms/ColumnBox";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser({ username: data.username, password: data.password });
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
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;
