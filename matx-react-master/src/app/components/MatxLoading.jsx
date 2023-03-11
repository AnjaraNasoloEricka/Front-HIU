import { CircularProgress } from "@mui/material";
import ReactLoading from "react-loading";
import { Box, styled } from "@mui/system";

const StyledLoading = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: 'column',
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "auto",
    height: "25px",
  },
  "& .circleProgress": {
    position: "absolute",
    left: -7,
    right: 0,
    top: "calc(50% - 25px)",
  },
}));

const Loading = ({text}) => {
  return (
    <StyledLoading>
      <p style={{color: 'grey'}}>{text}</p>
      <ReactLoading type={"bubbles"} color={"blue"} height={30} width={50} />
    </StyledLoading>
  );
};

export default Loading;
