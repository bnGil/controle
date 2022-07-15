import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./jobDetailsPage.css";

function JobDetailsPage() {
  const location = useLocation();
  const { job } = location.state;
  const { jobDescription } = job;

  const printDescription = () =>
    jobDescription.description.map((str, i) => <p key={i}>{str}</p>);

  const printResponsibilities = () =>
    jobDescription.responsibilities.map((str, i) => (
      <li className="job-details-li" key={i}>
        {str}
      </li>
    ));
  const printRequirements = () =>
    jobDescription.requirements.map((str, i) => (
      <li className="job-details-li" key={i}>
        {str}
      </li>
    ));

  return (
    <div className="job-details-container">
      <div className="description">
        <h2 className="job-details-header">Description</h2>
        {printDescription()}
      </div>
      <div className="responsibilities">
        <h2 className="job-details-header">Responsibilities</h2>
        <ul>{printResponsibilities()}</ul>
      </div>
      <div className="requirements">
        <h2 className="job-details-header">Requirements</h2>
        <ul>{printRequirements()}</ul>
      </div>
    </div>
  );
}

export default JobDetailsPage;
