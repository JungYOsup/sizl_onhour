import React from "react";

function CommonTable({ rows, name }) {
  const titles = {
    category: ["카테고리이름", "등록된 영상", "생성일"],
    playlist: ["플레이리스트이름", "화면순서", "메인화면 노출"],
    user: [
      "회원이름",
      "타입",
      "메일주소/ID",
      "기관(학교 또는 학원)",
      "학번",
      "가입일",
    ],
    agency: ["기관 이름", "타입", "지역", "등록인원(교사)", "등록일"],
  };

  return (
    // 2가지의 컴포넌트로 구성되어있는데, 처음에는 table로 구성되어있고,이럴경우 그냥 컴포넌트를 나눠버리자..
    <table>
      <tr>
        {titles[name].map((title) => (
          <th>{title}</th>
        ))}
      </tr>
      {rows.map((row) => (
        <tr>
          <td>{row.name}</td>
          <td>{row.size}</td>
          <td>{row.registered}</td>
        </tr>
      ))}
    </table>
  );
}

export default CommonTable;
