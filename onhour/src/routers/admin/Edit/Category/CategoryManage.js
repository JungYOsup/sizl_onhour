import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderNavs from "../../../../components/HeaderNavs";
import CategoryTable from "../Category/CategoryTable";
function CategoryManage() {
  const [categories, setCategories] = useState({
    rows: [],
  });

  const { rows } = categories;

  const getApi = async () => {
    const {
      data: { data },
    } = await axios.get("https://1hour.school/api/v1/category/list", {
      headers: {
        Authorization: sessionStorage.getItem("adminToken"),
      },
    });

    setCategories({ rows: data });
  };

  useEffect(getApi, []);

  return (
    <div>
      <HeaderNavs name={"category"} />
      <CategoryTable rows={rows} />
    </div>
  );
}

export default CategoryManage;
