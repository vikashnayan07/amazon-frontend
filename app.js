import ReactDOM from "react-dom/client";
import "./src/globalStyles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./src/pages/homePage";
import SearchPage from "./src/pages/amazonSearchPage";
import { useState } from "react";
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: loggedInUser ? <HomePage /> : <SignUp />,
    },
    {
      path: "/search",
      element: loggedInUser ? <SearchPage /> : <SignUp />,
    },
    {
      path: "/search/:id",
      element: loggedInUser ? <ProductDetail /> : <SignUp />,
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
      element: loggedInUser ? <CartPage /> : <SignUp />,
    },
  ]);

  const addToCart = (elem) => {
    console.log(elem);
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
          newCartItem.count = newCartItem.count + 1;
          return newCartItem;
        } else return cartItem;
      });
      setCart(newCart);
    }
  };

  const appLogin = (user) => {
    setLoggedInUser(user);
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
  };
  console.log("state", loggedInUser);

  return (
    <AppContext.Provider value={contextValues}>
      <RouterProvider router={router} />;
      <Toaster />
    </AppContext.Provider>
  );
};

root.render(<App />);
