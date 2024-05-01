import { Box } from "@mui/material";
import React from "react";
import ShimmerLoading from "../../../Components/Loaders/ShimmerLoading";

const LoaderItem = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      gap={2}
      px={2}
      height={66}
    >
      <ShimmerLoading height={48} width={48} borderRadius={99} />
      <ShimmerLoading height={48} width={"100%"} sx={{ flex: 1 }} />
    </Box>
  );
};

const ChatPreviewLoader = () => {
  return (
    <React.Fragment>
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
      <LoaderItem />
    </React.Fragment>
  );
};

export default ChatPreviewLoader;
