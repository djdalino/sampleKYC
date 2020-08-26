import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import StepOne from "../Step/StepOne";
import StepTwo from "../Step/StepTwo";
const SwitchPage = () => {
  const { count } = useContext(HeaderContext);
  switch (count) {
    case 0:
      return <StepOne />;
    case 1:
      return <StepTwo />;
    default:
      return <StepOne />;
  }
};

export default SwitchPage;
