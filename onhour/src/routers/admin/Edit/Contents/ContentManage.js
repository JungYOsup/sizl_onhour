import axios from "axios";
import React, { useEffect, useState } from "react";
import ContentsLists from "./ContentsLists";

// 1. 2020-01-07
// lifeCycle : mount : constructor render componentDidmount(1회성)
// update : render , componentDidUpdate
// useEffect : componentDidmount 와 componentDidUpdate역할을 둘다 하는구나
// render가 발생할 때 마다(componentDidMount: 초기, componentDUpdate: 매번) effect가 실행됩니다.
// useEffect(function,[]) ==> fucntion 부분은 ComponentDidmount일때 실행되고 , []안에 값이 있으면 그 값이 update될때마다 function이 작동한다.
// 만약 [] 값이 없으면 어떤 변화가 일어나든지 실행하지 않음 즉 useEffec(function,[]) 는 ComponentDidmount 역할만 한다고 보면됨

// 2. 2020-01-08
// 처음에 나오고 , 버튼을 클릭하면 업데이트가 되고 그 업데이트 된 값을 가지고 다시 API를 받음
// Life Cycle 이 처음 -> return -> Didmount-> getApi -> setContents -> return
// onClick -> category와 page 바꿔주고 -> return-> Didmount-> getAPI-> setContents -> return
// onClick -> setState 를 통해서 category와 page 바꿔주고 -> return -> Di

// 3. category의 번호를 확인해보자.

function ContentManage({ history }) {
  // data.data.
  const [list, setList] = useState({
    navs: [],
  });

  const { navs } = list;

  const getList = async () => {
    const {
      data: { data },
    } = await axios.get("https://1hour.school/api/v1/category/list", {
      headers: {
        Authorization: sessionStorage.getItem("adminToken"),
      },
    });
    console.log(data);
    setList({
      navs: data,
    });
  };

  useEffect(getList, []);

  return (
    <div>
      <ContentsLists navs={navs} history={history} />
    </div>
  );
}
export default ContentManage;
