import { useContext } from "react";
import CategoryBar from "../components/categoryBar";
import Navbar from "../components/navbar";
import useGetProducts from "../hooks/useGetProducts";
import AppContext from "../context/appContext";
import { useNavigate } from "react-router-dom";

const SearchPage = (props) => {
  const { categories } = props;
  const products = useGetProducts();
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={i} className="star">
              ★
            </span>
          ))}
        {halfStar && <span className="star">★</span>}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <span key={i + fullStars + 1} className="star empty">
              ★
            </span>
          ))}
      </>
    );
  };
  const handleProductInfo = (id) => {
    navigate(`/search/${id}`);
  };

  return (
    <>
      <Navbar />
      <CategoryBar categories={categories} />
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-images">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
            </div>
            <div className="product-details">
              <h2
                className="product-title"
                onClick={() => handleProductInfo(product.id)}
              >
                {product.title}
              </h2>
              <p className="product-rating">{renderStars(product.rating)}</p>
              <p className="product-category">{product.tags.join(", ")}</p>
              {product.availabilityStatus === "In Stock" ? (
                <span className="product-status-inStock">
                  {product.availabilityStatus}
                </span>
              ) : (
                <span className="product-status-outStock">
                  {product.availabilityStatus}
                </span>
              )}

              <h1 className="product-price">${product.price}</h1>
              <button
                className="view-button"
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
