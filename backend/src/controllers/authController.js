import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../config/db.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let { role } = req.body;

    // normalize role and default to BUYER
    role = role ? role.toUpperCase() : "BUYER";

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
      [name, email, hashed, role],
    );

    const userId = result.insertId;

    // if farmer create farmer profile
    if (role === "FARMER") {
      await db.query("INSERT INTO farmers (user_id, farm_name) VALUES (?, ?)", [
        userId,
        `${name}'s Farm`,
      ]);
    }

    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: userId,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (users.length === 0)
    return res.status(401).json({ message: "User not found" });

  const user = users[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.json({ token, user });
};
