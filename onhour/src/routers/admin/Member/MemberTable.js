import React from "react";

function MemberTable({ rows }) {
  const titles = [
    "회원이름",
    "타입",
    "메일주소/ID",
    "기관(학교 또는 학원)",
    "학번",
    "기입일",
  ];

  return (
    <table>
      <tr>
        {titles.map((title) => (
          <th>{title}</th>
        ))}
      </tr>
      {rows.map((row) => (
        <tr>
          <td>{row.name}</td>
          <td>{row.authority}</td>
          <td>{row.email}</td>
          <td>{row.organization_name}</td>
          <td>{row.id}</td>
          <td>{row.registered}</td>
        </tr>
      ))}
    </table>
  );
}

export default MemberTable;
