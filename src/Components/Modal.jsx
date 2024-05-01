import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal as MuiModal,
  Typography,
} from "@mui/material";
import React from "react";
const Modal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  contentPadding,
  children,
  sx,
  ...props
}) => {
  const handleClose = () => setIsModalOpen(false);
  return (
    <MuiModal open={isModalOpen} onClose={handleClose} onClick={handleClose}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        className="absolute-center"
        borderRadius={8}
        onClick={(e) => e.stopPropagation()}
        sx={{ backgroundColor: "#fff", ...sx }}
        {...props}
      >
        <Grid
          container
          sx={{
            borderBottom: 2,
            borderColor: "secondary.light",
          }}
          paddingX={3}
          paddingY={1}
        >
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h6" fontWeight={"medium"}>
              {title}
            </Typography>
            <IconButton onClick={() => setIsModalOpen(false)}>
              <Close
                sx={{
                  color: "secondary.main",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container padding={contentPadding ? contentPadding : 5}>
          {children}
        </Grid>
      </Box>
    </MuiModal>
  );
};

export default Modal;
