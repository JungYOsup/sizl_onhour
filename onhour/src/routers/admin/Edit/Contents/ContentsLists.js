import axios from "axios";
import ContentsList from "./ContentsList";
import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/Pagination";
import HeaderNavs from "../../../../components/HeaderNavs";
import "../../../../assets/css/contents/contentslists.css";

// // 1. 2020-01-07
// // lifeCycle : mount : constructor render componentDidmount(1회성)
// // update : render , componentDidUpdate
// // useEffect : componentDidmount 와 componentDidUpdate역할을 둘다 하는구나
// // render가 발생할 때 마다(componentDidMount: 초기, componentDUpdate: 매번) effect가 실행됩니다.
// // useEffect(function,[]) ==> fucntion 부분은 ComponentDidmount일때 실행되고 , []안에 값이 있으면 그 값이 update될때마다 function이 작동한다.
// // 만약 [] 값이 없으면 어떤 변화가 일어나든지 실행하지 않음 즉 useEffec(function,[]) 는 ComponentDidmount 역할만 한다고 보면됨

// // 2. 2020-01-08
// // 처음에 나오고 , 버튼을 클릭하면 업데이트가 되고 그 업데이트 된 값을 가지고 다시 API를 받음
// // Life Cycle 이 처음 -> return -> Didmount-> getApi -> setContents -> return
// // onClick -> category와 page 바꿔주고 -> return-> Didmount-> getAPI-> setContents -> return
// // onClick -> setState 를 통해서 category와 page 바꿔주고 -> return -> Di

// // 3. category의 번호를 확인해보자.

// navs 에는 category 와 title이 있던것 같은데

function ContentsLists({ navs, history }) {
  const [contents, setContents] = useState({
    isLoading: true,
    category: -1,
    page: 1,
    rows: [],
    total: 0,
  });

  // page 가 총 3개가 있네 처음에는 첫번째 페이지를 출력해주자
  const { isLoading, category, page, rows, total } = contents;

  // 매개변수로 전달할때는 그대로가 아닌 이름 바꿔서
  // 카테고리를 바꾸는 함수
  const changeNav = (category, page) => {
    setContents({ ...contents, isLoading: true, category, page });
  };
  // 페이지를 바꾸는 함수
  const changePage = (page) => {
    setContents({ ...contents, isLoading: true, page });
  };

  // data.data.rows
  const getApi = async () => {
    console.log(category);
    console.log(page);
    const {
      data: { data },
    } = await axios.get(
      `https://1hour.school/api/v1/contents/list/${category}/${page}`,
      {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      }
    );
    const { rows, total } = data;

    console.log(rows);

    setContents({
      ...contents,
      isLoading: false,
      rows,
      total,
    });
  };

  useEffect(getApi, [page, category]);

  return (
    <section id="contents_container">
      <h3>콘텐츠 관리</h3>

      <HeaderNavs navs={navs} changeNav={changeNav} name={"contents"} />

      {/* 이 부분도 컴포넌트로만 구성하면 좋을것 같은데 아니면 이대로 사용하고 ContentsList를 재활용 해서 쓰는거지*/}
      {isLoading ? (
        <div className="Loader">
          {/* 나중에 Spinner Api 받아서 바꿔주자 */}
          <span className="Loader__text">isLoading...</span>
        </div>
      ) : (
        <ContentsList rows={rows} getApi={getApi} history={history} />
      )}

      <Pagination total={total} changePage={changePage} />
    </section>
  );
}

export default ContentsLists;
