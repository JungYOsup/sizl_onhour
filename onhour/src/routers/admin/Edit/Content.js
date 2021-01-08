import React from "react";

function Contents({
  pk,
  title,
  yotubetitle,
  category,
  hidden,
  url,
  problems,
  registered,
}) {
  return (
    <div>
      <div>{pk}</div>
      <div>{title}</div>
      <div>{yotubetitle}</div>
      <div>{category}</div>
      <div>{hidden}</div>
      <div>{url}</div>
      <div>{problems}</div>
      <div>{registered}</div>
    </div>
  );
}

export default Contents;
