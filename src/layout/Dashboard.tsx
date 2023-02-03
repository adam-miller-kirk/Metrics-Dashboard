import React from "react";

import Title from ".@/components/title/Title";
import FirstPage from ".@/layout/FirstPage";

const Dashboard = () => {
  return (
    <div className="App">
      <Title name="Metrics Dashboard" />
      <FirstPage />
    </div>
  );
};

export default Dashboard;
