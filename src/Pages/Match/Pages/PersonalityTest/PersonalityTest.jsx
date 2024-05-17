import React, { useState } from "react";
import Layout from "../../../../Layout/Layout";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import Breadcrumbs from "../../../../Components/Breadcrumbs/Breadcrumbs";
import Step1 from "./Components/Steps/Step1";
import Step2 from "./Components/Steps/Step2";

const PersonalityTest = () => {
  const [currentStep, setCurrentStep] = useState(2);
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
          <Step1 setCurrentStep={setCurrentStep} />
        ) : currentStep == 2 ? (
          <Step2 setCurrentStep={setCurrentStep} />
        ) : (
          <Step2 setCurrentStep={setCurrentStep} />
        )}
      </Grid>
    </Layout>
  );
};

export default PersonalityTest;
