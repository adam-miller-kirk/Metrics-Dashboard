import React, { useEffect, useState } from "react";
import { api } from ".@/api/api";
import { useStoreActions } from ".@/store";
import Title from ".@/components/title";
import Table from ".@/components/table";
import Loading from ".@/components/loading";
import Records from ".@/layout/records/Records";
import Info from ".@/layout/info/Info";

const Dashboard = () => {
  // place check to allow us to show the Records or the Info components
  const hasBearerToken = process.env.BEARER_TOKEN;

  return (
    <div className="App">
      <Title name="Metrics Dashboard" />
      <div className="PageIntro">
        <p>Welcome to your Metrics Dashboard.</p>
      </div>
      <div className="PageDetail">
        {hasBearerToken ? <Records /> : <Info />}
      </div>
    </div>
  );
};

export default Dashboard;
