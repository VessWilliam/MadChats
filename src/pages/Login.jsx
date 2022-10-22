import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import Brands from "../components/Brands";

function Registered() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { password, email } = values;

  const handleSubmit = async (event) => {
    await event.preventDefault();
    try {
      if (await handleValidation()) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await navigate("/");
        console.log(result.user);
        updateDoc(doc(db, "Users", result.user.uid), {
          isOnline: true,
        });

        setValues({
          email: "",
          password: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleValidation = async () => {
    if (password === "") {
      await toast.error("Email and password required", toastOptions);
      return false;
    } else if (email.length === "") { 
      await toast.error("Email and password required", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = async (event) => {
    await setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="registerPage">
        <Brands />
        <form
          className="flex flex-col gap-2 w-[400px] h-[400px] rounded py-12 "
          onSubmit={(event) => handleSubmit(event)}
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            className="inputForm"
            onChange={(e) => handleChange(e)}
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="inputForm"
            value={password}
            onChange={(e) => handleChange(e)}
          />

          <button type="submit" className="registerButton">
            Login User
          </button>
          <span className="textLogin">
            {" "}
            already have an account ?{" "}
            <Link to="/register">
              <span className="text-purple-400 hover:text-purple-500">
                Register
              </span>
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Registered;
