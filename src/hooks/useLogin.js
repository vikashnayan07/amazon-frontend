import { useContext } from "react";
import toast from "react-hot-toast";
import AppContext from "../context/appContext";

const useLogin = () => {
  const { appLogin } = useContext(AppContext);
  const userSignin = async ({ mobile, email, password }) => {
    const URL = "http://localhost:4000/api/login";
    const OPTIONS = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mobile ? { mobile, password } : { email, password }),
    };
    const res = await fetch(URL, OPTIONS);
    const data = await res.json();
    if (data.message === "Login successful") {
      appLogin(data.data.user);
      localStorage.setItem("authorization", data.data.token);
      toast.success("Login successful");
    } else {
      toast.error("Invalid email or password");
    }

    console.log(data);
  };
  return { userSignin };
};

export default useLogin;
