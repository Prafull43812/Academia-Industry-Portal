import express from "express";
import bcrypt from "bcryptjs";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Academia-Industry Portal Backend is running!");
});

app.post("/api/auth/register", async (req, res) => {
  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Registration request:", email, role);
  
  res.json({
    message: "Registration endpoint working!",
    email,
    role
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});