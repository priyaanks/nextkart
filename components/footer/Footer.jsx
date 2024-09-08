import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import styles from "../../styles/footer.module.css";

function Copyright() {
  return (
    <Typography
      className={styles.footerContent}
      align='center'
      variant='body2'
      sx={{ color: "#fff" }}
    >
      {"Copyright © "}
      <Link color='inherit' href='/'>
        NextKart
      </Link>
      {` ${new Date().getFullYear()}. `}
      All rights reserved.
    </Typography>
  );
}

const Footer = () => {
  return (
    <div className={styles.root}>
      <CssBaseline />
      <footer className={styles.footer}>
        <Container maxWidth='sm'>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
