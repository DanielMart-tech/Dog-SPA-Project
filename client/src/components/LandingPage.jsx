import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing_page">
      <Link to="/home">
        <button type="button" className="landing_page_btn">
          woof!
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;
