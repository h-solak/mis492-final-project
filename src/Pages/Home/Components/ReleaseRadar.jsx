import React, { useEffect, useState } from "react";
import { getReleaseRadar } from "../../../Services/Tmdb";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ReleaseItem from "./ReleaseItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ColumnBox from "../../../Components/ColumnBox";

const ReleaseRadar = () => {
  const isXsScreen = useMediaQuery("(max-width:599px)");
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [slider, setSlider] = useState(0); //start point of slider, it displays
  const handleGetReleaseRadar = async () => {
    const data = await getReleaseRadar();
    setMovies(data?.results);
  };
  useEffect(() => {
    handleGetReleaseRadar();
  }, []);
  return (
    <Grid container>
      <ColumnBox mt={1} mb={2}>
        <Typography fontSize={20} fontWeight={"bolder"} mb={-0.5}>
          Release Radar
        </Typography>
        <Typography>Latest movies from your favorite genres</Typography>
      </ColumnBox>
      {movies && (
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
  );
};

export default ReleaseRadar;
