import { Link } from "react-router-dom";
import "../assets/css/navigation.css";
function Navigation({ location }) {
  return (
    <section className="nav__box">
      <div className="nav__left">
        <img src="https://onehour.co.kr/images/headerLogo.png" />
        <span>|세명컴퓨터고등학교</span>
      </div>
      <div className="nav__center">
        <ul className="center__lists">
          <li>
            <Link to="/admin">수업보기</Link>
          </li>

          <li>
            <Link to="/course_make">수업제작</Link>
          </li>

          <li>
            <Link to="/course_manage">수업관리</Link>
          </li>

          <li>
            <Link to="/management">학생관리</Link>
          </li>
        </ul>
      </div>
      <div className="nav__right">
        <Link to="admin/Edit/content_manage">
          <span>관리자모드</span>
        </Link>
      </div>
    </section>
  );
}
export default Navigation;
