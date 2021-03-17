import React, { useState } from "react";
import axios from "axios";
import WordView from "../../../../components/WordView";

function WordMake({ contents, history, paragraphs, name }) {
  console.log(paragraphs, "123123");
  const [words, setWords] = useState({
    paragraphs: paragraphs,
  });

  const chageTextarea = (e, index, lan) => {
    const changeValue = e.target.value;
    //파라그랩스들중 pk가 일치하는 파라그랩스를 값을 가져온다.

    if (lan === "en") {
      paragraphs[index].eng = changeValue;
    } else if (lan === "ko") {
      paragraphs[index].kor = changeValue;
    }

    console.log(paragraphs);

    setWords({ ...words, paragraphs });
  };

  const TranslationApi = async (e, index) => {
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

    paragraphs[index] = data;

    setWords({ ...words, paragraphs });
  };

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

    setWords({ ...words, paragraphs });
  };

  // 5.이전으로 가는 함수
  const prevBtn = () => {
    history.goBack(-2);
    // 근데 이렇게 router를 짜도 될까..??
  };

  // 6 삭제해주는 함수

  const deleteBtn = (index) => {
    paragraphs.splice(index, 1);

    setWords({ ...words, paragraphs });
  };

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
        "https://1hour.school/api/v1/contents/create/word",
        {
          contents,
          words: changeParagraphs,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        console.log(res, "과제pk ");
        console.log(contents);

        history.push({
          pathname: "/admin/Edit/mediatool_manage",
          state: {
            contents,
            page: 5,
          },
        });
      });
  };

  return (
    <div className="wordmodify">
      <WordView
        paragraphs={paragraphs}
        TranslationApi={TranslationApi}
        chageTextarea={chageTextarea}
        addLists={addLists}
        saveAndpostApi={saveAndpostApi}
        prevBtn={prevBtn}
        deleteBtn={deleteBtn}
      />
    </div>
  );
}

export default WordMake;
