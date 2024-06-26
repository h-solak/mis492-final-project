import React, { useEffect, useState } from "react";
import useUser from "../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Services/Auth";
import CenteredBox from "../Components/CenteredBox";
import Logo from "../assets/logo.svg";
import { removeAccessToken } from "../api/config";
//isisHomeComponent prevents the component from redirecting bug
const AuthGuard = ({ component, isHomeComponent }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const getUserData = async () => {
    const crrUser = await getUser();
    if (crrUser?._id) {
      setUser(crrUser);
    } else {
      //token is expired or something went wrong with the user
      removeAccessToken();
      setUser({});
      if (!isHomeComponent) {
        navigate("/");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [component]);

  return (
    <React.Fragment>
      {isLoading ? (
        <CenteredBox absolute>
          <img src={Logo} width={256} className="blink" />
        </CenteredBox>
      ) : (
        component
      )}
    </React.Fragment>
  );
};

export default AuthGuard;
