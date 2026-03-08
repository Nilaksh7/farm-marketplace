import { db } from "../config/db.js";

export const getProducts = async (req, res) => {
  const [products] = await db.query(`
    SELECT 
      products.id,
      products.name,
      products.description,
      products.price,
      products.stock_quantity,
      products.image_url,
      products.category,
      farmers.farm_name
    FROM products
    JOIN farmers ON products.farmer_id = farmers.id
  `);

  res.json(products);
};

export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    // find farmer id linked to this user
    const [farmer] = await db.query(
      "SELECT id FROM farmers WHERE user_id = ?",
      [userId],
    );

    if (!farmer.length) {
      return res.json([]);
    }

    const farmerId = farmer[0].id;

    const [products] = await db.query(
      "SELECT * FROM products WHERE farmer_id = ?",
      [farmerId],
    );

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};
export const addProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    const [farmer] = await db.query("SELECT id FROM farmers WHERE user_id=?", [
      userId,
    ]);

    if (!farmer.length) {
      return res.status(403).json({ message: "Farmer profile not found" });
    }

    const farmerId = farmer[0].id;

    const { name, description, price, stock_quantity, category } = req.body;

    // normalize fields coming from frontend
    const stock = stock_quantity;
    const image = req.file ? req.file.path : null;

    // validation
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({
        message: "Name, price and stock are required",
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (Number(stock) < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    const [result] = await db.query(
      `INSERT INTO products 
      (farmer_id, name, description, price, stock_quantity, image_url, category)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        farmerId,
        name,
        description,
        Number(price),
        Number(stock),
        image,
        category,
      ],
    );

    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const [farmer] = await db.query("SELECT id FROM farmers WHERE user_id=?", [
      userId,
    ]);

    if (!farmer.length) {
      return res.status(403).json({ message: "Farmer profile not found" });
    }

    const farmerId = farmer[0].id;

    const { name, description, price, stock_quantity, image_url, category } =
      req.body;

    const [products] = await db.query("SELECT * FROM products WHERE id=?", [
      productId,
    ]);

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = products[0];

    if (product.farmer_id !== farmerId) {
      return res.status(403).json({ message: "You cannot edit this product" });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (stock_quantity < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    await db.query(
      "UPDATE products SET name=?, description=?, price=?, stock_quantity=?, image_url=?, category=? WHERE id=?",
      [
        name,
        description,
        price,
        stock_quantity,
        image_url,
        category,
        productId,
      ],
    );

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const [farmer] = await db.query("SELECT id FROM farmers WHERE user_id=?", [
      userId,
    ]);

    if (!farmer.length) {
      return res.status(403).json({ message: "Farmer profile not found" });
    }

    const farmerId = farmer[0].id;

    // check product ownership
    const [products] = await db.query("SELECT * FROM products WHERE id=?", [
      productId,
    ]);

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = products[0];

    if (product.farmer_id !== farmerId) {
      return res
        .status(403)
        .json({ message: "You cannot delete this product" });
    }

    await db.query("DELETE FROM products WHERE id=?", [productId]);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
};
