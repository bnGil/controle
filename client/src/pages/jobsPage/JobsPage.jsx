import React, { useState } from "react";
import Job from "../../components/job/Job";
import "./jobsPage.css";

function JobsPage() {
  return (
    <div className="jobspage-container">
      <div className="search">
        <input type="text" />
      </div>
      <div className="jobs-container">
        <Job />
        <Job />
      </div>
    </div>
  );
}

export default JobsPage;
