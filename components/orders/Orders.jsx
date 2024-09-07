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
import Link from "next/link";

const columns = [
  {
    id: "ordernumber",
    label: "Order Number",
    minWidth: "20%",
  },
  { id: "date", label: "Date", minWidth: "20%" },
  {
    id: "total",
    label: "Total",
    minWidth: "20%",
  },
  { id: "items", label: "Items", minWidth: "20%" },
  {
    id: "action",
    label: "Action",
    minWidth: "20%",
  },
];

const Orders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(null);

  // const cartState = useSelector((state) => state.cart);
  const ordersState = useSelector((state) => state.orders);

  useEffect(() => {
    setOrders(ordersState);
    setIsLoading(false);
  }, [ordersState]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderRows = (column, order) => {
    switch (column.id) {
      case "ordernumber":
        return <div className={style.product}>{order.orderId}</div>;
      case "date":
        return <div>{order.orderDate}</div>;
      case "total":
        return <div>{`£${order.products[0].total.toFixed(2)}`}</div>;
      case "items":
        return (
          <div className={style.quantity}>{order.products[0].count} Items</div>
        );
      case "action":
        return (
          <Link
            className={style.vieworders}
            href={`/orderdetails/${order.orderId}`}
          >
            View
          </Link>
        );
      default:
        return <></>;
    }
  };

  return (
    <Paper className={style.paperCart} sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
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
            {orders.length === 0 ? (
              <TableRow hover role='checkbox' tabIndex={-1}>
                <TableCell colSpan={5}>
                  <Typography variant='body1' className={style.noItems}>
                    No orders placed. Keep shopping!!!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={order.orderId}
                      >
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {renderRows(column, order)}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Orders;
