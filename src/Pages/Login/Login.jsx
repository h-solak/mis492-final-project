import { Button, Grid, Link, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { getUser, loginUser } from "../../Services/User";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/ColumnBox";
import useUser from "../../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

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
    const loggedIn = await loginUser({
      username: data.username,
      password: data.password,
    });
    if (loggedIn) {
      navigate("/");
    }
  };

  return (
    <Layout>
      <Grid container>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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

            <Link
              variant="body2"
              onClick={() => navigate("/register")}
              sx={{ cursor: "pointer" }}
            >
              You don't have an account? Sign up
            </Link>

            <Button variant="contained" type="submit">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Layout>
  );
};

export default Login;

{
  /* <FormControl variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={false ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => null}
                      onMouseDown={() => null}
                      edge="end"
                    >
                      {true ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                size="small"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
              />
            </FormControl> */
}
