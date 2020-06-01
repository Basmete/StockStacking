import React from "react";
import "./avatar.scss";

function Avatar({ url }) {
  const src = url
    ? url
    : "https://kholmsk-arena.ru/wp-content/uploads/d-avatar.png";
  return (
    <div className="avatar">
      <img src={src} alt="avatar"></img>
    </div>
  );
}

export default Avatar;
