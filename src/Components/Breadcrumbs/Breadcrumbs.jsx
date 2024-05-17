import { Home } from "@mui/icons-material";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ links }) => {
  /* Links array [{title, url}] */
  return (
    <MuiBreadcrumbs mb={4}>
      <Link
        underline="hover"
        color="dark.main"
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Home
          sx={{
            fontSize: 20,
            color: "black",
          }}
        />
      </Link>
      {links.map((linkItem) => (
        <Link
          key={linkItem.url}
          underline="none"
          color="dark.main"
          to={linkItem.url}
        >
          <Typography color={"black"} fontSize={14}>
            {linkItem.title}
          </Typography>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
