import React from "react";
import Layout from "../../Layout/Layout";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/ColumnBox";

const CharacterSurvey = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  getDoc();

  return (
    <Layout>
      <Grid
        container
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        justifyContent={"center"}
        style={{ width: "100%" }}
      >
        <Grid
          item
          sm={12}
          md={6}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          alignSelf={"center"}
          justifySelf={"center"}
        >
          <Typography textAlign={"center"} fontWeight={600} fontSize={28}>
            CHARACTER SURVEY
          </Typography>
          <ColumnBox>
            <TextField
              type="text"
              size="small"
              label="Name"
              autoComplete="on"
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
            <TextfieldError title={"Username"} errors={errors.username} />
          </ColumnBox>

          <FormControl>
            <FormLabel>Bla bla bla?</FormLabel>
            <RadioGroup row>
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <FormControlLabel
                  value={item}
                  {...register("secondQuestion", {
                    required: true,
                  })}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
            <TextfieldError errors={errors.secondQuestion} />
          </FormControl>

          <Button variant="contained" type="submit">
            {" "}
            Submit
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CharacterSurvey;
