import React from "react";
import ColumnBox from "./ColumnBox";
import CenteredBox from "./CenteredBox";
import NoDataSvg from "../assets/illustrations/nodata.svg";
import { Typography } from "@mui/material";

const NothingFound = ({ imgWidth = 100, ...props }) => {
  return (
    <CenteredBox {...props}>
      <ColumnBox alignItems="center" gap={1}>
        <img src={NoDataSvg} width={imgWidth} alt="no data" />
        <Typography color={"secondary"} fontSize={13} textAlign={"center"}>
          <Typography variant="span" color={"dark.main"}>
            No results to see here
          </Typography>{" "}
          <br /> (Don't give up)
        </Typography>
      </ColumnBox>
    </CenteredBox>
  );
};

export default NothingFound;
