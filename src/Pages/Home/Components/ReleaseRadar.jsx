import React, { useEffect, useState } from "react";
import { getReleaseRadar } from "../../../Services/Tmdb";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ReleaseItem from "./ReleaseItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ColumnBox from "../../../Components/ColumnBox";
import ShimmerLoading from "../../../Components/Loaders/ShimmerLoading";

const ReleaseRadar = () => {
  const isXsScreen = useMediaQuery("(max-width:599px)");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [slider, setSlider] = useState(0); //start point of slider, it displays
  const handleGetReleaseRadar = async () => {
    setIsLoading(true);
    const data = await getReleaseRadar();
    setMovies(data?.results);
    setIsLoading(false);
  };
  useEffect(() => {
    handleGetReleaseRadar();
  }, []);
  return (
    <React.Fragment>
      <Grid container>
        <ColumnBox mt={1} mb={2}>
          <Typography fontSize={20} fontWeight={"bolder"} mb={-0.5}>
            Release Radar
          </Typography>
          <Typography>Latest movies from your favorite genres</Typography>
        </ColumnBox>
        {!!isLoading && <ShimmerLoading width={"100%"} height={200} />}

        {!isLoading && movies && (
          <Swiper
            modules={[Navigation, Pagination]}
            cssMode={true}
            navigation
            pagination
            spaceBetween={50}
            slidesPerView={isXsScreen ? 2 : 6}
            //   onSlideChange={() => console.log("slide change")}
            //   onSwiper={(swiper) => console.log(swiper)}
          >
            {movies?.map((movie) => (
              <SwiperSlide key={movie?.id}>
                <ReleaseItem movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default ReleaseRadar;
