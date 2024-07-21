import React, { useState } from "react";
import "./signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import GoogleIcon from "../../../assets/icons/google.svg";
import FacebookIcon from "../../../assets/icons/facebook.svg";

const SignUp = ({ handleSignInClick }) => {
  const [step, setStep] = useState(0);

  const handleClick = () => {
    if (step === 0 && !formik.errors.username && formik.values.username) {
      setStep(1);
    } else if (
      step === 1 &&
      !formik.errors.password &&
      formik.values.password
    ) {
      setStep(2);
    }
  };

  const registerUser = async (username, password) => {
    // Replace with your registration logic
    if (username && password) {
      return { success: true, message: "Registration successful!" };
    }
    return { success: false, message: "Registration failed" };
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
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
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerUser(values.username, values.password);
        if (response.success) {
          Toast.fire({
            icon: "success",
            title: `Registration Success`,
          });
          handleSignInClick();
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
          title: `An error occurred during registration`,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="sign-in-form">
      <h2 className="dark-text-gradient">Sign up</h2>
      <p className="words">to create a new account</p>
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
      {step === 0 ? (
        <div>
          <div className="input-field">
            <p className="variable">User name</p>
            <input
              type="text"
              placeholder={
                formik.errors.username ? formik.errors.username : "Username"
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
      ) : step === 1 ? (
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

          <button className="dark-btn" onClick={handleClick}>
            Continue
          </button>
        </div>
      ) : (
        <div>
          <div className="input-field">
            <p className="variable">Confirm Password</p>
            <input
              type="password"
              placeholder={
                formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : "Confirm Password"
              }
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
          </div>

          <button type="submit" className="dark-btn">
            Sign Up
          </button>
        </div>
      )}

      <p className="words">
        Have an account? <span onClick={handleSignInClick}>Sign in</span>
      </p>
    </form>
  );
};

export default SignUp;
