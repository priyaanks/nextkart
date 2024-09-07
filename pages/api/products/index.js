import productsData from "../../../mock/productsMock.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(productsData);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
