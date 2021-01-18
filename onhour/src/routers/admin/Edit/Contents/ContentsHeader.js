import React from "react";

function ContentsHeader({ navs, changeNav }) {
  return (
    <ul className="header__lists">
      <li className="header__list">
        <button className="header__btn" onClick={() => changeNav(-1, 1)}>
          전체영상
        </button>
      </li>
      {navs == null
        ? undefined
        : navs.map((nav, index) => (
            <li className="header__list">
              <button
                className="header__btn"
                onClick={() => changeNav(nav.category, 1)}
                key={index}
              >
                {nav.name}
              </button>
            </li>
          ))}
    </ul>
  );
}

export default ContentsHeader;
