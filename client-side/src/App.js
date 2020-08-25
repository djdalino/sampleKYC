import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Step from "./components/Common/Step";
import StepOne from "./components/Step/StepOne";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero data="Secure you account in 3 simple step" />
      <Step step="Step 1" data="take a selfie" />
      <StepOne />
    </React.Fragment>
  );
}

export default App;
