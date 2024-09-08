import bcrypt from "bcryptjs";
import axios from "axios";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const apiUrl = "http://localhost:5500/users";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const response = await axios.get(apiUrl, { params: { email } });
      const user = response.data[0];

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ error: "Error logging in" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
