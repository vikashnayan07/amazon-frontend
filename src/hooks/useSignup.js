// useSignup.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useSignup = () => {
  const signUp = async ({ name, mobile, email, password }) => {
    const URL = "http://localhost:4000/api/signup";
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        password,
      }),
    };
    const res = await fetch(URL, OPTIONS);
    const data = await res.json();

    if (res.status === 201) {
      return true;
    } else if (res.status === 400 && data.message === "User already exists") {
      toast.error("User already exists!");
    } else {
      toast.error("An error occurred. Please try again.");
    }

    return false;
  };
  return { signUp };
};

export default useSignup;
