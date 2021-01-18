// 2021-01-04
// 1.
// find는 값을 리턴해주는반면 , filter은 일치하는 모든 값을 리턴해주기에 배열로 리턴해준다.

// translation 하는방법
// 배운점 : 고차함수와 , 배열에서 자주사용하는 함수들이 얼마나 중요한지 깨닫게 됨(splice , indexOf 등)

// 2.
// input과 textarea에서 자식요소에 값을 쓰는것은 위험하다. ex) <input>안녕</input> (x) , <input value="안녕"></input>
// react에서 textarea는 value 라는 prop를 사용해야지만 업데이트 할때 값도 업데이트 되더라
// 하지만 <textarea>값<textarea> 처럼 textarea의 자식요소에 잇는 값는들 업데이트를 해도 값이 변경이 안된다.
// 그래서 일반적으로 textarea 자식요소로 값을 쓸경우 쓰지말라고 오류가 뜬다.

// 3.
// 그러면 어떻게 해야할까?? textarea에 value를 정해지면 수정이 안되고, child에 값을 넣을경우에는 업데이트가 안되던데..?

// 4.
// textarea의 동작방식을 보면 onchange가 일어나고 그 변화한 값들이 setState에 올라간뒤 다시 뿌려줘야지만 제대로 값이 변화한다.
// 원리를 잘 알아보자

//  history
// history는 stack으로 쌓기 때문에 페이지 이동을 할때는 어딜 걸처서 가면 안된다 .
// 예를들어 1->2->3 페이지를 가고 싶은데 1->부모->2->부모->3 로 컴포넌트가 구성되어있으면  2에서 history.goback()를 하면 부모로 간다.
// 따라서 history를 사용하려면 1->2->3 페이지 순으로 이동하게끔 짜야한다.

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/css/modifies/contentsmodify.css";
import ContentsView from "../../../../components/ContentsView";
// 변역을 바로바로 어떻게 해줘야할까 ?? 궁금하네..

function ContentsModify({ contents, history }) {
  const [modifies_two, setModifies_two] = useState({
    contents: contents, //컨텐츠 pk
    paragraphs: [],
  });

  const { paragraphs } = modifies_two;

  console.log(contents, "content");
  console.log(paragraphs);

  // 1.컨텐츠 pk에 의해 문장 불러오기 API를 가져오는 함수
  const getApi = async () => {
    const {
      data: { data },
    } = await axios.get(
      `https://1hour.school/api/v1/contents/load/sentence/${contents}`,
      {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      }
    );

    const { paragraphs } = data;

    console.log(paragraphs); // [{eng:"Test",kor:"테스트",pk:1062},{eng:"One",kor:"하나",pk:1063},{eng:"TWo",kor:"둘",pk:1064}]

    setModifies_two({ ...modifies_two, paragraphs });
  };

  // 2.Textarea에 값 입력시 변경하는 함수
  const chageTextarea = (e, pk, lan) => {
    console.log(pk);
    const changeValue = e.target.value;
    //파라그랩스들중 pk가 일치하는 파라그랩스를 값을 가져온다.
    const result = paragraphs.find((paragraph) => paragraph.pk === pk);
    //그 파라스랩스를 바뀐 값으로 바꿔준다.
    // 파라그랩스들중 result와 일치하는 index를 가져온다
    console.log(result);
    const findIndex = paragraphs.indexOf(result);
    // 그 일치하는 파라그랩스의 eng를 입력값으로 바꿔준다.
    console.log(findIndex);
    if (lan == "en") {
      paragraphs[findIndex].eng = changeValue;
    } else if (lan == "ko") {
      paragraphs[findIndex].kor = changeValue;
    }

    console.log(paragraphs);

    setModifies_two({ ...contents, paragraphs });
  };

  // 3.입력된 값을 번역하여 바꿔주는 API
  const TranslationApi = async (e, pk) => {
    let inputEng = e.target.value;
    const {
      data: { data },
    } = await axios.post(
      `https://1hour.school/api/v1/translate/single`,
      { paragraphs: inputEng },
      {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      }
    );
    // pk가 같을때 그 부분에다가 넣어준다.
    //1. pk를 가져온다.
    //2. 기존에 있던 배열과 pk 부분이 일치한 부분을 찾아 바꿔준다.
    //3. data 자체에는 pk가 없으므로 pk를 data에 추가시킨다.
    //3.바꾼 데이터를 set해서 넣어준다.
    // paragraph.kp 와 === pk가 일치하는 파라그랩스 를 리턴해준다.
    // find는 값을 리턴해주는반면 , filter은 일치하는 모든 값을 리턴해주기에 배열로 리턴해준다.

    console.log(data);
    const result = paragraphs.find((paragraph) => paragraph.pk === pk);
    // 파라그랩스들중 result와 일치하는 index를 가져온다
    const findIndex = paragraphs.indexOf(result);
    // data에는 eng와 kor 밖에 없으므로 , data에 pk를 넣어서 전달한다.
    // 현재 data 의 모습은  {eng kor}
    // 넣어야할 data의 모습은 {pk,eng,kor}

    const newData = {};
    newData.pk = pk;
    newData.eng = data.eng;
    newData.kor = data.kor;

    console.log(newData);

    // 일치하는 index를 data로 바꿔준다.
    paragraphs.splice(findIndex, 1, newData);
    console.log(paragraphs);
    // 바꾼 파라그랩스들을 다시 set 해준다.
    setModifies_two({ ...modifies_two, paragraphs });
  };

  // 4. 리스트를 추가하는 함수

  const addLists = () => {
    let newLists = {};
    for (let i = 0; i < 10; i++) {
      newLists = {
        pk: `${i + 1}`,
        eng: "",
        kor: "",
      };
      paragraphs.push(newLists);
    }

    setModifies_two({ ...modifies_two, paragraphs });
  };

  // 5.이전으로 가는 함수
  const prevBtn = () => {
    history.goBack(-2);
    // 근데 이렇게 router를 짜도 될까..??
  };

  // 6.저장후 다음페이지로 이동

  const saveAndpostApi = async () => {
    console.log(paragraphs);

    // 1. 배열에 kor or eng가 빈칸이 있으면 다 지워준다.
    const filterParagraphs = paragraphs.filter((paragraph) => {
      if (paragraph.kor !== "" && paragraph.eng !== "") {
        return paragraph;
      }
    });

    console.log(filterParagraphs);

    // 2. 배열이 pk값이 string인 것을 null로 다 바꿔준다.
    // 값을 바꿔주는 용도의 함수가 아닐텐데 map이..
    const changeParagraphs = filterParagraphs.map((filterParagraph) => {
      if (typeof filterParagraph.pk === "string") {
        filterParagraph.pk = null;
      }
      return filterParagraph;
    });

    console.log(changeParagraphs);

    await axios
      .post(
        "https://1hour.school/api/v1/contents/update/sentence",
        {
          contents,
          sentences: changeParagraphs,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        history.push({
          pathname: "/admin/Edit/content_edit",
          state: {
            contents,
            page: 3,
          },
        });
      });
  };

  useEffect(getApi, []);

  return (
    <div className="contentsmodify">
      <ContentsView
        paragraphs={paragraphs}
        addLists={addLists}
        prevBtn={prevBtn}
        saveAndpostApi={saveAndpostApi}
        chageTextarea={chageTextarea}
        TranslationApi={TranslationApi}
      />
    </div>
  );
}

export default ContentsModify;
