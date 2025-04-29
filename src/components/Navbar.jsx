import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Shop
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart" className="cart-link">
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
