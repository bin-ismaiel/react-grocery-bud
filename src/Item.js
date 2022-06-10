import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const Item = ({ title, idx, deleteItem, editItem }) => {
  return (
    <article class="grocery-item">
      <p class="title">{title}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn" onClick={() => editItem(idx)}>
          <FaEdit />
        </button>
        <button
          type="button"
          class="delete-btn"
          onClick={() => deleteItem(idx)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default Item;
