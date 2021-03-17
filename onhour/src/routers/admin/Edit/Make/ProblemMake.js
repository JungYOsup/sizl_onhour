import React, { useState, useRef } from "react";
import axios from "axios";
import ProblemView from "../../../../components/ProblemView";

let num = 0;
function ProblemMake({ history, contents }) {
  const init = {
    title: "",
    questionText: "",
    questionImg: null,
    commentaryText: "",
    commentaryImg: null,

    answers: [
      {
        answer: "",
        correct: false,
      },
      {
        answer: "",
        correct: false,
      },
      {
        answer: "",
        correct: false,
      },
      {
        answer: "",
        correct: false,
      },
      {
        answer: "",
        correct: false,
      },
    ],
  };

  // 공통 : 화면은 임시의 데이터로 뿌려준다.

  //1. 데이터가 없을시 , 초기 데이터를 뿌려준다.(v)

  //2. 데이터가 있을시 , 데이터 만큼 임시의 데이터에 뿌려주고, 실질 데이터에도 뿌려준다. (v)

  //3. 데이터 수정시 , 임의의 데이터도 수정되어야 하고 문제열 추가하기를 누를때 실질 데이터에 추가 되어야한다.

  //4. 새로운 문제 추가시 임의의 데이터에만 초기값 데이터가 추가된다.

  //5. 문제열 추가시 실질 데이터에 추가된 데이터가 추가된다.

  //6. 클릭시 해당 데이터가 보이는것은 임의의 데이터가 보여져야 한다. 그 이유는 화면에 보여지는게 임의의 데이터이기 때문이다.

  //7. 삭제시 , 실질데이터도 삭제되고 , 임의의 데이터도 삭제되어야하며 보여주는 화면은 임의의 데이터의 마지막 화면이어야한다.

  const [problem, setProblem] = useState({
    questions: [init],
    subquestions: [],
  });

  const { questions, subquestions } = problem;

  console.log(questions);

  const questionfile = useRef();
  const commentaryfile = useRef();

  //param = [{},{},{}]
  // 배열도 객체(object)
  // 배열의 DeepCopy 하는법(재귀함수이용)
  // 그런데 이렇게 deepCopy를 하면 성능에 있어 안좋다고 하니까. 새로운 DeepCopy방법을 찾아보자
  const deepCopy = (params) => {
    return JSON.parse(JSON.stringify(params));
  };

  // 입력시 임의의 데이터에만 들어감
  const inputValue = (e, highindex) => {
    const textValue = e.target.value;
    const textName = e.target.name;

    // 왜 Switch문이 적용되기 전에 이미 questions 가 바뀌는 것일까?
    // console.log()가 큐에 쌓이기 때문에 최종적으로 배열/객체의 가장 최근 값을 출력한다.
    // 따라서 이미 적용된 상태에서 출력 되는거임

    // **객체 복사무조건 해줘야지 !!**
    // 공식 react 자료에 직접적으로 객체를 바꾸는 건 좋지 않다고 함

    const copy_questions = deepCopy(questions);

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

    setProblem({
      ...problem,
      questions: copy_questions,
    });
  };
  // 입력시 임의의 데이터에만 들어감
  const inputAnswer = (e, highindex, index) => {
    const answerValue = e.target.value;

    const copy_questions = deepCopy(questions);

    copy_questions[highindex].answers[index].answer = answerValue;

    setProblem({ ...problem, questions: copy_questions });
  };

  // 입력시 임의의 데이터에만 들어감
  // 나중에 5개중에 하나만 클릭되어야함
  // answer 중에 하나가 true일 경우 나머지는 false로 처리해야함
  // 굳이 여기서 또 redering을 할 필요가 없는데 해주네..
  // 그냥 눌렀을때 기고 아니고만 바꿔주면 될듯함
  const checkBtn = (e, highindex, index) => {
    // 내가 클릭한것을 제외한 나머지는 flase 처리해야함

    const copy_getquestions = deepCopy(questions);
    console.log(copy_getquestions);
    console.log(highindex, "h");
    console.log(index, "i");

    for (let i = 0; i < 5; i++) {
      copy_getquestions[highindex].answers[i].correct = false;
    }

    copy_getquestions[highindex].answers[index].correct = true;

    setProblem({ ...problem, questions: copy_getquestions });
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

        const copy_questions = deepCopy(questions);

        copy_questions[highindex].questionImg = data.url;
        setProblem({ ...problem, questions: copy_questions });
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

        const copy_questions = deepCopy(questions);

        copy_questions[highindex].commentaryImg = data.url;
        setProblem({ ...problem, questions: copy_questions });
      });
  };

  // 문자열에 추가하기

  const addPreview = () => {
    let copy_subquestions = deepCopy(subquestions);

    copy_subquestions = questions;

    setProblem({ ...problem, subquestions: copy_subquestions });
  };

  // 새로운 문제 추가하기

  const addProblem = () => {
    num++;
    console.log(num);

    const copy_questions = deepCopy(questions);

    copy_questions.push(init);

    setProblem({ ...problem, questions: copy_questions });
  };

  // 문자열 삭제하기
  // 데이터가 아무것도 없을때는 다시 초기값을 넣어준다
  // 데이터가 1개일경우 삭제할때
  const deleteProblem = (index) => {
    console.log(index, "index");
    const copy_questions = deepCopy(questions);
    copy_questions.splice(index, 1);

    if (copy_questions.length === 0) {
      setProblem({
        ...problem,
        questions: [init],
        subquestions: copy_questions,
      });
    } else {
      setProblem({
        ...problem,
        questions: copy_questions,
        subquestions: copy_questions,
      });
    }
  };

  // 클릭시 문제에 떠야함
  const clickChangeView = (index) => {
    num = index;
    const copy_questions = deepCopy(questions);
    setProblem({ ...problem, questions: copy_questions });
  };

  // 5.이전으로 가는 함수
  const prevBtn = () => {
    history.goBack(-2);
    // 근데 이렇게 router를 짜도 될까..??
  };

  // 6.저장후 다음페이지로 이동

  const saveAndpostApi = async () => {
    await axios
      .post(
        "https://1hour.school/api/v1/contents/create/question",
        { contents, questions: subquestions },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        history.push("/admin/Edit/content_manage");
      });
  };

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
        prevBtn={prevBtn}
        saveAndpostApi={saveAndpostApi}
      />
    </div>
  );
}

export default ProblemMake;
