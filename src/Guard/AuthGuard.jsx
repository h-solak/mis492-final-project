import React, { useEffect, useState } from "react";
import useUser from "../Contexts/User/useUser";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Services/Auth";
import CenterLoader from "../Components/CenterLoader";
import CenteredBox from "../Components/CenteredBox";
import MovieLoaderSvg from "../assets/icons/pageLoader.svg";
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
