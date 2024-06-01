import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ColumnBox from "../../../Components/ColumnBox";

function CountdownTimer({ initialDate }) {
  const [countdown, setCountdown] = useState({
    days: "⏳",
    hours: "⏳",
    minutes: "⏳",
    seconds: "⏳",
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const providedDate = new Date(initialDate);
      const oneWeekLater = new Date(
        providedDate.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      const timeDifference = oneWeekLater.getTime() - Date.now();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 750);

    return () => clearInterval(intervalId);
  }, [initialDate]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={3}
    >
      <ColumnBox
        textAlign="center"
        sx={{
          backgroundColor: "#00000010",
          py: 1,
          borderRadius: 4,
        }}
      >
        <Typography
          fontSize={32}
          fontWeight={"bold"}
          sx={{
            width: 75,
          }}
        >
          {countdown.days}
        </Typography>
        <Typography fontSize={12}>days</Typography>
      </ColumnBox>
      <ColumnBox
        textAlign="center"
        sx={{
          backgroundColor: "#00000010",
          py: 1,
          borderRadius: 4,
        }}
      >
        <Typography
          fontSize={32}
          fontWeight={"bold"}
          sx={{
            width: 75,
          }}
        >
          {countdown.hours}
        </Typography>
        <Typography fontSize={12}>hours</Typography>
      </ColumnBox>
      <ColumnBox
        textAlign="center"
        sx={{
          backgroundColor: "#00000010",
          py: 1,
          borderRadius: 4,
        }}
      >
        <Typography
          fontSize={32}
          fontWeight={"bold"}
          sx={{
            width: 75,
          }}
        >
          {countdown.minutes}
        </Typography>
        <Typography fontSize={12}>minutes</Typography>
      </ColumnBox>
      <ColumnBox
        textAlign="center"
        sx={{
          backgroundColor: "#00000010",
          py: 1,
          borderRadius: 4,
        }}
      >
        <Typography
          fontSize={32}
          fontWeight={"bold"}
          sx={{
            width: 75,
          }}
        >
          {countdown.seconds}
        </Typography>
        <Typography fontSize={12}>seconds</Typography>
      </ColumnBox>
    </Box>
  );
}

export default CountdownTimer;
