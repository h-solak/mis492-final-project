import React, { useEffect } from "react";
import useUser from "../../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";

const WatchlistNavigator = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/profile/${user?.username}/watchlist`);
  }, []);
  return null;
};

export default WatchlistNavigator;
