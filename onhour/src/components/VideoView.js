import React from "react";

function VideoView({
  url,
  showDropDown,
  handleCategory,
  youtubeTitle,
  title,
  saveAndpostApi,
  categoryNames,
}) {
  return (
    <div>
      <div className="container__header">
        <div className="header__left">
          <div className="left__title">
            <span>영상주소</span>
            <span>(수정할수없습니다)</span>
          </div>
          <input value={url} readOnly className="left__input" />
        </div>
        <div className="header__right">
          <span className="right__title">카테고리</span>
          <div class="dropdown">
            <button onClick={showDropDown} class="dropbtn">
              <p>{categoryNames.toString()}</p>
            </button>
            <div id="myDropdown" class="dropdown-content">
              {/* 선택할때마다 이미지가 보이고 안보이는걸 css로 나타내자. */}
              <div className="content__list">
                <img></img>
                <p
                  onClick={handleCategory}
                  data-value="영화 속 OST"
                  data-pk="1"
                >
                  영화속 OST
                </p>
              </div>
              <div className="content__list">
                <img></img>
                <p
                  onClick={handleCategory}
                  data-value="공부할 때 듣기 좋은 팝송"
                  data-pk="2"
                >
                  공부할 때 듣기 좋은 팝송
                </p>
              </div>
              <div className="content__list">
                <img></img>
                <p onClick={handleCategory} data-value="TED 강의" data-pk="3">
                  TED 강의
                </p>
              </div>
              <div className="content__list">
                <img></img>
                <p
                  onClick={handleCategory}
                  data-value="세서미 스트리트"
                  data-pk="4"
                >
                  세서미 스트리트
                </p>
              </div>
              <div className="content__list">
                <img></img>
                <p onClick={handleCategory} data-value="Sing Along" data-pk="5">
                  Sing Along
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container__main">
        <p className="main__title">{youtubeTitle}</p>
        <iframe
          src={url.replace("watch?v=", "embed/")}
          className="main__vedio"
        ></iframe>
      </div>
      <div className="container__footer">
        <span className="footer__title">수업제목</span>
        <input value={title} readOnly className="footer__input" />
        <p>
          영어 문장을 입력하면 자동으로 문장단위로 끝어서 표시되고, 번역기
          추가됩니다. 입력칸을 클릭하여 직접 수정할 수도 있습니다.
        </p>
        <div className="footer__saveBtn">
          <button onClick={saveAndpostApi}>저장하고 다음으로</button>
        </div>
      </div>
    </div>
  );
}

export default VideoView;
