import { useState } from "react";

export default function ListItem({
  name,
  id,
  removeItem,
  toogleItem,
  compeleted,
}) {
  const toogle = () => {
    toogleItem(id);
  };

  return (
    <li style={{ display: "flex" }}>
      <input type="checkbox" checked={compeleted} onChange={toogle} />
      <p style={{ textDecoration: compeleted && "line-through" }}>{name}</p>
      <button
        type="button"
        onClick={() => {
          removeItem(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
