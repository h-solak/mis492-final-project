import React from "react";
import CenteredBox from "../CenteredBox";
import Lottie from "lottie-react";
import SearchLoaderJson from "../../assets/animations/searchloader.json";

const SearchLoader = ({ ...props }) => {
  return (
    <CenteredBox {...props}>
      <Lottie
        animationData={SearchLoaderJson}
        loop={true}
        style={{
          width: 250,
        }}
      />
    </CenteredBox>
  );
};

export default SearchLoader;
