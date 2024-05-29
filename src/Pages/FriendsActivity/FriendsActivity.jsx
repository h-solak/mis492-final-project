import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import NowWatching from "./Components/NowWatching";
import useUser from "../../Contexts/User/useUser";
import { getHome } from "../../Services/Home";

const FriendsActivity = () => {
  const { user } = useUser();
  const [homeData, setHomeData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetHome();
  }, []);

  const handleGetHome = async () => {
    const homeResponse = await getHome();
    setHomeData(homeResponse);
    setLoading(false);
  };
  return (
    <Layout>
      <NowWatching homeData={homeData} loading={loading} />
    </Layout>
  );
};

export default FriendsActivity;
