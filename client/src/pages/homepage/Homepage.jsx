import "./homepage.css";
import image from "../../assets/images/moneywings.png";

function Homepage() {
  return (
    <div className="homepage">
      <h1>Welcome to the bank of the year</h1>
      <p>We offer bank API service</p>
      <img src={image} alt="money" />
    </div>
  );
}

export default Homepage;
