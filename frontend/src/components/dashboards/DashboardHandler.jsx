import React from "react";
import TeacherView from "./teacherdashboard/TeacherView";

/* To allow scalability, we can show different dashboards depending on the user type such as parent*/
const DashboardHandler = ({ logedinuser }) => {
  return (
    <section className="dashboard">
      <TeacherView user={logedinuser} />
    </section>
  );
};

export default DashboardHandler;
