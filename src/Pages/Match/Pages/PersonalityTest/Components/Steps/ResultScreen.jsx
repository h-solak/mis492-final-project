import React from "react";
import { matchUser } from "../../../../../../Services/Match";
import { Button } from "@mui/material";

const ResultScreen = ({ matrices, setCurrentStep }) => {
  console.log(matrices);
  const handleCalculation = async () => {
    const result = await matchUser(matrices);

    console.log(result);
  };
  return (
    <div>
      <Button onClick={() => setCurrentStep(4)}>geri</Button>
      <Button onClick={() => setCurrentStep(1)}>ileri</Button>
      <Button variant="contained" size="large" onClick={handleCalculation}>
        Calculate
      </Button>
    </div>
  );
};

export default ResultScreen;
