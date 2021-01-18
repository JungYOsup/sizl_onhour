import React, { useEffect, useState } from "react";
import HeaderNavs from "../../../components/HeaderNavs";
import Pagination from "../../../components/Pagination";
import axios from "axios";
import MemberTable from "./MemberTable";
function MemberManage() {
  const [members, setMembers] = useState({
    rows: [],
    tab: -1,
    page: 1,
    total: 0,
  });

  const { tab, page, rows, total } = members;

  const getApi = async () => {
    const {
      data: { data },
    } = await axios.get(
      `https://1hour.school/api/v1/members/list/
    ${tab}/${page}/query?keyword=`,
      {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      }
    );

    console.log(data);

    const { rows, total } = data;
    setMembers({ ...members, rows, tab, page, total });
  };

  useEffect(getApi, []);

  return (
    <div>
      <HeaderNavs name="member" />
      <MemberTable rows={rows} />
      <Pagination total={total} />
    </div>
  );
}

export default MemberManage;
