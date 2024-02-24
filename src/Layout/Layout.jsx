import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import useUser from "../Contexts/User/useUser";

const Layout = ({ children }) => {
  const { user, setUser } = useUser();

  return (
    <Box>
      <Navbar />
      <Box paddingX={4} paddingY={4}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
