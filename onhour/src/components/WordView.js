import React from "react";
import delete_btn from "../assets/img/delete.png";

function WordView({
  paragraphs,
  TranslationApi,
  chageTextarea,
  addLists,
  saveAndpostApi,
  prevBtn,
  deleteBtn,
}) {
  console.log(paragraphs);
  return (
    <div>
      <div className="wordmodify__header">
        <div className="header__setting">
          <span>엑셀설정</span>
          <span>{/* setting창  */}</span>
        </div>
        <div className="header__title">
          <span>단어</span>
          <span>한국어 뜻</span>
        </div>
      </div>
      <div className="wordmodify__main">
        <div className="main__left">
          {paragraphs.map((paragraph, index = index + 1) => (
            <div key={index} className="left__list">
              <textarea
                className="left__textarea"
                onBlur={() => TranslationApi(window.event, index)}
                value={paragraph.eng}
                onChange={() => chageTextarea(window.event, index, "en")}
              ></textarea>
            </div>
          ))}
        </div>
        <div className="main__right">
          {paragraphs.map((paragraph, index = index + 1) => (
            <div className="right__box">
              <div key={index} className="right__list">
                <textarea
                  className="right__textarea"
                  value={paragraph.kor}
                  onChange={() => chageTextarea(window.event, index, "ko")}
                ></textarea>
              </div>
              <div className="right__delete">
                <img src={delete_btn} onClick={() => deleteBtn(index)}></img>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="wordmodify__add">
        {/* add버튼을 누르면 setState에 {pk : null , kor : "" , eng : ""} 인것을 10개 넣어준다. */}
        {/* 만약에 빈칸을 보내면 안되므로, 저장하기 전에 예외처리를 해줘야겠다.
        kor or eng가 비어있을경우 paragrapsh의 것들을 삭제시켜준다. */}

        <div className="add_btn">
          <button onClick={addLists}>플러스버튼</button>
        </div>
        <p>10칸 더 추가하기</p>
      </div>
      <div className="wordmodify__footer">
        {/* 이전 , 저장하고 다음으로 */}
        <button onClick={prevBtn} className="footer__prevBtn">
          이전으로
        </button>
        <button className="footer_saveBtn" onClick={saveAndpostApi}>
          저장하고 다음으로
        </button>
      </div>
    </div>
  );
}

export default WordView;
