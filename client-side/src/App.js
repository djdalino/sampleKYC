import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import StepOne from "./components/Step/StepOne";
import StepTwo from "./components/Step/StepTwo";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero data="Secure you account in 3 simple step" />
      <StepTwo />
    </React.Fragment>
  );
}

export default App;
