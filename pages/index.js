import HeroBanner from "../components/hero/HeroBanner";
import ProductList from "../components/ProductList/ProductList";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <main className='main'>
        <ProductList />
      </main>
    </>
  );
}
