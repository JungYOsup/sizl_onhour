import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ProblemView from "../../../../components/ProblemView";

// 뜬금 전역변수..
let num = 0;

function ProblemModify({ contents }) {
  const init = [
    {
      pk: 0,
      title: "",
      questionText: "",
      questionImg: null,
      commentaryText: "",
      commentaryImg: null,

      answers: [
        {
          pk: 0,
          answer: "",
          correct: false,
        },
        {
          pk: 0,
          answer: "",
          correct: false,
        },
        {
          pk: 0,
          answer: "",
          correct: false,
        },
        {
          pk: 0,
          answer: "",
          correct: false,
        },
        {
          pk: 0,
          answer: "",
          correct: false,
        },
      ],
    },
  ];
  // 공통 : 화면은 임시의 데이터로 뿌려준다.

  //1. 데이터가 없을시 , 초기 데이터를 뿌려준다.(v)

  //2. 데이터가 있을시 , 데이터 만큼 임시의 데이터에 뿌려주고, 실질 데이터에도 뿌려준다. (v)

  //3. 데이터 수정시 , 임의의 데이터도 수정되어야 하고 문제열 추가하기를 누를때 실질 데이터에 추가 되어야한다.

  //4. 새로운 문제 추가시 임의의 데이터에만 초기값 데이터가 추가된다.

  //5. 문제열 추가시 실질 데이터에 추가된 데이터가 추가된다.

  //6. 클릭시 해당 데이터가 보이는것은 임의의 데이터가 보여져야 한다. 그 이유는 화면에 보여지는게 임의의 데이터이기 때문이다.

  //7. 삭제시 , 실질데이터도 삭제되고 , 임의의 데이터도 삭제되어야하며 보여주는 화면은 임의의 데이터의 마지막 화면이어야한다.

  const [problem, setProblem] = useState({
    questions: init,
  });
  //실질 데이터
  const [subProblem, subsetProblem] = useState({
    subquestions: [],
  });

  const { questions } = problem;
  let { subquestions } = subProblem;
  const questionfile = useRef();
  const commentaryfile = useRef();

  console.log(num, "num");
  console.log(questions, "questions");
  console.log(subquestions, "subquestions");

  const getApi = async () => {
    const {
      data: { data },
    } = await axios.get(
      `https://1hour.school/api/v1/contents/load/question/${contents}`,
      {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      }
    );

    const getquestions = data.questions;

    // 만약 데이터가 없을시 임시의 데이터에 초기값을 뿌려준다.
    // 만약 데이터가 있을시 임시의 데이터에도 데이터를 뿌려주고 , 실질 데이터에 뿌려준다.

    if (getquestions[0] !== undefined) {
      console.log("hhhhhhhh");
      // 이렇게 하면 두번 랜더링 된다. 그렇기 때문에 발생할 문제들이 분명 있을듯..
      setProblem({ ...questions, questions: getquestions });
      subsetProblem({ ...questions, subquestions: getquestions });
    }
  };

  // 입력시 임의의 데이터
  const inputValue = (e, highindex) => {
    const textValue = e.target.value;
    const textName = e.target.name;

    console.log(questions, "변경");

    const copy_questions = [...questions];
    // **객체 복사무조건 해줘야지 !!**

    console.log(copy_questions);
    switch (textName) {
      case "matter":
        copy_questions[highindex].title = textValue;
        break;
      case "text_sentence":
        copy_questions[highindex].questionText = textValue;
        break;
      case "commentary":
        copy_questions[highindex].commentaryText = textValue;
        break;
    }

    setProblem({ ...questions, questions: copy_questions });
  };
  // 정답시 입력시 임의의 데이터와 실질 데이터가 수정됨
  const inputAnswer = (e, highindex, index) => {
    const answerValue = e.target.value;

    questions[highindex].answers[index].answer = answerValue;

    setProblem({ ...questions, questions });
  };

  const checkBtn = (e, highindex, index) => {
    const isChecked = e.target.dataset.check;

    if (isChecked === "true") {
      questions[highindex].answers[index].correct = false;
    } else if (isChecked === "false") {
      console.log("이거동작함?");
      questions[highindex].answers[index].correct = true;
    }

    setProblem({ ...questions, questions });
  };

  const questionBtn = () => {
    questionfile.current.click();
  };

  const updateQuestion = (e, highindex) => {
    let formData = new FormData();
    const file = e.target.files[0];

    formData.append("file", file);

    axios
      .post("https://1hour.school/api/v1/file/upload", formData, {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      })
      .then((res) => {
        const {
          data: { data },
        } = res;

        questions[highindex].questionImg = data.url;
        setProblem({ ...questions, questions });
      });
  };

  const commantaryBtn = () => {
    commentaryfile.current.click();
  };

  const updateCommantary = (e, highindex) => {
    let formData = new FormData();
    const file = e.target.files[0];

    formData.append("file", file);

    axios
      .post("https://1hour.school/api/v1/file/upload", formData, {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      })
      .then((res) => {
        console.log(res);
        const {
          data: { data },
        } = res;

        questions[highindex].commentaryImg = data.url;
        setProblem({ ...questions, questions });
      });
  };

  // 문자열에 추가하기

  const addPreview = () => {};

  // 새로운 문제 추가하기
  // 임시의 데이터에 초기화된 데이터가 추가된다.
  // 그리고 화면에는 초기화된 2번재 화면이 나와야한다.
  const addProblem = () => {};

  // 문자열 삭제하기
  // 데이터가 아무것도 없을때는 다시 초기값을 넣어준다
  // 데이터가 1개일경우 삭제할때
  const deleteProblem = (index) => {};

  // 클릭시 문제에 떠야함
  const clickChangeView = (index) => {};

  useEffect(() => {
    getApi();
    console.log("Effect");
  }, []);

  return (
    <div>
      <ProblemView
        questions={questions}
        inputValue={inputValue}
        inputAnswer={inputAnswer}
        checkBtn={checkBtn}
        questionfile={questionfile}
        questionBtn={questionBtn}
        updateQuestion={updateQuestion}
        commentaryfile={commentaryfile}
        commantaryBtn={commantaryBtn}
        updateCommantary={updateCommantary}
        addPreview={addPreview}
        subquestions={subquestions}
        addProblem={addProblem}
        clickChangeView={clickChangeView}
        num={num}
        deleteProblem={deleteProblem}
      />
    </div>
  );
}

export default ProblemModify;
