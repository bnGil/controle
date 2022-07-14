import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./job.css";
import emptyheart from "../../assets/images/emptyheart.png";
import solidheart from "../../assets/images/solidheart.png";
import { useUser } from "../../context/userContext";
import Button from "../../components/button/Button";
import PopUp from "../../components/popUp/PopUp";
import controleAPI from "../../api/controleAPI";

function Job({ job }) {
  const { user, token } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [isNoUserAndLiked, setIsNoUserAndLiked] = useState(false);

  const handleLike = async () => {
    if (!user) {
      setIsNoUserAndLiked(true);
    } else {
      setIsLiked(!isLiked);
      await controleAPI.put(
        "/jobs/like",
        { jobObjectId: job._id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    // else, set isLike to true and send PUT like request
  };
  console.log(isNoUserAndLiked);

  return (
    <>
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
          onClick={handleLike}
        />
      </li>
      {isNoUserAndLiked && (
        <PopUp text={"Need to sign in"}>
          <NavLink className="navlink" exact to="/login">
            <Button text={"Login"}></Button>
          </NavLink>
          <NavLink className="navlink" exact to="/register">
            <Button text={"Register"}></Button>
          </NavLink>
          <Button text={"Cancel"} onClick={() => setIsNoUserAndLiked(false)} />
        </PopUp>
      )}
    </>
  );
}

export default Job;
