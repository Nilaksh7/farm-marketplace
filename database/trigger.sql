-- ============================
-- TRIGGERS
-- ============================

DELIMITER $$

CREATE TRIGGER update_product_rating_after_insert
AFTER INSERT ON Review
FOR EACH ROW
BEGIN
    UPDATE Product
    SET averageRating = (
        SELECT AVG(rating) FROM Review WHERE productId = NEW.productId
    )
    WHERE id = NEW.productId;
END$$

CREATE TRIGGER reduce_stock_after_orderitem
AFTER INSERT ON OrderItem
FOR EACH ROW
BEGIN
    UPDATE Product
    SET stockQuantity = stockQuantity - NEW.quantity
    WHERE id = NEW.productId;
END$$

CREATE TRIGGER prevent_negative_stock
BEFORE UPDATE ON Product
FOR EACH ROW
BEGIN
    IF NEW.stockQuantity < 0 THEN
        SET NEW.stockQuantity = 0;
    END IF;

    IF NEW.stockQuantity = 0 THEN
        SET NEW.isAvailable = FALSE;
    END IF;
END$$

CREATE TRIGGER set_delivered_timestamp
BEFORE UPDATE ON OrderItem
FOR EACH ROW
BEGIN
    IF NEW.deliveryStatus = 'delivered' AND OLD.deliveryStatus != 'delivered' THEN
        SET NEW.deliveredAt = NOW();
    END IF;
END$$

CREATE TRIGGER create_payout_after_payment
AFTER INSERT ON Payment
FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' THEN
        INSERT INTO Payout (farmerId, amount, status, orderItemId)
        SELECT 
            p.farmerId,
            (oi.quantity * oi.price), -- Logic: Item Price * Qty
            'pending',
            oi.id                     -- The crucial link
        FROM Checkout c
        JOIN `Order` o ON o.checkoutId = c.id
        JOIN OrderItem oi ON oi.orderId = o.id
        JOIN Product p ON p.id = oi.productId
        WHERE c.id = NEW.checkoutId;
    END IF;
END$$

CREATE TRIGGER validate_review_purchase
BEFORE INSERT ON Review
FOR EACH ROW
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM OrderItem oi
        JOIN `Order` o ON oi.orderId = o.id
        WHERE o.userId = NEW.reviewerId
        AND oi.productId = NEW.productId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot review without verified purchase';
    END IF;
END$$

CREATE TRIGGER release_payout_on_delivery
AFTER UPDATE ON OrderItem
FOR EACH ROW
BEGIN
    IF NEW.deliveryStatus = 'delivered' AND OLD.deliveryStatus != 'delivered' THEN
        UPDATE Payout
        SET status = 'transferred'
        WHERE orderItemId = NEW.id;
        UPDATE Farmer
        SET totalSales = totalSales + 1
        WHERE id = (SELECT farmerId FROM Product WHERE id = NEW.productId);
        
    END IF;
END$$

CREATE TRIGGER update_farmer_rating_after_review_insert
AFTER INSERT ON Review
FOR EACH ROW
BEGIN
    DECLARE farmerId INT;
    
    SELECT p.farmerId INTO farmerId 
    FROM Product p 
    WHERE p.id = NEW.productId;
    
    UPDATE Farmer
    SET rating = (
        SELECT AVG(p.averageRating)
        FROM Product p
        WHERE p.farmerId = farmerId 
        AND p.averageRating IS NOT NULL
    )
    WHERE id = farmerId;
END$$


DELIMITER ;