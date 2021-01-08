import React from "react";
import "../../../assets/css/contentsList.css";
import Content from "./Content";
// 전달받은 props 가 rows 인데 배열 타입이 아닌 상태로 전달된다.
// rows의 값은 배열인데

// video는 지원하지 않음 따라서 iframe을 사용해야하나 iframe에 youtube url을 그대로 사용할 경우 다음과 같은 오류가 발생 Refused to display '<URL>' in a frame because it set 'X-Frame-Options' to 'sameorigin'. 이 문제를 해결하기 위해 watch?v= 를 embed/로 바꿈

// 근데 지금 보니까 비디오를 가져 오는게 아니라 img를 가져오는거네, 혹시 url을 통해 이미지를 따로 출력 할수 있나?

// url의 특정부분을 때서 img.youtube.com/vi/{url의 특정부분}/0.jpg 으로 만들수 잇네

// url에 &가 포함되어있으면 32번째부터 $기 전까지 가져오고
// url에 &가 포함되어있지 않으면 32번쨰부터 url의 길이까지 가져온다.
// substr 과 substring의 차이를 이해하자
// let getTumbnail = "";

// if (url.includes("&")) {
// getTumbnail = url.substring(32, url.indexOf("&"));
// } else {
// getTumbnail = url.substring(32, url.length);
// }

// const getImageUrl = `http://img.youtube.com/vi/${getTumbnail}/0.jpg`;

//TypeError: Cannot read property 'map' of undefined 이 발생하는 이유

function ContentsList({ rows }) {
  return (
    <div className="ContentsList">
      {rows.map((row) => (
        <Content
          title={row.title}
          yotubeTitle={row.yotubeTitle}
          category={row.category}
          hidden={row.hidden}
          url={row.url}
          problems={row.problem}
          registered={row.registered}
        />
      ))}
    </div>
  );
}

export default ContentsList;
