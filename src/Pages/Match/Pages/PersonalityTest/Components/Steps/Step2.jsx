import React, { useState } from "react";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { sendMatrix } from "../../../../../../Services/Match";
import { useNavigate } from "react-router-dom";
import ColumnBox from "../../../../../../Components/ColumnBox";
import CurrentStepNo from "./CurrentStepNo";
import convertMatrixElementValue from "../../../../../../Utilities/convertMatrixElementValue";

const ahpMarks = [
  { value: 9, label: "9" }, //actual value 9
  { value: 8, label: "7" }, //actual value 7
  { value: 7, label: "5" }, //actual value 5
  { value: 6, label: "3" }, //actual value 3
  { value: 5, label: "1" }, //actual value 1
  { value: 4, label: "3" }, //actual value 1/3
  { value: 3, label: "5" }, //actual value 1/5
  { value: 2, label: "7" }, //actual value 1/7
  { value: 1, label: "9" }, //actual value 1/9
];

const Step2 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [consistencyRate, setConsistencyRate] = useState(0);

  const onSubmit = async (data) => {
    const {
      romanticDrama,
      comedyDrama,
      mysteryDrama,
      actionDrama,
      actionRomantic,
      actionMystery,
      actionComedy,
      mysteryComedy,
      romanticComedy,
      romanticMystery,
    } = data;

    const subcriteriaMatrix = {
      //---------------------------Romantic-------------Drama--------------Comedy--------------Mystery--------------Action--------
      /*  Romantic */ row1: [
        1,
        convertMatrixElementValue(romanticDrama),
        convertMatrixElementValue(romanticComedy),
        convertMatrixElementValue(romanticMystery),
        1 / convertMatrixElementValue(actionRomantic),
      ],
      /*  Drama    */ row2: [
        1 / convertMatrixElementValue(romanticDrama),
        1,
        1 / convertMatrixElementValue(comedyDrama),
        1 / convertMatrixElementValue(mysteryDrama),
        1 / convertMatrixElementValue(actionDrama),
      ],
      /*  Comedy   */ row3: [
        1 / convertMatrixElementValue(romanticComedy),
        convertMatrixElementValue(comedyDrama),
        1,
        1 / convertMatrixElementValue(mysteryComedy),
        1 / convertMatrixElementValue(actionComedy),
      ],
      /*  Mystery  */ row4: [
        1 / convertMatrixElementValue(romanticMystery),
        convertMatrixElementValue(mysteryDrama),
        convertMatrixElementValue(mysteryComedy),
        1,
        1 / convertMatrixElementValue(actionMystery),
      ],
      /*  Action   */ row5: [
        convertMatrixElementValue(actionRomantic),
        convertMatrixElementValue(actionDrama),
        convertMatrixElementValue(actionComedy),
        convertMatrixElementValue(actionMystery),
        1,
      ],
    };

    // const subcriteriaMatrix = {
    //   row1: [1, 1 / visualFluidity, 1 / emotionalFluidity],
    //   row2: [visualFluidity, 1, 1 / emotionalVisual],
    //   row3: [emotionalFluidity, emotionalVisual, 1],
    // };

    const crValue = await sendMatrix(subcriteriaMatrix);

    // setConsistencyRate(crValue);

    // if(consistencyRate > 0.1){
    //   navigate("/character-survey")
    // }
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
          <CurrentStepNo no={2} />
        </Box>
        <ColumnBox>
          <Typography fontSize={20} fontWeight={"bold"}>
            MovieMate Personality Test
          </Typography>
          <Typography mt={1}>
            Considering Visual and Technical Elements, drag the switch in that
            direction, whichever you think is more important (e.g. in terms of
            Visual and Technical Elements, drama is more important than action.)
          </Typography>
          <Typography variant="p" fontWeight={"medium"}>
            (1: equally important, 3: slightly more important, 5: more
            important, 7: clearly more important, 9: definitely more important)
          </Typography>
        </ColumnBox>
        <Typography mt={4} fontWeight={"bold"}>
          Visual and Technical Elements
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <Typography fontSize={14} width={100}>
            Romantic
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("romanticDrama", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Drama
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Comedy
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("comedyDrama", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Drama
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Mystery
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("mysteryDrama", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Drama
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Action
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("actionDrama", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Drama
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Action
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("actionRomantic", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Romantic
          </Typography>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Action
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("actionMystery", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Mystery
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Action
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("actionComedy", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Comedy
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Mystery
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("mysteryComedy", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Comedy
          </Typography>
        </Box>

        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Romantic
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("romanticComedy", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Comedy
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={4} mt={4}>
          <Typography fontSize={14} width={100}>
            Romantic
          </Typography>
          <Slider
            defaultValue={1}
            valueLabelDisplay="off"
            marks={ahpMarks}
            min={1}
            max={9}
            {...register("romanticMystery", {
              required: true,
            })}
          />
          <Typography fontSize={14} width={100}>
            Mystery
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

        {!!consistencyRate && (
          <Typography fontSize={30} color={"#FF8096"}>
            {consistencyRate}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Step2;
