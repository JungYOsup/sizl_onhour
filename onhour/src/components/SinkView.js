import React, { useEffect, useState } from "react";
import Sink from "./Sink";
import YouTube from "react-youtube";

// 1. 첫번째 문제 , onchange가 다 변한다. 구분짓는 key가 필요할듯

// 2. paragraphs.start 와 paragraphs.end로 쏴주는데
// 수정되어서 전달되는 값은 start와 end로 전달된다는것 ?
// 해결방법 : 배열로쏴준다.
// 다른방법은 없을까..?

// 3. 배열안의 객체의 값을 가져오는 방법

function SinkView({
  url,
  paragraphs,
  inputValue,
  inputBtn,
  times,
  playBtn,
  setReady,
  pauseBtn,
  sliceOfTime,
  prevBtn,
  saveAndpostApi,
}) {
  let getTumbnail = "";

  if (url.includes("&")) {
    getTumbnail = url.substring(32, url.indexOf("&"));
  } else {
    getTumbnail = url.substring(32, url.length);
  }

  const opts = {
    height: "250",
    width: "450",
  };

  return (
    <div className="sinkmodify">
      <div className="sinkmodify__main">
        <div className="sinkmodify__left">
          <YouTube videoId={getTumbnail} opts={opts} onReady={setReady} />

          <p className="left__inform">
            문장이 시작되고 끝나는 시점을 1초, 0.3초 단위로 조절할 수 있습니다.
            <br />
            첫번째 문장이 끝나는 지점에서 바로 다음 문장을 시작하려면 잇고 끊기
            버튼을 눌러주세요.
            <br />
            영어 문장 싱크를 맞추면 한국어 뜻 싱크도 자동으로 맞춰지므로 별도의
            작업이 필요하지 않습니다.
          </p>
        </div>
        <div className="sinkmodify__right">
          {/* 이런표현식 알아두자 index=index+1 */}
          {paragraphs.map((paragraph, index = index + 1) => (
            <Sink
              key={index}
              paragraph={paragraph}
              inputValue={inputValue}
              startValue={times[index].startValue}
              endValue={times[index].endValue}
              index={index}
              times={times}
              inputBtn={inputBtn}
              playBtn={playBtn}
              pauseBtn={pauseBtn}
              sliceOfTime={sliceOfTime}
            />
          ))}
        </div>
      </div>
      <div className="sinkmodify__footer">
        <button onClick={prevBtn} className="prevBtn">
          이전
        </button>
        <button onClick={saveAndpostApi} className="nextBtn">
          저장하고 다음으로
        </button>
      </div>
    </div>
  );
}

export default SinkView;
