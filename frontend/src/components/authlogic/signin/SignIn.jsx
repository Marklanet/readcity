import React, { useState } from "react";
import "./signin.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import GoogleIcon from "../../../assets/icons/google.svg";
import FacebookIcon from "../../../assets/icons/facebook.svg";

const SignIn = ({ chooseUser, handleSignUpClick }) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    if (!formik.errors.username && formik.values.username) {
      setClick((prevClick) => !prevClick);
    }
  };

  const authenticateUser = async (username, password) => {
    if (username === "admin" && password === "password") {
      return { success: true, message: "Authentication successful!" };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    iconColor: "var(--middle-color)",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authenticateUser(
          values.username,
          values.password
        );
        if (response.success) {
          chooseUser({ username: values.username });
          Toast.fire({
            icon: "success",
            title: `Login Success`,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: `Error: ${response.message}`,
          });
        }
      } catch (err) {
        console.error(err);
        Toast.fire({
          icon: "error",
          title: `An error occurred during login`,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="sign-in-form">
      <h2 className="dark-text-gradient">Sign in</h2>
      <p className="words">to continue to dashboard</p>
      <span className="social-sign">
        <img src={FacebookIcon} alt="Facebook Icon" className="icon" />
        <p>Continue with Facebook</p>
      </span>
      <span className="social-sign">
        <img src={GoogleIcon} alt="Google Icon" className="icon" />
        <p>Continue with Google</p>
      </span>
      <div className="divider-line">
        <span className="line"></span>
        <span className="or">or</span>
        <span className="line"></span>
      </div>
      {!click ? (
        <div>
          <div className="input-field">
            <p className="variable">User name</p>
            <input
              type="text"
              placeholder={
                formik.errors.username
                  ? formik.errors.username
                  : "Enter Username"
              }
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </div>

          <button className="dark-btn" onClick={handleClick}>
            Continue
          </button>
        </div>
      ) : (
        <div>
          <div className="input-field">
            <p className="variable">Password</p>
            <input
              type="password"
              placeholder={
                formik.errors.password ? formik.errors.password : "Password"
              }
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>

          <button type="submit" className="dark-btn">
            Sign In
          </button>
        </div>
      )}

      <p className="words">
        No Account? <span onClick={handleSignUpClick}>Sign up</span>
      </p>
    </form>
  );
};

export default SignIn;
