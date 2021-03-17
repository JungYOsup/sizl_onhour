import React from "react";
import HeaderNavs from "../../../../components/HeaderNavs";
import "../../../../assets/css/modifies/modifies.css";
import VideoMake from "./VideoMake";
import ContentsMake from "./ContentsMake";
import SinkMake from "./SinkMake";
import WordMake from "./WordMake";
import ProblemMake from "./ProblemMake";

function ContentsMakes({ location, history }) {
  let page = 0;
  if (location.state === undefined) {
    page = 1;
  } else {
    page = location.state.page;
  }

  return (
    <section id="modifies__container">
      <h3>콘텐츠 만들기 &#62; 영상 마법사</h3>
      <HeaderNavs name="make" />
      {page === 1 ? <VideoMake history={history} name="make" /> : null}

      {page === 2 ? (
        <ContentsMake
          history={history}
          name="make"
          contents={location.state.contents}
          paragraphs={location.state.paragraphs}
        />
      ) : null}
      {page === 3 ? (
        <SinkMake
          history={history}
          name="make"
          contents={location.state.contents}
          url={location.state.url}
          paragraphs={location.state.paragraphs}
        />
      ) : null}
      {page === 4 ? (
        <WordMake
          paragraphs={location.state.paragraphs}
          contents={location.state.contents}
          history={history}
          name="make"
        />
      ) : null}
      {page === 5 ? (
        <ProblemMake
          contents={location.state.contents}
          history={history}
          name="make"
        />
      ) : null}
    </section>
  );
}

export default ContentsMakes;
