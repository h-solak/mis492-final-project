import React, { useEffect, useState } from "react";
import useUser from "../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Services/Auth";

const AuthGuard = ({ component }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const getUserData = async () => {
    const crrUser = await getUser();
    if (crrUser?._id) {
      setUser(crrUser);
    } else {
      navigate("/login");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 100);
  }, []);

  return <React.Fragment>{isLoading ? <div></div> : component}</React.Fragment>;
};

export default AuthGuard;
