import React from "react";
import arrow_left from "../assets/img/Icon ionic-ios-fastforward-2.png";
import arrow_right from "../assets/img/Icon ionic-ios-fastforward.png";
import pause_btn from "../assets/img/Icon feather-stop-circle.png";
import play_btn from "../assets/img/Icon feather-play-circle.png";

function Sink({
  paragraph,
  inputValue,
  inputBtn,
  startValue,
  endValue,
  index,
  playBtn,
  pauseBtn,
  sliceOfTime,
}) {
  return (
    <div className="right__sink">
      <div className="sink__text">
        <div>
          <span>{paragraph.eng}</span>
        </div>
      </div>
      <div className="sink__time">
        <input value={paragraph.start}></input>
        <input value={paragraph.end}></input>
      </div>
      <div className="sink__inputtime">
        {/* input은 onchange에 의해서 값이 바뀐다. */}
        <input
          name="startValue"
          type="number"
          value={startValue}
          onChange={() => inputValue(window.event, index)}
        ></input>
        <input
          name="endValue"
          type="number"
          value={endValue}
          onChange={() => inputValue(window.event, index)}
        ></input>
      </div>
      <div className="sink__inputtime-btns">
        <button
          name="startBtn"
          onClick={() => inputBtn(window.event, startValue, index)}
        >
          추가
        </button>
        <button
          name="endBtn"
          onClick={() => inputBtn(window.event, endValue, index)}
        >
          추가
        </button>
      </div>
      <div className="sink_clicktime-btns">
        <div className="btns__left">
          <div className="left__btns-one">
            <img
              src={arrow_left}
              name="startBtn"
              onClick={() => inputBtn(window.event, -1, index)}
            />
            <span>1.0</span>
            <img
              src={arrow_right}
              name="startBtn"
              onClick={() => inputBtn(window.event, 1, index)}
            />
          </div>
          <div className="left__btns-zerothree">
            <img
              src={arrow_left}
              name="startBtn"
              onClick={() => inputBtn(window.event, -0.3, index)}
            />
            <span>0.3</span>
            <img
              src={arrow_right}
              name="startBtn"
              onClick={() => inputBtn(window.event, 0.3, index)}
            />
          </div>
        </div>
        <div className="mid__btns">
          <div className="play__btn">
            <img src={play_btn} onClick={() => playBtn(index)} />
          </div>
          <div>
            <span className="conAndbr_btn">
              <button onClick={() => sliceOfTime(index)}>잇고끊기</button>
            </span>
          </div>
          <div className="end__btn">
            <img src={pause_btn} onClick={pauseBtn} />
          </div>
        </div>
        <div className="btns__right">
          <div className="right__btns-one">
            <img
              src={arrow_left}
              name="endBtn"
              onClick={() => inputBtn(window.event, -1, index)}
            />
            <span>1.0</span>
            <img
              src={arrow_right}
              name="endBtn"
              onClick={() => inputBtn(window.event, 1, index)}
            />
          </div>
          <div className="right__btns-zerothree">
            <img
              src={arrow_left}
              name="endBtn"
              onClick={() => inputBtn(window.event, -0.3, index)}
            />
            <span>0.3</span>
            <img
              src={arrow_right}
              name="endBtn"
              onClick={() => inputBtn(window.event, 0.3, index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sink;
