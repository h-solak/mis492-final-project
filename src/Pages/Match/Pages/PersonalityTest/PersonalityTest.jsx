import React, { useState } from "react";
import Layout from "../../../../Layout/Layout";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import Breadcrumbs from "../../../../Components/Breadcrumbs/Breadcrumbs";
import Step1 from "./Components/Steps/Step1";
import Step2 from "./Components/Steps/Step2";
import Step3 from "./Components/Steps/Step3";
import Step4 from "./Components/Steps/Step4";
import ResultScreen from "./Components/Steps/ResultScreen";

const PersonalityTest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [matrices, setMatrices] = useState({
    vfe3x3matrix: {},
    visual5x5matrix: {},
    fluidity5x5matrix: {},
    emotional5x5matrix: {},
  });
  return (
    <Layout>
      <Breadcrumbs
        links={[
          {
            title: `Match`,
            url: `/match`,
          },
          {
            title: `Personality Test`,
            url: `/match/personality-test`,
          },
        ]}
      />
      <Grid container>
        {currentStep == 1 ? (
          <Step1 setCurrentStep={setCurrentStep} setMatrices={setMatrices} />
        ) : currentStep == 2 ? (
          <Step2 setCurrentStep={setCurrentStep} setMatrices={setMatrices} />
        ) : currentStep == 3 ? (
          <Step3 setCurrentStep={setCurrentStep} setMatrices={setMatrices} />
        ) : currentStep == 4 ? (
          <Step4 setCurrentStep={setCurrentStep} setMatrices={setMatrices} />
        ) : (
          <ResultScreen
            matrices={matrices}
            setCurrentStep={setCurrentStep}
            setMatrices={setMatrices}
          />
        )}
      </Grid>
    </Layout>
  );
};

export default PersonalityTest;
