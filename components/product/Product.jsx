import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Image from "next/image";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <Card style={{ position: "relative" }}>
      <CardMedia>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            width={0}
            height={0}
            sizes='100vw'
            priority={false}
            style={{ width: "100%", height: "140px" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "220px",
              backgroundColor: "#f0f0f0",
            }}
          >
            No Image Available
          </div>
        )}
      </CardMedia>

      <CardContent>
        <Typography
          color='primary'
          gutterBottom
          variant='subtitle1'
          component='div'
          noWrap={true}
        >
          {product.category}
        </Typography>
        <Typography gutterBottom variant='h5' component='div' noWrap={true}>
          {product.title}
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "text.secondary" }}
          noWrap={true}
        >
          {product.excerpt}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/product/${product.id}`}>
          <Button variant='text' size='small'>
            Learn More <DoubleArrowIcon />
          </Button>
        </Link>
        <Typography
          sx={{
            color: "text.primary",
            display: "flex",
            justifyContent: "flex-end",
          }}
          variant='body1'
        >
          <strong>{`£${product.price}`}</strong>
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Product;
