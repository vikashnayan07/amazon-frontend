import React, { useContext } from "react";
import AppContext from "../context/appContext";
import Navbar from "../components/navbar";
import CategoryBar from "../components/categoryBar";

const CartPage = () => {
  const { cart } = useContext(AppContext);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <>
      <Navbar />
      <CategoryBar />
      <div className="cart-page">
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
                    {" "}
                    {item.stock === "In Stock" ? (
                      <p className="cart-status-inStock">{item.stock}</p>
                    ) : (
                      <p className="cart-status-outStock">{item.stock}</p>
                    )}
                    <p>Eligible for FREE Shipping</p>
                    <span>Quantity: {item.count}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="total-amount">
              Subtotal ({cart.reduce((total, item) => total + item.count, 0)}{" "}
              items) <h2>: ${subtotal.toFixed(2)}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
