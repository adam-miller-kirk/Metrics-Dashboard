import React from "react";
import "./Title.pcss";

const Title = ({ name }) => {
  return (
    <div className="Title">
      <h2>{name}</h2>
    </div>
  );
};

export default Title;
