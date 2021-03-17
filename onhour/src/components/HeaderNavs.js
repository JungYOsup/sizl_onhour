import React from "react";
import CategoryHeader from "../routers/admin/Edit/Category/CategoryHeader";
import ContentsHeader from "../routers/admin/Edit/Contents/ContentsHeader";
import MemberHeader from "../routers/admin/Member/MemberHeader";
import PlayListHeader from "../routers/admin/PlayList/PlayListHeader";
import BannerHeader from "../routers/admin/Banner/BannerHeader";
import "../assets/css/headernavs.css";
import ModifyHeader from "../routers/admin/Edit/Modifies/ModifyHeader";
import MakeHeader from "../routers/admin/Edit/Make/MakeHeader";

// 공통으로 쓰고 싶다..
// 이렇게 하자 .. 컴포넌트를 만들돼 데이터에서 받아올수 없는 것들은
// 그냥 쓰자..
// 있는것들만 받아와서 꾸며주자

function HeaderNavs({ navs, changeNav, name }) {
  return (
    <div className="nav">
      {name === "contents" ? (
        <ContentsHeader navs={navs} changeNav={changeNav} />
      ) : null}
      {name === "category" ? <CategoryHeader /> : null}
      {name === "playlist" ? <PlayListHeader navs={navs} /> : null}
      {name === "banner" ? <BannerHeader /> : null}
      {name === "member" ? <MemberHeader /> : null}
      {name === "modify" ? <ModifyHeader /> : null}
      {name === "make" ? <MakeHeader /> : null}
    </div>
  );
}

export default HeaderNavs;
