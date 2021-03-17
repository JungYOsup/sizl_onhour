import React from "react";
import Problem from "../components/Problem";
import "../assets/css/modifies/problemmodify.css";
import uploadImage_btn from "../assets/img/uploadImage.png";
import checkBlue from "../assets/img/checkBlue.png";
import youtubeBlack from "../assets/img/youtubeBlack.png";
import questionImg from "../assets/img/questionImg.png";
function ProblemView({
  questions,
  inputValue,
  inputAnswer,
  checkBtn,
  uploadBtn,
  questionfile,
  questionBtn,
  updateQuestion,
  commentaryfile,
  commantaryBtn,
  updateCommantary,
  addPreview,
  subquestions,
  addProblem,
  clickChangeView,
  num,
  deleteProblem,
  prevBtn,
  saveAndpostApi,
}) {
  return (
    <div>
      <Problem
        questions={questions}
        num={num}
        inputValue={inputValue}
        inputAnswer={inputAnswer}
        checkBtn={checkBtn}
        uploadBtn={uploadBtn}
        questionfile={questionfile}
        questionBtn={questionBtn}
        updateQuestion={updateQuestion}
        commentaryfile={commentaryfile}
        commantaryBtn={commantaryBtn}
        updateCommantary={updateCommantary}
        deleteProblem={deleteProblem}
      />
      <div className="problem__introduce">
        <div className="introduce__box">
          <span className="box__ref">작성 시 참고해주세요</span>
          <div className="box__intro">
            <img src={uploadImage_btn} className="intro__img"></img>
            <span className="intro__inform">
              텍스트를 입력하지 않은 경우,내 컴퓨터에서 이미지를 불러오는 것으로
              입력을 대신할 수 있습니다
            </span>
          </div>
          <div className="box__intro">
            <img src={checkBlue} className="intro__img"></img>
            <span className="intro__inform">
              답변을 작성한 뒤 체크하면 정답을 지정할 수 잇습니다. 복수의 답변을
              정답으로 지정할 수 잇습니다.
            </span>
          </div>
          <div className="box__intro">
            <img className="intro__img" src={youtubeBlack}></img>
            <span className="intro__inform">
              해설 테스트의 경우 유투브 영상 링크를 붙여넣기 할 수도 있습니다.
            </span>
          </div>
        </div>
      </div>
      <div className="problem__btn">
        <div className="btn__box">
          <button className="add__preview" onClick={addPreview}>
            문제열에 추가하기
          </button>
          <button className="add__problem" onClick={addProblem}>
            새로운 문제 추가하기
          </button>
        </div>
      </div>
      <div className="problem__preview">
        <div className="preview__header">
          <span>미리보기</span>
        </div>
        <div className="preview__main">
          {subquestions.map((e, index = index + 1) => (
            <div className="main__list">
              <span>#{index + 1}</span>
              <div>
                <img
                  src={questionImg}
                  onClick={() => clickChangeView(index)}
                ></img>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="problem__footer">
        <button className="footer__prevBtn">
          <p onClick={prevBtn}>이전</p>
        </button>
        <button className="footer__nextBtn">
          <p onClick={saveAndpostApi}>저장하고 끝내기</p>
        </button>
      </div>
    </div>
  );
}

export default ProblemView;
