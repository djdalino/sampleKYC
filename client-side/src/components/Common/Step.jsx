import React from "react";
import CamPlus from "../../Images/camPlus.png";
const Step = ({ step, data }) => {
  return (
    <div className="d-flex justify-content-center my-2">
      <div className="px-1">
        <img src={CamPlus} alt="Cam Plus" height="35" width="35" />
      </div>
      <h3 className="px-1" style={{ color: "#3b5cf6" }}>
        {step}
      </h3>
      <h3 className="px-1" style={{ color: "grey" }}>
        {data}
      </h3>
    </div>
  );
};

export default Step;
