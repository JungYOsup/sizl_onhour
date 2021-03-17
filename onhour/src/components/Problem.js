import React from "react";
import delete_btn from "../assets/img/delete.png";
import uploadImage_btn from "../assets/img/uploadImage.png";
import checkGray from "../assets/img/checkGray.png";
import checkBlue from "../assets/img/checkBlue.png";

function Problem({
  questions,
  inputValue,
  inputAnswer,
  checkBtn,
  questionfile,
  questionBtn,
  updateQuestion,
  commentaryfile,
  commantaryBtn,
  updateCommantary,
  num,
  deleteProblem,
}) {
  console.log(num);
  return (
    <div className="problem__inputlists">
      <div className="list__matter">
        <span className="matter__num">#{num + 1}</span>
        <textarea
          className="matter__textarea"
          value={questions[num].title}
          placeholder="문제를 입력해주세요"
          onChange={(e) => inputValue(e, num)}
          name="matter"
        ></textarea>
        <img
          src={delete_btn}
          className="matter_delete-btn"
          onClick={() => deleteProblem(num)}
        ></img>
      </div>
      <div className="list__sentence">
        <div>
          {/* 이미지가 잇을경우에는 Text가 아닌 이미지로 들어감 */}
          {questions[num].questionImg !== null ? (
            <img
              src={questions[num].questionImg}
              style={{ width: "300px", height: "300px" }}
            ></img>
          ) : (
            <textarea
              className="sentence__textarea"
              placeholder="지문을 입력하거나 이미지를 올려주세요"
              name="text_sentence"
              value={questions[num].questionText}
              onChange={(e) => inputValue(e, num)}
            ></textarea>
          )}
          <div className="sentence__upload">
            <img
              src={uploadImage_btn}
              className="sentence__upload-img"
              onClick={questionBtn}
            ></img>
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            className="upload-btn"
            ref={questionfile}
            onChange={(e) => updateQuestion(e, num)}
            accept="image/*"
          ></input>
        </div>
      </div>
      <div className="list__answer">
        {questions[num].answers.map((a, index = index + 1) => (
          <div className="answer__list">
            <div className="list__num">
              <span>{index + 1}</span>
            </div>
            {questions[num].answers[index].correct === false ? (
              <img
                className="list__check"
                src={checkGray}
                onClick={(e) => checkBtn(e, num, index)}
              ></img>
            ) : (
              <img
                className="list__check"
                src={checkBlue}
                onClick={(e) => checkBtn(e, num, index)}
              ></img>
            )}

            <div className="list__box">
              <textarea
                className="list__textarea"
                placeholder="답변을 작성해주세요"
                value={questions[num].answers[index].answer}
                onChange={(e) => inputAnswer(e, num, index)}
              ></textarea>
            </div>
            <img className="list__delete-btn" src={delete_btn}></img>
          </div>
        ))}
      </div>
      <div className="list__commentary">
        <div className="commentary__box">
          {questions[num].commentaryImg !== null ? (
            <img
              src={questions[num].commentaryImg}
              style={{ width: "300px", height: "300px" }}
            ></img>
          ) : (
            <textarea
              name="commentary"
              className="commentary__textarea"
              placeholder="해설을 입력해주세요 (생략 가능)"
              onChange={(e) => inputValue(e, num)}
              value={questions[num].commentaryText}
            ></textarea>
          )}
          <div className="commentary__upload">
            <img
              className="commentary__upload-img"
              src={uploadImage_btn}
              onClick={commantaryBtn}
            ></img>
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            className="upload-btn"
            ref={commentaryfile}
            onChange={(e) => updateCommantary(e, num)}
            accept="image/*"
          ></input>
        </div>
      </div>
    </div>
  );
}
export default Problem;
