import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TextfieldError from "../../Components/Forms/TextFieldError";
import ColumnBox from "../../Components/ColumnBox";
import { sendMatrix } from "../../Services/Match";
import { useNavigate } from "react-router-dom";

const ahpMarks = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
];

const CharacterSurvey = () => {
  const [consistencyRate, setConsistencyRate] = useState(0);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { visualFluidity, emotionalFluidity, emotionalVisual } = data;

    const subcriteriaMatrix = {
      row1: [1, 1 / visualFluidity, 1 / emotionalFluidity],
      row2: [visualFluidity, 1, 1 / emotionalVisual],
      row3: [emotionalFluidity, emotionalVisual, 1],
    };

    const crValue = await sendMatrix(subcriteriaMatrix);

    setConsistencyRate(crValue);

    // if(consistencyRate > 0.1){
    //   navigate("/character-survey")
    // }
  };

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
          md={9}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          alignSelf={"center"}
          justifySelf={"center"}
        >
          <Box display={"flex"} alignItems={"center"} gap={4}>
            <Typography>Visual and Technical Elements</Typography>
            <Slider
              defaultValue={1}
              valueLabelDisplay="off"
              marks={ahpMarks}
              min={1}
              max={9}
              {...register("visualFluidity", {
                required: true,
              })}
            />
            <Typography textAlign={"center"}>Fluidity</Typography>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={4}>
            <Typography>Emotional Impact</Typography>
            <Slider
              defaultValue={1}
              valueLabelDisplay="off"
              marks={ahpMarks}
              min={1}
              max={9}
              {...register("emotionalFluidity", {
                required: true,
              })}
            />
            <Typography textAlign={"center"}>Fluidity</Typography>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={4}>
            <Typography>Emotional Impact</Typography>
            <Slider
              defaultValue={1}
              valueLabelDisplay="off"
              marks={ahpMarks}
              min={1}
              max={9}
              {...register("emotionalVisual", {
                required: true,
              })}
            />
            <Typography textAlign={"center"}>
              Visual and Technical Elements
            </Typography>
          </Box>

          <Button variant="contained" type="submit">
            {" "}
            Submit
          </Button>

          {!!consistencyRate && (
            <Typography fontSize={300} color={"#FF8096"}>
              {consistencyRate}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CharacterSurvey;
