import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/firestore";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Fetch single product
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          }
        } else {
          // Fetch all products
          const querySnapshot = await getDocs(collection(db, "products"));
          const productsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (id && product) {
    return (
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <Link to="/products" className="back-link">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
