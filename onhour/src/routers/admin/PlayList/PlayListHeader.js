import React from "react";

function PlayListHeader({ navs }) {
  return (
    <ul className="header__lists">
      <li>목록</li>
      {navs == null
        ? undefined
        : navs.map((nav, index) => (
            <li>
              <button>{nav.playlist_name}</button>
            </li>
          ))}
    </ul>
  );
}

export default PlayListHeader;
