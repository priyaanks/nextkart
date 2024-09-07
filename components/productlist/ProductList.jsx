"use client";

import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Product from "../product/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../lib/features/products/products.slice";
import CircularProgress from "@mui/material/CircularProgress";

const ProductList = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const { loading, items } = productsState;

  const [allProducts, setAllProducts] = useState(items);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(loading);
    setAllProducts(items);
  }, [items, loading]);

  return (
    <>
      {!isLoading ? (
        <section id='products'>
          <Typography gutterBottom variant='h2' component='div'>
            Products
          </Typography>
          <Typography variant='body2' sx={{ color: "text.white" }}>
            We are happy to offer you the variety of products.
          </Typography>

          <Grid container spacing={2} alignItems='center' mt={4}>
            {allProducts.map((product, index) => (
              <Grid size={3} key={index}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        </section>
      ) : (
        <CircularProgress color='primary' />
      )}
    </>
  );
};

export default ProductList;
