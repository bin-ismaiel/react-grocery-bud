import { useState } from "react";
export default function Form({ addItem }) {
  const [newItem, setNewItem] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        onChange={(e) => {
          setNewItem(e.target.value);
        }}
        value={newItem}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
