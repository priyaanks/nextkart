import React, { useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { filterProducts } from "@/lib/features/products/products.slice";
import Link from "next/link";

const SearchBar = () => {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.filteredProducts || []
  );

  const handleSearch = (event, value) => {
    dispatch(filterProducts(value ? value : ""));
  };

  return (
    <>
      <Autocomplete
        options={products}
        getOptionLabel={(option) => option.title || ""}
        renderInput={(params) => (
          <TextField
            sx={{ width: "325px" }}
            {...params}
            placeholder='Search products'
          />
        )}
        onInputChange={(event, newInputValue) => {
          dispatch(filterProducts(newInputValue));
        }}
        renderOption={(props, option) => renderSearchResults(option, props)}
        freeSolo
        fullWidth
      />
    </>
  );

  function renderSearchResults(option, props) {
    const { key, ...otherProps } = props;
    return (
      <Box
        component='li'
        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
        {...otherProps}
        key={key}
      >
        <Link href={`/product/${option.id}`}>
          <Grid container spacing={2}>
            <Grid size={3}>
              <Avatar
                src={option.image}
                alt={option.title}
                sx={{
                  width: 40,
                  height: 40,
                  marginRight: 2,
                }}
              />
            </Grid>
            <Grid container size={9}>
              <Typography variant='body1' color='primary'>
                {option.title}
              </Typography>
              <Typography variant='body2'>{option.category}</Typography>
            </Grid>
          </Grid>
        </Link>
      </Box>
    );
  }
};

export default SearchBar;
