import { Grid2 as Grid } from "@mui/material";
import Orders from "@/components/orders/Orders";

const OrderDetailsPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Orders />
      </Grid>
    </Grid>
  );
};

export default OrderDetailsPage;
