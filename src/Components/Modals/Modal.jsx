import React from "react";
import { Box, Modal as MuiModal } from "@mui/material";

const Modal = ({ isModalOpen, setIsModalOpen, children }) => {
  return (
    <MuiModal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onClick={() => setIsModalOpen(false)}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ backgroundColor: "#fff" }}
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
