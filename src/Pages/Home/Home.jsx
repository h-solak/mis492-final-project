import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUser from "../../Contexts/User/useUser";
import LandingPage from "./LandingPage";
import ColumnBox from "../../Components/ColumnBox";
import Layout from "../../Layout/Layout";
import ReleaseRadar from "./Components/ReleaseRadar";
import { getHome } from "../../Services/Home";
import NowWatching from "./Components/NowWatching";

const Home = () => {
  const { user } = useUser();
  const [homeData, setHomeData] = useState();

  if (!user?._id) {
    return <LandingPage />;
  }

  useEffect(() => {
    handleGetHome();
  }, []);

  const handleGetHome = async () => {
    const homeResponse = await getHome();
    setHomeData(homeResponse);
  };

  return (
    <Layout>
      <ul style={{ fontSize: 10 }}>
        <Typography fontSize={18} fontWeight={"bolder"}>
          TODO
        </Typography>
        <li>match filtrelerini ve şehri? ekle</li>
        <li>zaman kalırsa streaming services yap</li>
        <li>
          <b>HOME PAGE UI</b>
        </li>
        <li>kullanıcı isterse veya eşleşmeyi reddederse kaldırılacak???</li>
        <li>Ortak arkadaşlar</li>
      </ul>
      {!!homeData?.find((userItem) => userItem?.nowWatching?.id) && (
        <NowWatching homeData={homeData} />
      )}
      <ReleaseRadar />
    </Layout>
  );
};

export default Home;
