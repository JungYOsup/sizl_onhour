function Register() {
  return (
    <div className="Register">
      <div className="Register__container">
        <h2>가입하기 - 프로필 정보</h2>
        <div>
          <h3>이름*</h3>
          <input type="text"></input>
        </div>
        <div>
          <h3>회원구분*</h3>
          <input placeholder="선생님입니다."></input>
          <input placeholder="학생입니다"></input>
        </div>
        <div>
          <h3>학교 또는 학원 이름 입력하기*</h3>
          <input type="text"></input>
        </div>
      </div>
    </div>
  );
}

export default Register;
