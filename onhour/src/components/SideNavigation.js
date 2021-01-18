import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/sidenavigation.css";
function SideNavigation() {
  return (
    <div id="sidenavigation">
      <Link to="/admin/Edit/content_manage">콘텐츠관리</Link>
      <Link to="/admin/Edit/category_manage">카테고리 관리</Link>
      <Link to="/admin/PlayList/play_list_manage">풀레이리스트 관리</Link>
      <Link to="/admin/Banner/banner_manage">배너 관리</Link>
      <Link to="/admin/Member/member_manage">회원 관리</Link>
    </div>
  );
}

export default SideNavigation;
