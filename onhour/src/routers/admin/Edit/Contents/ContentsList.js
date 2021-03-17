import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/contents/contentslist.css";
import SwitchComponent from "../../../../components/SwitchComponent";
import { Link } from "react-router-dom";
import Content from "./Content";

function ContentsList({ rows, history }) {
  const hidden_Array = rows.map((row) => {
    return row.hidden;
  });
  const [switches, setSwitches] = useState({
    pk: -1,
    hidden: hidden_Array, //[false, true, false, false, true, false, false, false, false, false]
    index: 0,
  });

  let count_i = 0;
  let count_h = 0;

  const { pk, hidden, index } = switches;

  const setApi = () => {
    axios
      .post(
        "https://1hour.school/api/v1/contents/update/shown",
        { contents: pk, isHidden: hidden[index] },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          console.log("성공");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // useEffect[function,[a,b]] 라고 할때 a or b가 변하면 function이 동작
  // render시 한번은 무조건 동작 하네

  const deleteBtn = async (contents) => {
    await axios
      .post(
        "https://1hour.school/api/v1/contents/remove",
        {
          contents,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        // url이 같은곳에서 같은곳으로 이동은 불가능 한것 같다.
        // 이동이 불가능하므로 이동할수 있는 느낌이 들게끔해야하는데..
        // 다시 데이터를 가져오던가,
        history.push("/admin/Edit/content_manage");
        window.location.reload();
      });
  };

  useEffect(setApi, [pk, hidden, index]);

  const onSwitch = (switchValue, pk, index) => {
    console.log(switchValue);
    hidden[index] = !switchValue;
    setSwitches({ ...switches, hidden: hidden, pk, index });
  };

  return (
    <div className="ContentsList">
      {rows.map((row, index) => (
        <div key={index} className="contents">
          <Content
            category={row.category}
            title={row.title}
            youtubeTitle={row.youtubeTitle}
            problems={row.problems}
            registered={row.registered}
            url={row.url}
          />

          <SwitchComponent
            index={count_i++}
            hidden={hidden[count_h++]}
            onSwitch={onSwitch}
            pk={row.pk}
          />

          <div className="contents__setting">
            <Link
              to={{
                pathname: "/admin/Edit/content_edit",
                state: {
                  pk: row.pk,
                  page: 1,
                },
              }}
            >
              수정하기
            </Link>
            <button onClick={() => deleteBtn(row.pk)}>삭제하기</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContentsList;
