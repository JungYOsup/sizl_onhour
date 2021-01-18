import React from "react";

function Content({ category, title, youtubeTitle, problems, registered, url }) {
  let getTumbnail = "";

  if (url.includes("&")) {
    getTumbnail = url.substring(32, url.indexOf("&"));
  } else {
    getTumbnail = url.substring(32, url.length);
  }

  const getImageUrl = `http://img.youtube.com/vi/${getTumbnail}/0.jpg`;

  return (
    <div className="content__informs">
      <img className="content__img" src={getImageUrl} alt="유투브이미지" />
      <div className="content__inform">
        <h5>{category}</h5>
        <h4>{title}</h4>
        <p className="inform__youtubetitle">{youtubeTitle}</p>
        <div>
          {problems !== "" ? <span>{problems}</span> : <span>&nbsp;</span>}
        </div>
        <span>{registered}</span>
      </div>
    </div>
  );
}

export default Content;
