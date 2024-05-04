import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import React from "react";

const RecentActivity = ({ rate }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottom={1}
          py={1}
        >
          <Typography fontWeight={"medium"}>Recent Activity</Typography>
          <Button
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            See All Activity
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RecentActivity;
