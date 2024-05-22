import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import useUser from "../../Contexts/User/useUser";
import LandingPage from "./LandingPage";
import ColumnBox from "../../Components/ColumnBox";
import Layout from "../../Layout/Layout";
import ReleaseRadar from "./Components/ReleaseRadar";

const Home = () => {
  const { user } = useUser();

  if (!user?._id) {
    return <LandingPage />;
  }

  return (
    <Layout>
      <ul style={{ fontSize: 10 }}>
        <Typography fontSize={18} fontWeight={"bolder"}>
          TODO
        </Typography>
        <li>RATE MODAL STARS NOT WORKING PROPERLY </li>
        <li>match filtrelerini ve şehri? ekle</li>
        <li>zaman kalırsa streaming services yap</li>
        <li>
          <b>
            FOCUS ON MAIN FEATURES: CHARACTER PAGES & SURVEY STRUCTURE - DON'T
            LET USERS IN IF THEY DON'T TAKE THE SURVEY & HOME PAGE UI
          </b>
        </li>
        <li>Now watching *anasayfa* arkadaşlar ne izlio</li>
        <li>Profile edit your description</li>
        <li>Like & Comment on reviews feature</li>
        <li>
          Match özelliği kullanıldığında yeni match direkt olarak arkadaşlara
          eklenecek, kullanıcı isterse veya eşleşmeyi reddederse kaldırılacak..
        </li>
        <li>??? Movie rate bug</li>
        <li>Ortak arkadaşlar</li>
        <li>Oyuncular film sayfasında</li>
      </ul>
      <ReleaseRadar />
    </Layout>
  );
};

export default Home;
