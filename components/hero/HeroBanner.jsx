import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

const HeroBanner = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", pb: 6 }}>
      <Container maxWidth='lg'>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={6}>
            <Typography
              component='h1'
              variant='h2'
              color='text.primary'
              gutterBottom
            >
              Welcome to Our Store
            </Typography>
            <Typography variant='h5' color='text.secondary'>
              Discover amazing products and great deals. Shop now and experience
              the best in online shopping.
            </Typography>
            <Button variant='contained' color='primary' size='large'>
              Shop Now
            </Button>
          </Grid>
          <Grid size={6}>
            <Image
              src='/images/placeholder.jpeg'
              alt='product image'
              sizes='100vw'
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              width={500}
              height={220}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroBanner;
