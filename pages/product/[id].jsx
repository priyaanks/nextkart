import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import {
  fetchProductDetails,
  fetchAllProducts,
} from "@/lib/features/products/products.slice";

export async function getStaticPaths() {
  const response = await fetchAllProducts();
  const products = response[0] || [];
  const paths = products.map((id) => ({ params: { id: id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // We'll fetch the product details in the component
  return { props: { id: params.id } };
}

const ProductPage = ({ id }) => {
  const dispatch = useDispatch();
  const { loading, items } = useSelector(
    (state) => state.products.productDetail
  );

  const [product, setProduct] = useState(items);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setIsLoading(loading);
    setProduct(items);
  }, [items, loading]);

  return id && product ? (
    <ProductDetails product={(loading, product)} />
  ) : (
    <h2>Product not found.</h2>
  );
};

export default ProductPage;
