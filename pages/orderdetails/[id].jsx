// import { Grid2 as Grid } from "@mui/material";
// import OrderDetails from "@/components/orderdetails/OrderDetails";
// import { useSelector } from "react-redux";

// export async function getStaticPaths() {
//   const orders = useSelector((state) => state.orders);
//   const paths = orders.map((order) => ({
//     params: { id: order.orderId.toString() },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   // Fetch the specific order details
//   const orders = useSelector((state) => state.orders);
//   const order = orders.find((order) => order.orderId === params.id);

//   return { props: { order } };
// }

// const OrderDetailsPage = ({ order }) => {
//   return (
//     <Grid container spacing={2}>
//       <Grid size={12}>
//         <OrderDetails order={order} />
//       </Grid>
//     </Grid>
//   );
// };

// export default OrderDetailsPage;

import { Grid2 as Grid } from "@mui/material";
import OrderDetails from "@/components/orderdetails/OrderDetails";
import { useSelector } from "react-redux";

export async function getStaticPaths() {
  // We'll use a placeholder for paths since we can't access Redux store here
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  // We'll fetch the order details in the component

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
