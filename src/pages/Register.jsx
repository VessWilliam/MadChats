import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import Brands from "../components/Brands";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const { username, email, password, confirmPassword } = values;

  const handleSubmit = async (event) => {
    await event.preventDefault();
    try {
      if (await handleValidation()) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigate("/setavatar");

        setDoc(doc(db, "Users", result.user.uid), {
          uid: result.user.uid,
          username,
          email,
          time: Timestamp.fromDate(new Date()),
          isOnline: true,
        });

        await updateProfile(auth.currentUser, {
          displayName: username,
        });

        await setDoc(doc(db, "userChat", result.user.uid), {});

        setValues({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleValidation = async () => {
    if (password !== confirmPassword) {
      await toast.error(
        "password must be same as confirm password",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      await toast.error("username greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      await toast.error(
        "password must be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    } else if (email === "") {
      await toast.error("Email is required", toastOptions);
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
            placeholder="Username"
            value={username}
            name="username"
            className="inputForm"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            className="inputForm"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            className="inputForm"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confrim Pasword"
            value={confirmPassword}
            name="confirmPassword"
            className="inputForm"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit" className="registerButton">
            Create User
          </button>
          <span className="textLogin">
            {" "}
            already have an account ?{" "}
            <Link to="/login">
              <span className="text-purple-400 hover:text-purple-500">
                Login
              </span>
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Register;
