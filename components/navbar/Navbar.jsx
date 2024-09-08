"use client";

import React, { useState, useEffect, use } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "../../styles/navbar.module.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "@/components/search/SearchBar";
import { useAuth } from "@/lib/context/AuthContext";

const Navbar = () => {
  const [userMenuExpand, setUserMenuExpand] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cart, setCart] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const router = useRouter();
  const { user, logout } = useAuth();

  const cartState = useSelector((state) => state.cart);
  const cartCounter = cart && cart.items ? cart.items.length : 0;

  useEffect(() => {
    setCart(cartState);
  }, [cartState]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (redirect, mode) => {
    setAnchorEl(null);

    if ("logout" === mode) {
      logout();
    }
    if (redirect) {
      router.push(redirect);
    }
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className={styles.userMenu}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn
        ? [
            <MenuItem key='login' onClick={() => handleMenuClose("/login")}>
              <LoginIcon />
              Login
            </MenuItem>,
          ]
        : [
            <MenuItem key='orders' onClick={() => handleMenuClose("/orders")}>
              <ShoppingBasketIcon />
              Orders
            </MenuItem>,
            <MenuItem
              key='logout'
              onClick={() => handleMenuClose("/login", "logout")}
            >
              <LogoutIcon />
              Logout
            </MenuItem>,
          ]}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Link color='inherit' href='/'>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              NextKart
            </Typography>
          </Link>
          <div className={styles.search}>
            <SearchBar />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href={`/cart`}>
              <IconButton
                size='large'
                aria-label={`Cart with ${cartCounter} items`}
                color='inherit'
              >
                <Badge badgeContent={cartCounter} color='error'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Navbar;
