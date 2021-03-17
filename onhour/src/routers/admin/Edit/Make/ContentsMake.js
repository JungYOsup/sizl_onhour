import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentsView from "../../.././../components/ContentsView";

function ContentsMakes({ contents, history, paragraphs }) {
  const [modifies_two, setModifies_two] = useState({
    contents, //컨텐츠 pk
    paragraphs,
  });

  console.log(contents, "content");
  console.log(paragraphs);

  // 1.Textarea에 값 입력시 변경하는 함수
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

  // 2.입력된 값을 번역하여 바꿔주는 API
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
        "https://1hour.school/api/v1/contents/create/sentence",
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
        const {
          data: { data },
        } = res;

        console.log(data);

        history.push({
          pathname: "/admin/Edit/mediatool_manage",
          state: {
            contents: data.contents,
            page: 3,
            paragraphs: data.paragraphs,
            url: data.url,
          },
        });
      });
  };

  return (
    <div className="contentsmake">
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
export default ContentsMakes;
