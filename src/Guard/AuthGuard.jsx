import React, { useEffect } from "react";
import useUser from "../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Services/User";

const AuthGuard = ({ component }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const getUserData = async () => {
    const crrUser = await getUser();
    if (crrUser?._id) {
      setUser(crrUser);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <React.Fragment>{component}</React.Fragment>;
};

export default AuthGuard;
