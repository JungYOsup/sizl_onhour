import HeaderNavs from "../../../components/HeaderNavs";
import Pagination from "../../../components/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PlayListTable from "./PlayListTable";

function PlayListManage() {
  const [playlists, setPlaylists] = useState({
    rows: [],
    page: 1,
    total: 0,
  });

  const { rows, page, total } = playlists;

  const getApi = async () => {
    const {
      data: { data },
    } = await axios.get(`https://1hour.school/api/v1/playlist/load/${page}`, {
      headers: {
        Authorization: sessionStorage.getItem("adminToken"),
      },
    });

    const { rows, total } = data;

    console.log(rows);

    setPlaylists({ ...playlists, rows, total });
  };

  useEffect(getApi, []);

  return (
    <div>
      <HeaderNavs name={"playlist"} navs={rows} />
      <PlayListTable rows={rows} />
      <Pagination total={total} />
    </div>
  );
}

export default PlayListManage;
