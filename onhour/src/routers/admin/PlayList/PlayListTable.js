import React from "react";

function PlayListTable({ rows }) {
  const titles = ["플레이리스트 이름", "화면순서", "메인화면 노출"];

  return (
    <table>
      <tr>
        {titles.map((title) => (
          <th>{title}</th>
        ))}
      </tr>
      {rows.map((row) => (
        <tr>
          <td>{row.playlist_name}</td>
          <td>{row.index}</td>
          <td>{row.hidden}</td>
        </tr>
      ))}
    </table>
  );
}

export default PlayListTable;
