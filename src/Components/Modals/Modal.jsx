import React from "react";
import { Box, Button, Modal as MuiModal, Typography } from "@mui/material";

const Modal = ({ isModalOpen, setIsModalOpen, children }) => {
  return (
    <MuiModal
      open={isModalOpen}
      onClose={setIsModalOpen}
      onClick={() => setIsModalOpen(false)}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ backgroundColor: "light.main" }}
        className="absolute-center"
        borderRadius={8}
        padding={5}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
