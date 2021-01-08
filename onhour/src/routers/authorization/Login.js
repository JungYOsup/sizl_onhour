import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import "../../assets/css/login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login({ history }) {
  const [inputs, setInput] = useState({ email: "", password: "" });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;

    setInput({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // res.data.data.token;
    axios
      .post("https://1hour.school/user/login", { email, password })
      .then((res) => {
        console.log(res);
        const {
          data: {
            data: { token },
          },
        } = res;
        // token을 못받았을때 예외처리
        // token을 받고 받은 token을 sessionStorage에 넣어준다.
        sessionStorage.setItem("adminToken", token);
        history.push("/admin");
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });

    // 받아온 token값을 session에 저장한다. (내가 관리자로 로그인을 했다는 증거)
    // history를 이용해서 이동
    // **예외처리**
    // 조건 1. 아이디나 비밀번호를 입력하세요
    // 조건 2. 존재하지 않는 아이디입니다.
    // 조건 3. 비밀번호가 틀립니다.
  };

  return (
    <div className="Login">
      <div>
        <img src={logo} className="Login-img" prop="#" />
      </div>
      <div className="Login__container">
        <span>시작하기</span>
        <p className="container__content">
          환영합니다! 계정이 없다면 회원가입후 이용해주세요
        </p>
        <form onSubmit={handleSubmit}>
          <div className="container__box">
            <label for="box__id">이메일주소</label>
            <input
              name="email"
              type="text"
              id="box__id"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="container__box">
            <label for="box__pw">비밀번호</label>
            <input
              name="password"
              type="password"
              id="box__pw"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="Login__section">
            <button type="submit" className="Login__btn">
              로그인
            </button>
          </div>
        </form>
        <div className="container__register">
          <Link to="/authorization/register">
            <span>가입하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
