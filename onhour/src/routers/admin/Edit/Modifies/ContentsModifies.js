import React from "react";
import HeaderNavs from "../../../../components/HeaderNavs";
import ContentsModify from "./ContentsModify";
import VideoModify from "./VideoModify";
import "../../../../assets/css/modifies/modifies.css";
import SinkModify from "./SinkModify";
import WordModify from "./WordModify";
import ProblemModify from "./ProblemModify";

function ContentsModifies({ location, history }) {
  const page = location.state.page;
  return (
    <section id="modifies__container">
      <h3>콘텐츠 관리 &#62; 수정 &#62; 영상 정보 수정</h3>
      <HeaderNavs name="modify" />
      {page === 1 ? (
        <VideoModify contents={location.state.pk} history={history} />
      ) : null}
      {page === 2 ? (
        <ContentsModify contents={location.state.contents} history={history} />
      ) : null}
      {page === 3 ? (
        <SinkModify contents={location.state.contents} history={history} />
      ) : null}
      {page === 4 ? (
        <WordModify contents={location.state.contents} history={history} />
      ) : null}
      {page === 5 ? (
        <ProblemModify contents={location.state.contents} history={history} />
      ) : null}
    </section>
  );
}

export default ContentsModifies;
