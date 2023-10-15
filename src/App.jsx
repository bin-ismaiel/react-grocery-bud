import { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./Form";
import List from "./List";

const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const DEFAULT_ITEMS = JSON.parse(localStorage.getItem("list") || "[]");

const App = () => {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const addItem = (itemName) => {
    let newItem = {
      name: itemName,
      compeleted: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
  };

  const removeItem = (id) => {
    let updatedItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(updatedItems);
    setLocalStorage(updatedItems);
  };

  const toogleItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, compeleted: !item.compeleted };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
    setLocalStorage(updatedItems);
  };

  return (
    <main>
      <h2>Grocery Bud</h2>
      <Form addItem={addItem} />
      <List items={items} removeItem={removeItem} toogleItem={toogleItem} />
    </main>
  );
};

export default App;
