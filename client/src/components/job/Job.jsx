import React, { useState } from "react";

import "./job.css";
import emptyheart from "../../assets/images/emptyheart.png";
import solidheart from "../../assets/images/solidheart.png";

const job = {
  title: "Front End Developer, Stoke Talent",
  department: "Technology",
  company: "Fiverr",
  createdAt: "2022-07-11T12:31:01.085+00:00",
  location: "Tel Aviv",
};

function Job() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="job-container">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUdv3P///8TvnAGvW2O3LSi4cFhz5l11KRazpUAvGoAumV91qgzxH/2/fq+6tTP8eCF1qqX3bmx58wownna9OhJyInj9u33/foxw33v+vXV8uRSy4+S3LVp0Zyn48TM7dq46dAAt11Scv6vAAACKElEQVR4nO3d2VLCMBSA4XoOSCMFLIsbLvD+L6nojVMlaVLG0+P8/31m+k2XhLZTqoqIiIiIiIiIiIiIiIiIiIiIiOiiiahqOJdab97ATrLm+radrpdnah0TP3bdZrbeXsV7CtbbWZrqrk3pTq2cCkN124fnVqgyXfTz+RSKTvryfApDfZcB9CeU8Jrj8yeUapUH9CbU5jET6EwozX0u0JdQ8vegL6E8FABdCfWpAOhJmDtNuBPKvgjoSZi1knEo1OcyoB/hpuQ66kmY9XPCp7B0F3oRyksp0IswLP+7UIuBToQyKxf6uJuo/RZsi+2b1zvCoc+dw/W++u3evgtgn+l+KUGsN7M82SWBkxvrjRxUejZsXVxOzqfzBNDH9TJSclFaOz4FP9M2DrzzfRJ+pNO48OD9IE0KJz7mvEgp4Qzh6EOIcHxJp5AShu6IjCyAm+tO9SEubOvuiP41BkRp4p7L9mxwhEvT+02SC2SxWkCIECFChAgRIkSIECFChAgRIkSIEOGlhH8ItHn2KDedjomn3C/H7ohvJd5UGcfT1SFPZqRG+HeO8yFEiNA+hAgR2ocQIUL7ECJEaB9ChAjtQ4gQoX0IESK0DyFChPYhRIjQPoQIEdqHECFC+xAiRGgfQoQI7UOIEKF9CBEitA8hQoT2pf44YD5AaPHdxJ/Jro7WxAY382i7cXwKfNAnSDXaOIBERERERERERERERERERERERERERF+9A0lXQi2P5w0/AAAAAElFTkSuQmCC"
        alt="company"
        className="company-img"
      />
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
    </div>
  );
}

export default Job;
