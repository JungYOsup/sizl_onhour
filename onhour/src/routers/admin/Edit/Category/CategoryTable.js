import React from "react";

function CategoryTable({ rows }) {
  const titles = ["카테고리이름", "등록된 영상", "생성일"];

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
          <td>{row.size}</td>
          <td>{row.registered}</td>
        </tr>
      ))}
    </table>
  );
}

export default CategoryTable;
