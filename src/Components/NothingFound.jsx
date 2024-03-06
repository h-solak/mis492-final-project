import React from "react";
import ColumnBox from "./ColumnBox";
import CenteredBox from "./CenteredBox";
import NoDataSvg from "../assets/illustrations/nodata.svg";
import { Typography } from "@mui/material";

const NothingFound = ({ width = 120 }) => {
  return (
    <CenteredBox>
      <ColumnBox alignItems="center" gap={1}>
        <img src={NoDataSvg} width={width} alt="no data" />
        <Typography color={"secondary"}>Nothing found</Typography>
      </ColumnBox>
    </CenteredBox>
  );
};

export default NothingFound;
