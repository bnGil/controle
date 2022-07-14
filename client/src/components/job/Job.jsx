import React, { useState } from "react";

import "./job.css";
import emptyheart from "../../assets/images/emptyheart.png";
import solidheart from "../../assets/images/solidheart.png";

function Job({ job }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <li className="job-item">
      <img src={job.companyImg} alt="company" className="company-img" />
      <div className="job-content">
        <h4 className="company-name">{job.company}</h4>
        <h3 className="job-title">{job.title}</h3>
        <h5 className="job-location">{job.location}</h5>
      </div>
      <img
        className="heartIcon"
        src={isLiked ? solidheart : emptyheart}
        alt="heart"
        onClick={() => setIsLiked(!isLiked)}
      />
    </li>
  );
}

export default Job;
