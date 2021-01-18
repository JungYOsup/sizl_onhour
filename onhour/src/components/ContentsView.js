import React from "react";

function ContentsModify({
  paragraphs,
  addLists,
  prevBtn,
  saveAndpostApi,
  TranslationApi,
  chageTextarea,
}) {
  return (
    <div>
      <div className="contentsmodify__header">
        <div className="header__left">
          <span>영어 가사/캡션</span>
          <p>
            영어 원문 또는 한국어 번역을 직접 수정하려면 입력창을 클릭하세요
          </p>
        </div>
        <div className="header__right">
          <span>한국어 뜻(자동으로 입력됩니다)</span>
        </div>
      </div>
      <div className="contentsmodify__main">
        <div className="main__left">
          {/* 적었다가 땟을때 작동을 하려면 onBlur를 사용 */}
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="left__list">
              <textarea
                className="left__textarea"
                onBlur={() =>
                  TranslationApi(
                    //   window.event
                    // Window 객체의 event 속성은 웹 사이트의 코드가 현재 처리 중인 Event를 반환합니다. (우리가 아는 event를 반환)
                    window.event,
                    paragraph.pk
                  )
                }
                value={paragraph.eng}
                onChange={() => chageTextarea(window.event, paragraph.pk, "en")}
              ></textarea>
            </div>
          ))}
        </div>
        <div className="main__right">
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="right__list">
              <textarea
                className="right__textarea"
                value={paragraph.kor}
                onChange={() => chageTextarea(window.event, paragraph.pk, "ko")}
              ></textarea>
            </div>
          ))}
        </div>
      </div>
      <div className="contentsmodify__add">
        {/* add버튼을 누르면 setState에 {pk : null , kor : "" , eng : ""} 인것을 10개 넣어준다. */}
        {/* 만약에 빈칸을 보내면 안되므로, 저장하기 전에 예외처리를 해줘야겠다.
        kor or eng가 비어있을경우 paragrapsh의 것들을 삭제시켜준다. */}

        <div className="add_btn">
          <button onClick={addLists}>플러스버튼</button>
        </div>
        <p>10칸 더 추가하기</p>
      </div>
      <div className="contentsmodify__footer">
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

export default ContentsModify;
