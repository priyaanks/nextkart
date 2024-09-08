import bcrypt from "bcryptjs";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await axios.post("http://localhost:5500/users", {
        name,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error registering user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
