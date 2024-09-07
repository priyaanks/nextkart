"use client";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { addCartItem } from "@/lib/features/cart/cart.slice";
import { useDispatch } from "react-redux";

const ProductDetails = ({ loading, product }) => {
  const dispatch = useDispatch();

  const addTocart = () => {
    dispatch(addCartItem(product));
  };

  return (
    <>
      {!loading ? (
        <Card>
          <Grid container spacing={2} alignItems='center'>
            <Grid size={3}>
              <CardMedia>
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: "100%", height: "220px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    No Image Available
                  </div>
                )}
              </CardMedia>
            </Grid>
            <Grid size={9}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {product.title}
                </Typography>
                <Typography variant='body2' sx={{ color: "text.secondary" }}>
                  {product.description}
                </Typography>
                <Typography
                  style={{ marginTop: "20px" }}
                  variant='body1'
                  sx={{ color: "text.primary" }}
                >
                  Price: <strong>£{product.price}</strong>
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant='contained' size='small' onClick={addTocart}>
                  <AddShoppingCartIcon size='small' /> Add to cart
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <CircularProgress color='primary' />
      )}
    </>
  );
};

export default ProductDetails;
