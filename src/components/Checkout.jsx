import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firestore";

const Checkout = () => {
  const { cart, cartCount, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit",
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = {
        customer: formData,
        items: cart,
        total: totalPrice,
        date: new Date().toISOString(),
        status: "pending",
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      // Here you would typically clear the cart
    } catch (error) {
      console.error("Error placing order: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="order-success">
        <h2>Order Placed Successfully!</h2>
        <p>Your order ID is: {orderId}</p>
        <p>We've sent a confirmation to {formData.email}</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout ({cartCount} items)</h2>
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Information</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            required
          />

          <h3>Payment Method</h3>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </select>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
