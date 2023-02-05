import React, { useEffect, useState } from "react";
import Title from ".@/components/title";

const Info = () => {
  // place check to allow us to show the Records or the Info components
  const hasBearerToken = process.env.BEARER_TOKEN;

  return (
    <div className="App">
      <Title name="Metrics Dashboard" />
      <div className="PageIntro">
        <p>Welcome to your Metrics Dashboard.</p>
      </div>
      <div className="PageDetail">
        <p>Please provide the .env file and set the bearer token</p>
      </div>
    </div>
  );
};

export default Info;
