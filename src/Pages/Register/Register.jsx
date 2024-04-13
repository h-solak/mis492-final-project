import { Box, Button, Grid, TextField, Link, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../Services/Auth";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/ColumnBox";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

const Register = () => {
  const navigate = useNavigate();
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
      //backend returns username if the operation is successful
      navigate("/login");
    }
  };

  return (
    <Layout>
      <Grid container component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          item
          sm={12}
          md={3}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          <Link
            variant="body2"
            onClick={() => navigate("/login")}
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

          <Button variant="contained" type="submit">
            Register
          </Button>
        </Grid>
        <Grid item xs={0} md={9}>
          Foto
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Register;
