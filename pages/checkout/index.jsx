import { Box, Grid2 as Grid, Paper } from "@mui/material";
import OrderSummary from "@/components/ordersummary/OrderSummary";
import CheckoutSummary from "@/components/checkoutsummay/CheckoutSummary";
import { styled } from "@mui/system";

const Item = styled(Paper)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}));

const CartPage = () => {
  return (
    <Grid container spacing={2} sx={{ margin: "3rem 1rem" }}>
      <Grid size={8}>
        <Item>
          <CheckoutSummary />
        </Item>
      </Grid>
      <Grid size={4}>
        <Item>
          <OrderSummary />
        </Item>
      </Grid>
    </Grid>
  );
};

export default CartPage;
