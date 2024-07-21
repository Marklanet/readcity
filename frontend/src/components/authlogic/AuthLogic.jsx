import React, { useState } from "react";
import "./authlogic.css";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import Welcome from "../reusable/welcome/Welcome";

const AuthLogic = ({ chooseUser }) => {
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div className="auth-logic ">
      <div className="welcome-wrapper">
        <Welcome />
      </div>
      <div className="form-switcher">
        {signUpMode ? (
          <SignUp handleSignInClick={handleSignInClick} />
        ) : (
          <SignIn
            chooseUser={chooseUser}
            handleSignUpClick={handleSignUpClick}
          />
        )}
      </div>
    </div>
  );
};

export default AuthLogic;
