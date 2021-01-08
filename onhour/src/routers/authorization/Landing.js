import "../../assets/css/landing.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

function Landing() {
  return (
    <div className="Landing">
      <div className="Landing__section">
        <Link to="/authorization/login">
          <button className="Landing__btn">시작하기</button>
        </Link>
      </div>
      <div className="Landing__container">
        <img src={logo} className="Landing-img" prop="#" />
        <p className="Landing-title">내가 만드는 한 시간 수업</p>
      </div>
    </div>
  );
}

export default Landing;
