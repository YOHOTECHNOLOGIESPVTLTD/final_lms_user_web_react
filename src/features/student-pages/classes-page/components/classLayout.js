import React from "react";
import { Grid } from "@mui/material";
import { ClassBackroundBg, ClassBg1 } from "utils/images";

const ClassLayout = ({ children }) => {
  return (
    <Grid
      container
      sx={{
        background: `url(${ClassBackroundBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        padding: 4,
        overflow: "hidden", 
        position: "relative", 
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        sx={{
          background: `url(${ClassBg1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'bottom center',
          height: '35vh',
          width: '100%', 
          // left : 0,
          // right : 0,
          position: 'absolute', 
          bottom: 0,
        }}
      />
      {children}
    </Grid>
  );
};

export default ClassLayout;
