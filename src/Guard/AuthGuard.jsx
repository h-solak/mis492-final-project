import React, { useEffect, useState } from "react";
import useUser from "../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Services/Auth";
import CenteredBox from "../Components/CenteredBox";
import MovieLoaderSvg from "../assets/icons/pageLoader.svg";
import { removeAccessToken } from "../api/config";
const AuthGuard = ({ component }) => {
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
      navigate("/login");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <CenteredBox absolute>
          <img src={MovieLoaderSvg} width={64} height={64} className="blink" />
        </CenteredBox>
      ) : (
        component
      )}
    </React.Fragment>
  );
};

export default AuthGuard;
