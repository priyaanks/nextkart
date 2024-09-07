import React, { useState, useEffect, Fragment } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Grid2 as Grid } from "@mui/material";
import { useSelector } from "react-redux";
import style from "@/styles/checkout.module.css";

const OrderSummary = () => {
  const [cart, setCart] = useState([]);

  const cartState = useSelector((state) => state.cart);
  const cartCounter = cart && cart.items ? cart.items.length : 0;

  useEffect(() => {
    setCart(cartState);
  }, [cartState]);

  return (
    <>
      <CardHeader title='Your Order' className={style.checkoutHeader} />
      <CardContent>
        {cartCounter > 0 ? (
          <Grid container spacing={2}>
            {cart.items.map((item) => {
              return (
                <Fragment key={item.id}>
                  <Grid size={9} key={item.id}>
                    <Typography
                      className={style.productDetails}
                      variant='body2'
                      sx={{ color: "text.secondary" }}
                    >
                      {item.title} x {item.count}
                    </Typography>
                  </Grid>
                  <Grid size={3}>
                    <Typography
                      className={style.productDetails}
                      textAlign='right'
                      variant='body2'
                      sx={{ color: "text.secondary" }}
                    >
                      £{(item.price * item.count).toFixed(2)}
                    </Typography>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        ) : (
          <span>No Items in cart. Go Shopping!</span>
        )}
      </CardContent>
      <CardContent>
        <Divider />
        <Grid container spacing={3} sx={{ padding: "1.5rem 0 0 0" }}>
          <Grid size={6}>
            <Typography
              variant='h6'
              sx={{ color: "text.secondary" }}
              className={style.checkoutHeader}
            >
              Total
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              textAlign='right'
              variant='h6'
              sx={{ color: "text.secondary" }}
              className={style.checkoutHeader}
            >
              £{cart.total && cart.total.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

export default OrderSummary;
