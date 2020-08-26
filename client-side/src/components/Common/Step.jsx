import React from "react";
import CamPlus from "../../Images/camPlus.png";
const Step = ({ step, data }) => {
  return (
    <div className="d-flex justify-content-center my-3">
      <div className="px-1">
        <img src={CamPlus} alt="Cam Plus" height="25" width="25" />
      </div>
      <h5 className="px-1" style={{ color: "#3b5cf6" }}>
        {step}
      </h5>
      <h5 className="px-1" style={{ color: "grey" }}>
        {data}
      </h5>
    </div>
  );
};

export default Step;
