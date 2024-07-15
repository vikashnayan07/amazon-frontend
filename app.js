import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./src/globalStyles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./src/pages/homePage";
import SearchPage from "./src/pages/amazonSearchPage";
import ProductInfo from "./src/pages/productInfo";
import AppContext from "./src/context/appContext";
import SignUp from "./src/pages/singnUp";
import ProductDetail from "./src/components/ProductDetail";
import SignIn from "./src/pages/singIn";
import { Toaster } from "react-hot-toast";
import CartPage from "./src/pages/CartPage";

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);

const categories = [
  "Fresh",
  "Amazon MiniTV",
  "Sell",
  "Best Sellers",
  "Mobiles",
  "Todays Deals",
  "Prime",
  "Fashion",
  "Electronics",
];

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setLoggedInUser(user);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: loggedInUser ? <HomePage /> : <SignIn />,
    },
    {
      path: "/search",
      element: loggedInUser ? <SearchPage /> : <SignIn />,
    },
    {
      path: "/search/:id",
      element: loggedInUser ? <ProductDetail /> : <SignIn />,
    },
    {
      path: "/signup",
      element: loggedInUser ? <HomePage /> : <SignUp />,
    },
    {
      path: "/signin",
      element: loggedInUser ? <HomePage /> : <SignIn />,
    },
    {
      path: "/cart",
      element: loggedInUser ? <CartPage /> : <SignIn />,
    },
  ]);

  const addToCart = (elem) => {
    const isPresent = cart.findIndex((cI) => cI.id === elem.id);
    if (isPresent === -1) {
      const newCart = [...cart];
      newCart.push({
        warranty: elem.warrantyInformation,
        return: elem.returnPolicy,
        stock: elem.availabilityStatus,
        image: elem.thumbnail,
        title: elem.title,
        id: elem.id,
        price: elem.price,
        count: 1,
      });
      setCart(newCart);
    } else {
      const newCart = cart.map((cartItem) => {
        if (cartItem.id === elem.id) {
          const newCartItem = { ...cartItem };
          newCartItem.count += 1;
          return newCartItem;
        } else return cartItem;
      });
      setCart(newCart);
    }
  };

  const appLogin = (user) => {
    setLoggedInUser(user);
  };

  const appLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("authorization");
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setCart([]);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const contextValues = {
    loggedInUser,
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    categories,
    searchText,
    setSearchText,
    appLogin,
    appLogout,
  };
  console.log("state", loggedInUser);

  return (
    <AppContext.Provider value={contextValues}>
      <RouterProvider router={router} />
      <Toaster />
    </AppContext.Provider>
  );
};

root.render(<App />);
