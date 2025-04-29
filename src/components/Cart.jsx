import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, cartCount, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartCount === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart ({cartCount} items)</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <Link to="/checkout" className="checkout-btn">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
