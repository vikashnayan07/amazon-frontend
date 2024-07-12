import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div class="loader-container">
        <div class="bouncing-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="grid-container">
        <div class="grid-item-1">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div class="grid-item-2">
          <h1 className="productInfo-title">{product.title}</h1>

          <p className="productInfo-category">Category: {product.category}</p>
          <p className="productInfo-rating">Rating: {product.rating}</p>
          <p className="productInfo-price">Price: ${product.price}</p>
          <p className="productInfo-return-policy">
            Return Policy: {product.returnPolicy}
          </p>
          <p className="productInfo-description">
            Details:{product.description}
          </p>
        </div>
        <div class="grid-item-3">
          {" "}
          <div className="checkout-box">
            <h2>Checkout</h2>
            <div class="options">
              {" "}
              <label>
                <input type="radio" name="exchange" value="without" /> Without
                Exchange
              </label>{" "}
            </div>
            <div className="option">
              <label>
                <input type="radio" name="exchange" value="with" /> With
                Exchange
              </label>
              <p>Free Delivery</p>
            </div>
            <div class="location">
              <label for="location">Location:</label>
            </div>
            <button class="add-cart">Add to Cart</button>{" "}
            <button class="buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
