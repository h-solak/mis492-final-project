import React, { useEffect } from "react";
import { matchUser } from "../../../../../../Services/Match";
import { Button } from "@mui/material";
import useUser from "../../../../../../Contexts/User/useUser";

const ResultScreen = ({ matrices, setCurrentStep }) => {
  const { user, setUser } = useUser();
  console.log(matrices);
  const handleCalculation = async () => {
    const result = await matchUser(matrices);

    if (result?.resultMatrix?.length > 0) {
      setUser((prevUser) => ({ ...prevUser, personality: result }));
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);
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
