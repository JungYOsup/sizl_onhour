import React, { useEffect, useState } from "react";
import HeaderNavs from "../../../components/HeaderNavs";
import BannerTable from "./BannerTable";
import axios from "axios";

function BannerManage() {
  const [banners, setBanners] = useState({
    rows: [],
    total: 0,
    page: 1,
  });

  const { rows, total, page } = banners;

  const getApi = async () => {
    const {
      data: { data },
    } = await axios.get(`https://1hour.school/api/v1/banner/list/${page}`, {
      headers: {
        Authorization: sessionStorage.getItem("adminToken"),
      },
    });
    const { rows, total } = data;

    setBanners({ ...banners, rows, total });
  };

  useEffect(getApi, []);

  return (
    <div>
      <HeaderNavs name="banner" />
      <BannerTable rows={rows} />
    </div>
  );
}

export default BannerManage;
