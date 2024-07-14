import React, { useContext } from "react";
import AppContext from "../context/appContext";
import Navbar from "../components/navbar";
import CategoryBar from "../components/categoryBar";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(AppContext);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <>
      <Navbar />
      <CategoryBar />

      <div className="grid-container">
        <div className="grids-item-1">
          {" "}
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="cart-items">
              <h1>Shopping Cart</h1>
              <span>Price</span>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <div className="title-price">
                      <span>{item.title}</span>
                      <p>${item.price * item.count}</p>
                    </div>
                    <div className="other-details">
                      {item.stock === "In Stock" ? (
                        <p className="cart-status-inStock">{item.stock}</p>
                      ) : (
                        <p className="cart-status-outStock">{item.stock}</p>
                      )}
                      <p>Eligible for FREE Shipping</p>
                      <img src={require("./image.png")} alt="amazon-filled" />
                      <span>returnPolicy: {item.return}</span>
                      <span>warranty: {item.warranty}</span>
                      <div className="quantity">
                        <span>Quantity: {item.count}</span>
                        <button
                          className="btn"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                        <button
                          className="btn"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <div className="remove-container">
                          {" "}
                          <button onClick={() => removeFromCart(item.id)}>
                            Delete
                          </button>
                          <p>Save for later</p>
                          <p>See more like this</p>
                          <p> Share</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="total-amount">
                Subtotal ({cart.reduce((total, item) => total + item.count, 0)}{" "}
                items)
                <h2>${subtotal.toFixed(2)}</h2>
              </div>
            </div>
          )}
        </div>

        <div class="feed-card">
          <div class="feed-card-content">
            <p>Your order is eligible for FREE Delivery. </p>{" "}
            <span>Choose FREE Delivery option at checkout.</span>
            <br />
            <div className="feed-total-amount">
              Subtotal ({cart.reduce((total, item) => total + item.count, 0)}{" "}
              items) :<h3>${subtotal.toFixed(2)}</h3>
            </div>
            <div className="checkbox-feed">
              {" "}
              <input type="checkbox" />
              <label> This order contains a gifts</label>
            </div>
            <div className="feed-button">Proceed to buy</div>
          </div>
          <div className="emi">
            <select>
              <option>EMI available</option>
            </select>
          </div>
          <div className="feed-card-2">
            <div className="grids-item-2">
              <h3>Your recently viewed items</h3>
              <div className="card-special">
                {cart.map((item) => (
                  <div key={item.id} className="cart-special-item">
                    <div className="items-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="items-details">
                      <div className="titles-price">
                        <span>{item.title}</span>
                        <p>${item.price}</p>
                        <button>Add cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
