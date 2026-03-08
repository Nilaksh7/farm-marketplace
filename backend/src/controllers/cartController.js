import { db } from "../config/db.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const [products] = await db.query(
      "SELECT stock_quantity FROM products WHERE id=?",
      [productId],
    );

    if (products.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const product = products[0];

    if (product.stock_quantity < quantity) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    await db.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [userId, productId, quantity],
    );

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;

    if (quantity <= 0) {
      await db.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [
        user_id,
        product_id,
      ]);
    } else {
      await db.query(
        "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
        [quantity, user_id, product_id],
      );
    }

    res.json({ message: "Cart updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating cart" });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  const [items] = await db.query(
    `SELECT cart.id, cart.product_id, products.name, products.price, cart.quantity
     FROM cart
     JOIN products ON cart.product_id = products.id
     WHERE cart.user_id = ?`,
    [userId],
  );

  res.json(items);
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM cart WHERE id=?", [id]);

  res.json({ message: "Removed from cart" });
};
