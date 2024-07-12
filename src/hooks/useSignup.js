import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const useSignup = () => {
  const signUp = async ({ name, mobile, email, password }) => {
    const URL = "http://localhost:4000/api/signup";
    const OPTIONS = {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
    console.log(data);
    toast.success("User Created Succesfully ");
  };
  return { signUp };
};

export default useSignup;
