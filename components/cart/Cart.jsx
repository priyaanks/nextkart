import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import style from "../../styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Divider,
  Grid2 as Grid,
  TableFooter,
  TextField,
  Typography,
} from "@mui/material";
import {
  updateProductQuantity,
  removeCartItem,
} from "@/lib/features/cart/cart.slice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Link from "next/link";

const columns = [
  {
    id: "product",
    label: "Product\u00a0Details",
    minWidth: "70%",
  },
  { id: "quantity", label: "Quantity", minWidth: "10%", align: "right" },
  {
    id: "price",
    label: "Price",
    minWidth: "10%",
    align: "right",
  },
  {
    id: "remove",
    label: "Remove",
    minWidth: "10%",
    align: "right",
  },
];

const Cart = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cartState = useSelector((state) => state.cart);
  const cartCounter = cart && cart.items ? cart.items.length : 0;

  const dispatch = useDispatch();

  useEffect(() => {
    setCart(cartState);
    setIsLoading(false);
  }, [cartState]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const quantityChange = (e, item) => {
    const quantity = e.target.value;
    dispatch(updateProductQuantity({ quantity, item }));
  };

  const removeFromCart = (item) => {
    dispatch(removeCartItem(item.id));
  };

  const renderRows = (column, item) => {
    switch (column.id) {
      case "product":
        return (
          <div className={style.product}>
            <div className={style.productName}>{item.title}</div>
            <div className={style.categoryName}>{item.category}</div>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                removeFromCart(item);
              }}
              className={style.removeLink}
            >
              Remove
            </a>
          </div>
        );
      case "quantity":
        return (
          <div>
            <TextField
              className={style.quantity}
              id={`quantity${item.id}`}
              type='number'
              defaultValue={item.count}
              onChange={(e) => quantityChange(e, item)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: { min: 0 },
              }}
            />
          </div>
        );
      case "price":
        return <div>{`£ ${(item.price * item.count).toFixed(2)}`}</div>;
      case "remove":
        return (
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              removeFromCart(item);
            }}
          >
            <DeleteForeverIcon />
          </a>
        );
      default:
        return <></>;
    }
  };

  return (
    <Paper className={style.paperCart} sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead className={style.tableHead}>
            <TableRow>
              <TableCell
                className={style.tableHeadItem}
                align='left'
                colSpan={2}
              >
                Shopping Cart
              </TableCell>
              <TableCell
                className={style.tableHeadItem}
                align='right'
                colSpan={3}
              >
                {cartCounter} Items
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
            {cart &&
              cartCounter > 0 &&
              cart.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={item.id}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {renderRows(column, item)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            {cart && cartCounter === 0 && (
              <TableRow hover role='checkbox' tabIndex={-1}>
                <TableCell>
                  <Typography variant='body1' className={style.noItems}>
                    No items in cart. Keep shopping!!!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <Grid
                  container
                  spacing={2}
                  alignItems='center'
                  sx={{ padding: "1.5rem 1.5rem 0 1.5rem" }}
                >
                  <Grid size={4}>
                    <Link
                      color='inherit'
                      href='/'
                      className={style.continueShopping}
                    >
                      Continue Shopping
                    </Link>
                  </Grid>
                  <Grid
                    size={4}
                    container
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant='body1'
                      sx={{ display: "inline", paddingRight: "6px" }}
                    >
                      Subtotal:
                    </Typography>
                    <Typography variant='h5' className={style.cartTotal}>
                      £{cart.total.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    size={4}
                    sx={{
                      justifyContent: "flex-end",
                    }}
                  >
                    <Link href='/checkout'>
                      <Button variant='contained' color='primary'>
                        Checkout
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={cartCounter}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

export default Cart;
