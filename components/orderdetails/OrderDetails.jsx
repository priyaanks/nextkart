import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import style from "../../styles/orders.module.css";
import { useSelector } from "react-redux";
import { Grid2 as Grid, TableFooter, Typography } from "@mui/material";

const columns = [
  {
    id: "product",
    label: "Item",
    minWidth: "40%",
  },
  { id: "quantity", label: "Quantity", minWidth: "30%", align: "center" },
  {
    id: "price",
    label: "Price",
    minWidth: "30%",
    align: "center",
  },
];

const OrderDetails = ({ order }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [order]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderRows = (column, item) => {
    switch (column.id) {
      case "product":
        return <div className={style.product}>{item.title}</div>;
      case "quantity":
        return <div className={style.quantity}>{item.count}</div>;
      case "price":
        return <div>{`£ ${(item.price * item.count).toFixed(2)}`}</div>;
      default:
        return <></>;
    }
  };

  return (
    <Paper className={style.paperCart} sx={{ width: "100%" }}>
      {/* Orders */}
      {order ? (
        <>
          <Typography
            variant='h6'
            className={style.tableHeadItem}
            gutterBottom
            component='div'
          >
            Order {order ? order.orderId : ""} Details
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead className={style.tableHead}>
                <TableRow>
                  <TableCell align='left' colSpan={4}>
                    <Grid
                      container
                      spacing={2}
                      className={style.address}
                      sx={{ display: "flex" }}
                      justifyContent='space-evenly'
                    >
                      <Grid xs={12} sm={6} sx={{ flexGrow: 1 }}>
                        <Typography variant='h6' className={style.addressType}>
                          Shipping Information
                        </Typography>
                        <Typography variant='body1'>{order.name}</Typography>
                        <Typography variant='body1'>{order.address}</Typography>
                        <Typography variant='body1'>{order.email}</Typography>
                      </Grid>
                      <Grid xs={12} sm={6} sx={{ flexGrow: 1 }}>
                        <Typography variant='h6' className={style.addressType}>
                          Billing Information
                        </Typography>
                        <Typography variant='body1'>{order.name}</Typography>
                        <Typography variant='body1'>{order.address}</Typography>
                        <Typography variant='body1'>{order.email}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                      className={style.columnHeader}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products[0].items.map((item) => (
                  <TableRow hover role='checkbox' tabIndex={-1} key={item.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {renderRows(column, item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {order.products.length === 0 && (
                  <TableRow hover role='checkbox' tabIndex={-1}>
                    <TableCell colSpan={3}>
                      <Typography variant='body1' className={style.noItems}>
                        No Orders. Keep shopping!!!
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {order.products[0] && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Grid
                        container
                        spacing={2}
                        alignItems='center'
                        sx={{ padding: "1.5rem 1.5rem 0 1.5rem" }}
                      >
                        <Grid
                          size={12}
                          container
                          sx={{
                            justifyContent: "flex-end",
                          }}
                        >
                          <Typography variant='h6' className={style.cartTotal}>
                            Subtotal: £{order.products[0].total.toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </>
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default OrderDetails;
