import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import WarningSvg from "../../assets/illustrations/warning.svg";

const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  warningText = "You can't undo this action.",
  action,
  confirmationButtonText = "Yes",
  cancelButtonText = "No",
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={setIsModalOpen}
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
        px={8}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={WarningSvg} width={200} alt="Warning" />
        <Typography mt={2} fontWeight={"medium"}>
          {warningText}
        </Typography>
        <Typography>Are you sure?</Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          mt={2}
          width={"100%"}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              action();
              setIsModalOpen(false);
            }}
          >
            {confirmationButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
