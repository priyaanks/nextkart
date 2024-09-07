import productsData from "../../../mock/productsMock.json";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const product = productsData.products.find((p) => p.id.toString() === id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
