import React, { useState, useEffect } from "react";
import axios from "axios";
import SinkView from "../../../../components/SinkView";
function SinkMake({ history, contents, url, paragraphs }) {
  let inputObj = paragraphs.map(() => ({
    startValue: 0,
    endValue: 0,
  }));

  const [sinkes, setSinkes] = useState({
    url,
    paragraphs,
    //[{dub:"",end:"",eng:"",kr:"'",pk:"",start:""},..]
    times: inputObj,
    // [{startValue : 0 , endValue : 0 }, {startValue : 0 , endValue : 0},...]
  });

  const [youtube, setYoutube] = useState();

  const { times } = sinkes;

  console.log(paragraphs, "제일중요");

  //1. rendering 이후 getAPi를 가져와서 url 과 paragraphs를 채워 넣는다.

  const inputValue = (e, index) => {
    const target = Number(e.target.value);
    const name = e.target.name;

    if (name === "startValue") {
      // 이렇게 할경우에는 원본이 바뀌기 때문에, 새로고침할때 문제가 생기겠구나.
      //  1을 증가시킨상태에서 새로고침하면 , 0이 아닌 1인 상태로 나오고
      //  그 상태에서 다시 1 증가시키려고 하면 빈값이 랜더링 된다음에 다시 1로 바뀌므로 별로 좋지 않다.
      // 따라서 되도록이면 원래값을 변화시키는 것은 좋지 않아보인다.
      // 따라서 직접 times를 바꾸는게 아닌 받아오는 걸 통해서 바꿔주엇다.
      times[index].startValue = target;
    } else if (name === "endValue") {
      times[index].endValue = target;
    }

    setSinkes({ ...sinkes, times });
  };

  // 밀리세컨드를 -> 시 분 초 밀리로 나타넴
  // 3000 -> 000
  // 300 -> 0.300
  // 30 -> 0.0300
  const changeTOstring = (duration) => {
    let milliseconds = parseFloat((duration % 1000) / 100) * 0.1;
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    console.log(milliseconds);
    console.log(seconds);

    const sum = milliseconds + seconds;

    let sumTopoint = parseFloat(sum).toFixed(3); //1.0000

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    sumTopoint = sumTopoint < 10 ? "0" + sumTopoint : sumTopoint;

    return `${hours}:${minutes}:${sumTopoint}`;
  };

  //해결방법
  // 1.입력한초를 밀리세컨드로 바꿔준다.(입력한초가 음수일경우에는 절대값처리해줌)

  // 2. 밀리세컨드를 구하기 위해 밀리세컨드를 문자열로 바꿔준다.

  // 3. 데이터 값(문자열)을 가져온다.

  // 4.1 내가 입력한 값이 양수
  // ------- 입력한 값(문자열)과 가져온 데어터(문자열)를 new Date에 넣어줌으로써 전체 시간의 밀리세컨드 값을 가져온다. 그리고 그 값을 더한다음에 다시 문자열로 바꿔준다.
  // 4.2 내가 입력한 값이 음수
  // ------ 입력한 값(문자열)과 가져온 데어터(문자열)를 new Date에 넣어줌으로써 전체 시간의 밀리세컨드 값을 가져온다.
  //---------------여기서 그 둘이 차가 음수가 나올경우 데이터값보다 내가 입력한 값이 크다는 의미이므로 00:00:00.000이 나올수 있도록 처리해준다.
  //---------------여기서 그 둘의 차가 양수일 경우 데이터값보다 내가 입력한 값이 작다는 의미이므로 그 둘의 차를 문자열로 바꿔준다.

  // 5.조건에 따라 값을 업데이트 해준다.
  const inputBtn = (e, seconds, index) => {
    const name = e.target.name;

    // 1.초를 밀리세컨드로 바꾼다.
    let changeToMilliseconds = Math.abs(seconds) * 1000;

    // 2. 밀리세컨드로 바꾼 초를 문자열로 만들어준다.
    const s_Time = changeTOstring(changeToMilliseconds);

    // 3. 데이터에서 값을 가져온다.
    let dataTime = 0;
    if (name === "startBtn") {
      dataTime = paragraphs[index].start;
    } else if (name === "endBtn") {
      dataTime = paragraphs[index].end;
    }

    let time = "";
    if (seconds >= 0) {
      // 4.1 내가 입력한 값이 양수일 경우
      const setplusTime = new Date(`1970/01/01/UTC${s_Time}`);
      const setDatatime = new Date(`1970/01/01/UTC${dataTime}`);
      const plusTime = setplusTime.getTime() + setDatatime.getTime();
      time = changeTOstring(plusTime);
      console.log(time, "time");
    } else {
      // 4.2 내가 입력한 값이 음수일 경우
      const setminusTime = new Date(`1970/01/01/UTC${s_Time}`);
      const setDatatime = new Date(`1970/01/01/UTC${dataTime}`);
      const minusTime = setDatatime.getTime() - setminusTime.getTime();
      if (minusTime < 0) {
        const init = 0;
        time = changeTOstring(init);
      } else {
        time = changeTOstring(minusTime);
      }
    }

    // 조건
    if (name === "startBtn") {
      paragraphs[index].start = time;
    } else if (name === "endBtn") {
      paragraphs[index].end = time;
    }
    // 5.업데이트
    setSinkes({ ...sinkes, paragraphs });
  };

  // Yotubed의 onReady의 기능을 사용하기 위한 함수

  const setReady = (e) => {
    setYoutube(e.target);
  };

  // 시작 하기 (어디서부터 어디까지 까지 적용해야한다.)
  // 반복되는 루프를 돌아야할것  같은데..
  const playBtn = (index) => {
    const playStime = paragraphs[index].start; // String이니까
    // const playEtime = paragraphs[index].end;
    const changeplayStime = new Date(`1970/01/01/UTC${playStime}`);
    // const changeplayEtime = new Date(`1970/01/01/UTC${playEtime}`);
    const getstartSeconds = changeplayStime / 1000;
    // const getpauseSeconds = changeplayEtime / 1000;

    youtube.seekTo(getstartSeconds);
  };

  //  중단하기
  const pauseBtn = () => {
    youtube.pauseVideo();
  };

  // 잇고 끝기
  const sliceOfTime = (index) => {
    const videoTime = youtube.playerInfo.currentTime;

    const fixedTime = parseFloat(videoTime).toFixed(3);
    // getTime 초로 나오니까

    console.log(fixedTime);
    // 이것을 밀리세컨즈로 바꿔준다음에
    const getMil = parseInt(videoTime * 1000);

    // 이것을 가지고 chageToString에 넣어주는 리턴값을 넣어주면 된다.
    const stringTime = changeTOstring(getMil);

    console.log(stringTime, "StringTime");

    paragraphs[index].end = stringTime;
    paragraphs[index + 1].start = stringTime;

    setSinkes({ ...sinkes, paragraphs });
  };

  // 이전
  const prevBtn = () => {
    history.goBack(-2);
  };

  // 저장하고 다음으로

  const saveAndpostApi = async () => {
    await axios
      .post(
        "https://1hour.school/api/v1/contents/create/sync",
        {
          contents,
          sentences: paragraphs,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        const {
          data: { data },
        } = res;

        console.log(data.contents);
        console.log(data.paragraphs);

        history.push({
          pathname: "/admin/Edit/mediatool_manage",
          state: {
            contents: data.contents,
            paragraphs: data.paragraphs,
            page: 4,
          },
        });
      });
  };

  return (
    <div>
      <SinkView
        url={url}
        paragraphs={paragraphs}
        inputValue={inputValue}
        inputBtn={inputBtn}
        times={times}
        playBtn={playBtn}
        pauseBtn={pauseBtn}
        setReady={setReady}
        sliceOfTime={sliceOfTime}
        prevBtn={prevBtn}
        saveAndpostApi={saveAndpostApi}
      />
    </div>
  );
}

export default SinkMake;
