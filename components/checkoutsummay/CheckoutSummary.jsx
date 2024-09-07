import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Alert, AlertTitle, Button, Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateOrderDetails } from "@/lib/features/orders/orders.slice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { resetCart } from "@/lib/features/cart/cart.slice";

const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = useState(null);

  const cartDetails = useSelector((state) => state.cart);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateNKODCode = () => {
    const prefix = "NKOD";
    let result = prefix;

    for (let i = 0; i < 10; i++) {
      result += Math.floor(Math.random() * 10);
    }

    return result;
  };

  const onSubmit = (data) => {
    if (cartDetails) {
      const now = new Date();
      const orderDetails = {
        ...data,
        orderId: generateNKODCode(),
        orderDate: now.toLocaleString(),
        products: [cartDetails],
      };
      dispatch(updateOrderDetails(orderDetails));
      setOrderPlaced(true);
      setTimeout(() => {
        dispatch(resetCart());
        router.push("/");
      }, 3000);
    } else {
      setOrderPlaced(false);
    }
  };

  const onError = (errors) => {
    console.log("🚀 ~ onError ~ errors:", errors);
  };

  return (
    <>
      <CardContent>
        <Typography variant='h5'>Checkout</Typography>
        <form>
          <Grid container spacing={2}>
            <Grid size={12}>
              <label>Name</label>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label=''
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    placeholder='John Doe'
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <label>Email</label>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label=''
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    placeholder='john.doe@example.com'
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <label>Shipping Address</label>
              <Controller
                name='address'
                control={control}
                defaultValue=''
                rules={{ required: "Shipping address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label=''
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    placeholder='123 Main St, Anytown, USA'
                  />
                )}
              />
            </Grid>
          </Grid>

          {orderPlaced && (
            <Alert severity='success'>
              <AlertTitle>Order Placed</AlertTitle>
              You will be redirected to the home page in 3 second.
            </Alert>
          )}

          {!orderPlaced && (
            <Button
              sx={{ marginTop: "20px" }}
              variant='contained'
              color='primary'
              onClick={handleSubmit(onSubmit, onError)}
            >
              Place Order
            </Button>
          )}
        </form>
      </CardContent>
    </>
  );
};

export default CheckoutSummary;
