import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";

const LandingPage = () => {
  return (
    <Grid container spacing={2}>
      {/* App bar 
      <Grid item xs={12}>
        <Container>
          <ResponsiveAppBar />
        </Container>
      </Grid> */}
      {/* Header row */}
      <Grid item xs={12}>
        <Container>
          <Typography variant="h2" align="center">
            Header
          </Typography>
        </Container>
      </Grid>
      {/* Placeholder row */}
      <Grid item xs={12}>
        <Container>
          <Typography variant="h4" align="center">
            Placeholder
          </Typography>
        </Container>
      </Grid>
      {/* Two containers row */}
      <Grid item xs={12} md={6}>
        <Container>
          <Typography variant="h5" align="center">
            Container 1
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12} md={6}>
        <Container>
          <Typography variant="h5" align="center">
            Container 2
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
