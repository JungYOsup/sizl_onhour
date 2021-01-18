import React from "react";

function SwitchComponent({ hidden, onSwitch, pk, index }) {
  // 굳이 업데이트 된것이 뿌려질 필요가 있나싶은데 ? 굳이 뿌려줄 필요가 없는걸?
  // 그냥 여기는 이미지상으로 공개 비공개로 하면 되지 않으까?

  return (
    <div className="contents__switch">
      <label className="switch">
        <input
          checked={!hidden}
          type="checkbox"
          onClick={() => onSwitch(hidden, pk, index)}
        />
        <span className="slider round"></span>
        {hidden ? <span>영상 공개중</span> : <span>영상 비공개중</span>}
      </label>
    </div>
  );
}

export default SwitchComponent;
