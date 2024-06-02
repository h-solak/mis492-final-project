import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { checkConsistency } from "../../../../../../Services/Match";
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

const Step3 = ({ setCurrentStep, setMatrices }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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

    // const crValue = await sendMatrix(subcriteriaMatrix);

    setMatrices((prevMatrices) => ({
      ...prevMatrices,
      fluidity5x5matrix: subcriteriaMatrix,
    }));

    const crValue = await checkConsistency(subcriteriaMatrix, 5);

    if (crValue < 0.5) {
      setCurrentStep(4);
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
          <CurrentStepNo no={3} />
        </Box>
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
          Fluidity
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <Typography fontSize={14} width={100}>
            Romantic
          </Typography>
          <Slider
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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
            defaultValue={5}
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

export default Step3;
