import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;

    const [users] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    let user;

    // Existing user → Login
    if (users.length > 0) {
      user = users[0];
    }

    // New user → Register
    else {
      if (!role) {
        return res.status(400).json({
          message: "Role required for new Google users",
        });
      }

      const [result] = await db.query(
        "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
        [name, email, "google-auth", role],
      );

      const userId = result.insertId;

      // If farmer, create farmer profile
      if (role === "FARMER") {
        await db.query("INSERT INTO farmers(user_id,farm_name) VALUES(?,?)", [
          userId,
          `${name}'s Farm`,
        ]);
      }

      const [newUser] = await db.query("SELECT * FROM users WHERE id=?", [
        userId,
      ]);

      user = newUser[0];
    }

    const jwtToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google authentication failed" });
  }
};
