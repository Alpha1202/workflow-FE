import * as React from "react";

import { Container, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifySelf: "center",
        justifyContent: "center",
      }}
    >
      <Typography>Loading.....</Typography>
    </Container>
  );
};

export default Loading;
