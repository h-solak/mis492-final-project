import {
  CloseRounded,
  Movie,
  Person,
  SearchRounded,
  Tv,
} from "@mui/icons-material";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { searchMulti } from "../../../../Services/Tmdb";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ColumnBox from "../../../../Components/ColumnBox";
import MovieAwardsSvg from "../../../../assets/illustrations/movieawards.svg";
import CenteredBox from "../../../../Components/CenteredBox";

const MultiSearch = ({ searchParams, setSearchParams, setSearchMode }) => {
  const [searchInput, setSearchInput] = useState("");
  const [response, setResponse] = useState({
    data: [],
    isLoading: false,
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (watch("searchQuery")?.trim().length > 0) {
      handleSearch();
    }
  }, [watch("searchQuery")]);

  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      type: "multi",
    }));
    if (searchParams.get("multiSearch")) {
      setValue("searchQuery", searchParams.get("multiSearch")?.trim());
    }
  }, []);

  const handleSearch = async () => {
    setResponse((prevData) => ({ ...prevData, isLoading: true }));
    const newData = await searchMulti(watch("searchQuery")?.trim(), 1);
    setResponse({ data: newData, isLoading: false });
    setSearchParams((prevParams) => ({
      ...prevParams,
      multiSearch: watch("searchQuery")?.trim(),
    }));
  };

  return (
    <Grid item xs={12} lg={6} mt={4}>
      <TextField
        autoFocus
        placeholder="Search for movies, tv shows, directors, actors..."
        InputProps={{
          startAdornment: <SearchRounded color="disabled" sx={{ mr: 1 }} />,
          endAdornment: watch("searchQuery") ? (
            <IconButton
              onClick={() => {
                setValue("searchQuery", "");
              }}
              sx={{
                mr: -1,
              }}
            >
              <CloseRounded
                color="disabled"
                sx={{
                  cursor: "pointer",
                }}
              />
            </IconButton>
          ) : null,
          style: {
            borderRadius: 99,
            height: 40,
          },
        }}
        fullWidth
        {...register("searchQuery", {
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
        sx={{
          fontSize: 16,
        }}
      />

      {!!response?.data?.results ? (
        <Grid container mt={4}>
          {response?.data?.results.map((item) => (
            <Grid
              key={item?.id}
              item
              xs={12}
              display={"flex"}
              alignItems={"start"}
              gap={1.5}
              mt={2}
              py={2}
              borderBottom={1}
              borderColor={"divider"}
              onClick={
                item?.media_type == "movie"
                  ? () => navigate(`/movies/${item?.id}`)
                  : () => null
              }
            >
              <LazyLoadImage
                src={
                  item?.poster_path || item?.backdrop_path || item?.profile_path
                    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                        item?.poster_path ||
                        item?.backdrop_path ||
                        item?.profile_path
                      }`
                    : "https://cataas.com/cat"
                }
                width={"75px"}
                height={"100px"}
                alt="movie picture"
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              />
              <ColumnBox>
                <Typography fontSize={18} fontWeight={"bold"}>
                  {item?.name || item?.title}
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={0.5}>
                  {item?.media_type == "person" ? (
                    <Person
                      sx={{
                        fontSize: 20,
                        color: "secondary.main",
                      }}
                    />
                  ) : item?.media_type == "movie" ? (
                    <Movie
                      sx={{
                        fontSize: 20,
                        color: "secondary.main",
                      }}
                    />
                  ) : (
                    <Tv
                      sx={{
                        fontSize: 20,
                        color: "secondary.main",
                      }}
                    />
                  )}
                  <Typography fontSize={14} color={"secondary"}>
                    {item?.media_type == "person" ? (
                      <>
                        {item?.known_for_department == "Directing"
                          ? "Director"
                          : item?.known_for_department == "Acting"
                          ? "Actor/Actress"
                          : "Person"}
                      </>
                    ) : item?.media_type == "movie" ? (
                      "Movie"
                    ) : (
                      "Tv Show"
                    )}
                  </Typography>
                </Box>
              </ColumnBox>
            </Grid>
          ))}
        </Grid>
      ) : (
        <CenteredBox width="100%">
          <ColumnBox alignItems="center">
            <img
              className="fade-in-ltr"
              src={MovieAwardsSvg}
              width={250}
              alt="people"
            />
            <Typography className="fade-in-rtl" mt={1} color={"secondary"}>
              Start exploring movies, actors, directors...
            </Typography>
          </ColumnBox>
        </CenteredBox>
      )}
    </Grid>
  );
};

export default MultiSearch;
