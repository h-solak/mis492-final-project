import { Home } from "@mui/icons-material";
import { Breadcrumbs as MuiBreadcrumbs, Link } from "@mui/material";
import React from "react";

const Breadcrumbs = ({ links }) => {
  /* Links array [{title, url}] */
  return (
    <MuiBreadcrumbs mb={4}>
      <Link
        underline="hover"
        color="inherit"
        href="/"
        display={"flex"}
        alignItems={"center"}
      >
        <Home
          sx={{
            fontSize: 20,
          }}
        />
      </Link>
      {links.map((linkItem) => (
        <Link
          key={linkItem.url}
          underline="none"
          color="dark.main"
          href={linkItem.url}
          fontSize={14}
        >
          {linkItem.title}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
