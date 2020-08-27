import React from "react";
import CamPlus from "../../Images/camPlus.png";
const Step = ({ step, data }) => {
  return (
    <div className="d-flex justify-content-center my-3 mb-4 px-2">
      <div className="px-1">
        <img src={CamPlus} alt="Cam Plus" height="30" width="30" />
      </div>
      <h5
        className="px-1"
        style={{ color: "#3b5cf6", width: "72px", fontSize: "22px" }}
      >
        {step}
      </h5>
      <h5
        className="px-1"
        style={{ color: "grey", fontSize: "22px", width: "auto" }}
      >
        {data}
      </h5>
    </div>
  );
};

export default Step;
