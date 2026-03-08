import API from "./api";

const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/cart",
      {
        productId: productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Added to cart");
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Error adding to cart");
  }
};

export default addToCart;
