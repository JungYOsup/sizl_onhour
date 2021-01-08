import React from "react";

function ContentsNav({ navs, changeCategory }) {
  return (
    <div>
      <ul className="contents__nav">
        <li>
          <button onClick={() => changeCategory(-1, 1)}>전체</button>
        </li>
        {navs.map((nav, index) => (
          <li>
            <button onClick={() => changeCategory(nav.category, 1)} key={index}>
              {nav.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentsNav;
