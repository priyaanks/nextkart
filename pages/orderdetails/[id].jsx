import { Grid2 as Grid } from "@mui/material";
import OrderDetails from "@/components/orderdetails/OrderDetails";
import { useSelector } from "react-redux";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  return { props: { orderId: params.id } };
}

const OrderDetailsPage = ({ orderId }) => {
  const orders = useSelector((state) => state.orders);

  const order = orders.find((order) => {
    return order.orderId === orderId;
  });
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <OrderDetails order={order} />
      </Grid>
    </Grid>
  );
};

export default OrderDetailsPage;
