import { db } from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const [cart] = await db.query("SELECT * FROM cart WHERE user_id=?", [
      userId,
    ]);

    if (!cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // create order
    const [orderResult] = await db.query(
      "INSERT INTO orders(user_id,total_amount) VALUES(?,?)",
      [userId, 0],
    );

    const orderId = orderResult.insertId;

    let total = 0;

    for (const item of cart) {
      const [product] = await db.query(
        "SELECT price, farmer_id FROM products WHERE id=?",
        [item.product_id],
      );

      const price = product[0].price;
      const farmerId = product[0].farmer_id;

      total += price * item.quantity;

      await db.query(
        `INSERT INTO order_items(order_id,product_id,farmer_id,quantity,price)
         VALUES(?,?,?,?,?)`,
        [orderId, item.product_id, farmerId, item.quantity, price],
      );
    }

    // update order total
    await db.query("UPDATE orders SET total_amount=? WHERE id=?", [
      total,
      orderId,
    ]);

    await db.query("DELETE FROM cart WHERE user_id=?", [userId]);

    res.json({ message: "Order placed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

export const getFarmerOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const [farmer] = await db.query(
      "SELECT id FROM farmers WHERE user_id = ?",
      [userId],
    );

    if (!farmer.length) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const farmerId = farmer[0].id;

    const [orders] = await db.query(
      `SELECT orders.id as order_id,
              users.name as buyer,
              products.name as product,
              order_items.quantity,
              order_items.price
       FROM order_items
       JOIN products ON order_items.product_id = products.id
       JOIN orders ON order_items.order_id = orders.id
       JOIN users ON orders.user_id = users.id
       WHERE products.farmer_id = ?`,
      [farmerId],
    );

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching farmer orders",
    });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.user.id;

  const [orders] = await db.query("SELECT * FROM orders WHERE user_id=?", [
    userId,
  ]);

  res.json(orders);
};
