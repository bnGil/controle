import React from "react";
import Lottie from "lottie-react";
import "./jobsSpinner.css";

import josSpinner from "../../assets/animations/looking-for-jobs.json";

function JobsSpinner({ isShown }) {
  return (
    <>
      {isShown && (
        <Lottie
          className="lottie-jobs-spinner"
          animationData={josSpinner}
          loop
        ></Lottie>
      )}
    </>
  );
}

export default JobsSpinner;
