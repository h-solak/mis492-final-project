import React, { useEffect, useState } from "react";
import { getReleaseRadar } from "../../../Services/Tmdb";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ColumnBox from "../../../Components/ColumnBox";
import ShimmerLoading from "../../../Components/Loaders/ShimmerLoading";
import MovieItem from "../../../components/Movie/MovieItem";

const ReleaseRadar = () => {
  const isXsScreen = useMediaQuery("(max-width:599px)");
  const isSmScreen = useMediaQuery("(max-width:899px)");
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
      <Grid container mt={8}>
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
            spaceBetween={20}
            slidesPerView={isXsScreen ? 2 : isSmScreen ? 3 : 6}
            //   onSlideChange={() => console.log("slide change")}
            //   onSwiper={(swiper) => console.log(swiper)}
          >
            {movies?.map((movie) => (
              <SwiperSlide key={movie?.id}>
                <MovieItem
                  movie={movie}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default ReleaseRadar;
