import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const LinkItem = ({ title, url, onClick, icon, imgIcon, notification }) => {
  const { pathname } = useLocation();
  const isActive = pathname == url;
  return url ? (
    <Link to={url}>
      <Button
        sx={{
          textTransform: "none",
          borderRadius: 0,
          width: "100%",
          textAlign: "left",
          justifyContent: "start",
          color: "black",
          height: 64,
          paddingX: 4,
          borderColor: "red",
          fontWeight: "regular",
        }}
        startIcon={icon ? icon : <img src={imgIcon} width={24} height={24} />}
        endIcon={
          !!(notification > 0) && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              ml={8}
              sx={{
                height: 18,
                width: 18,
                borderRadius: 99,
                backgroundColor: "primary.light",
              }}
            >
              <Typography fontSize={10} color={"#fff"} fontWeight={"bold"}>
                {notification}
              </Typography>
            </Box>
          )
        }
        onClick={onClick ? onClick : () => null}
        size="large"
      >
        <Typography> {title}</Typography>
      </Button>
    </Link>
  ) : (
    <Button
      sx={{
        textTransform: "none",
        borderRadius: 0,
        width: "100%",
        textAlign: "left",
        justifyContent: "start",
        color: isActive ? "primary" : "black",
        height: 64,
        paddingX: 4,
        borderBottom: isActive ? 3 : 0,
        borderColor: "red",
        fontWeight: "regular",
      }}
      startIcon={icon ? icon : <img src={imgIcon} width={24} height={24} />}
      onClick={onClick ? onClick : () => null}
      size="large"
    >
      {title}
    </Button>
  );
};

export default LinkItem;
