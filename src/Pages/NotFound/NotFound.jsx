import React from "react";
import CenteredBox from "../../Components/CenteredBox";
import Layout from "../../Layout/Layout";
import NotFoundSvg from "../../assets/illustrations/notfound.svg";
import { Typography } from "@mui/material";
import useUser from "../../Contexts/User/useUser";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { user } = useUser();
  return (
    <Layout>
      <CenteredBox display="flex" flexDirection="column" gap={2}>
        <img src={NotFoundSvg} width={300} height={300} />
        <Typography color={"secondary"}>Page Not Found</Typography>
        {user?._id ? (
          <Link to="/">Go back Home</Link>
        ) : (
          <Link to="/login">Login and Go Home</Link>
        )}
      </CenteredBox>
    </Layout>
  );
};

export default NotFound;
