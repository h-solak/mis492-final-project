import React, { useState } from "react";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { checkConsistency } from "../../../../../../Services/Match";
import { useNavigate } from "react-router-dom";
import ColumnBox from "../../../../../../Components/ColumnBox";
import CurrentStepNo from "./CurrentStepNo";

const ahpMarks = [
  { value: 1, label: "9" },
  { value: 2, label: "7" },
  { value: 3, label: "5" },
  { value: 4, label: "3" },
  { value: 5, label: "1" },
  { value: 6, label: "3" },
  { value: 7, label: "5" },
  { value: 8, label: "7" },
  { value: 9, label: "9" },
];

const Step1 = ({ setCurrentStep, setMatrices }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [consistencyRate, setConsistencyRate] = useState(0);

  const onSubmit = async (data) => {
    const { visualFluidity, emotionalFluidity, emotionalVisual } = data;

    const subcriteriaMatrix = {
      row1: [1, 1 / visualFluidity, 1 / emotionalFluidity],
      row2: [visualFluidity, 1, 1 / emotionalVisual],
      row3: [emotionalFluidity, emotionalVisual, 1],
    };

    const crValue = await checkConsistency(subcriteriaMatrix, 3);

    setMatrices((prevMatrices) => ({
      ...prevMatrices,
      vfe3x3matrix: subcriteriaMatrix,
    }));

    if (crValue < 0.9) {
      setCurrentStep(2);
    } else {
      setConsistencyRate(crValue);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Grid
      container
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      justifyContent={"center"}
      style={{ width: "100%" }}
    >
      <Grid
        item
        xs={12}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        alignSelf={"center"}
        justifySelf={"center"}
      >
        <Box my={4} display={"flex"} justifyContent={"center"}>
          <CurrentStepNo no={1} />
        </Box>
        <Button onClick={() => setCurrentStep((bla) => bla - 1)}>prev</Button>{" "}
        <Button onClick={() => setCurrentStep((bla) => bla + 1)}>next</Button>
        <ColumnBox>
          <Typography fontSize={20} fontWeight={"bold"}>
            MovieMate Personality Test
          </Typography>
          <Typography mt={1}>
            Below, some characteristic features used when evaluating movies and
            genres are given in pairs. Drag the switch in the direction you
            think is more important{" "}
          </Typography>
          <Typography fontWeight={"medium"}>
            (1: equally important, 3: slightly more important, 5: more
            important, 7: clearly more important, 9: definitely more important)
          </Typography>
        </ColumnBox>
        {!!consistencyRate && (
          <Box
            className="fade-in opening-animation"
            px={2}
            py={1}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            width={"100%"}
            sx={{
              backgroundColor: "#ff000030",
            }}
          >
            <Typography fontSize={64} fontWeight={900}>
              !
            </Typography>
            <ColumnBox>
              <Typography className="fade-in" fontSize={18} fontWeight={"bold"}>
                {`Your consistency rate is: ${consistencyRate}`}
              </Typography>
              <Typography pr={4}>
                It should be lower for a better matching experience! Avoid using
                high points such as 7 and 9!
              </Typography>
            </ColumnBox>
          </Box>
        )}
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Visual and Technical Elements
          </Typography>
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
          <Typography fontSize={14} width={100}>
            Fluidity
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <Typography fontSize={14} width={100}>
            Emotional Impact
          </Typography>
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
          <Typography fontSize={14} width={100}>
            Fluidity
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <Typography fontSize={14} width={100}>
            Emotional Impact
          </Typography>
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
          <Typography fontSize={14} width={100}>
            Visual and Technical Elements
          </Typography>
        </Box>
        <Button
          size="large"
          variant="contained"
          type="submit"
          sx={{
            alignSelf: "end",
            px: 8,
            borderRadius: 99,
            mt: 4,
          }}
        >
          {" "}
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default Step1;
