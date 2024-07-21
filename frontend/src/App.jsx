import React, { useState } from "react";
import "./App.css";
import AuthLogic from "./components/authlogic/AuthLogic";
import DashboardHandler from "./components/dashboards/DashboardHandler";
import Topbar from "./components/common/topbar/Topbar";

const App = () => {
  const [user, setUser] = useState(null);
  const chooseUser = (user) => {
    setUser(user);
  };
  return (
    <section className="app">
      {!user && <Topbar />}

      {!user ? (
        <AuthLogic chooseUser={chooseUser} />
      ) : (
        <DashboardHandler logedinuser={user} />
      )}
    </section>
  );
};

export default App;
