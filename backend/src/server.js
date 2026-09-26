import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const users = [];

app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access token required"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token"
      });
    }

    req.user = user;
    next();
  });
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};

app.get("/", (req, res) => {
  res.send("Academia-Industry Portal Backend is running!");
});

app.post("/api/auth/register", async (req, res) => {
  const { email, password, role } = req.body;

  const existingUser = users.find((user) => user.email === email);

if (existingUser) {
  return res.status(409).json({
    message: "Email already registered"
  });
}

 const hashedPassword = await bcrypt.hash(password, 10);

users.push({
  email,
  password: hashedPassword,
  role
});

console.log("Registration request:", email, role);

res.json({
  message: "Registration successful!",
  email,
  role
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = jwt.sign(
  {
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);

  res.json({
  message: "Login successful!",
  email: user.email,
  role: user.role,
  token
});

});

app.get("/api/auth/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Access granted!",
    user: req.user
  });
});

app.get(
  "/api/student/dashboard",
  authenticateToken,
  authorizeRoles("student"),
  (req, res) => {
    res.json({
      message: "Welcome to the Student Dashboard!",
      user: req.user
    });
  }
);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});