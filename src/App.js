import React, { useState, useEffect, useRef, useReducer } from "react";
import Item from "./Item";
import Alert from "./Alert";

function alertReducer(alert, action) {
  switch (action) {
    case "change":
      return (alert = { show: true, msg: "value changed", type: "success" });

    case "add":
      return (alert = {
        show: true,
        msg: "item added to the list",
        type: "success",
      });

    case "delete":
      return (alert = { show: true, msg: "item deleted", type: "danger" });

    case "clear":
      return (alert = { show: true, msg: "Empty List", type: "danger" });

    case "hide":
      return (alert = { show: false, msg: "", type: "" });
    case "empty":
      return (alert = {
        show: true,
        msg: "please enter value",
        type: "danger",
      });

    default:
      break;
  }
}
function App() {
  const initialAlert = { show: false, msg: "", type: "" };
  const inputField = useRef();
  const [list, setList] = useState(
    localStorage.getItem("grocery")
      ? localStorage.getItem("grocery").split(",")
      : []
  );
  const [item, setItem] = useState();
  const [edit, setEdit] = useState(false);
  const [target, setTarget] = useState();

  const [alert, dispatch] = useReducer(alertReducer, initialAlert);
  useEffect(() => {
    const timeOut = setTimeout(() => dispatch("hide"), 2000);
    return () => clearTimeout(timeOut);
  }, [alert]);
  useEffect(() => {
    setItem(list[target]);
  }, [target]);
  useEffect(() => {
    localStorage.setItem("grocery", list);
  }, [list]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!item) {
      dispatch("empty");
    }
    if (edit) {
      let newList = list.map((ele, index) => {
        if (index === target) {
          return item;
        } else {
          return ele;
        }
      });
      setList(newList);
      setEdit(false);
      dispatch("change");
      setItem("");
    } else {
      setList((prev) => [...prev, item]);
      dispatch("add");
      setItem("");
    }
  }

  function deleteItem(idx) {
    let newList = list.filter((item, index) => {
      return index !== idx;
    });
    setList(newList);
    dispatch("delete");
  }

  function editItem(idx) {
    setEdit(true);
    setTarget(idx);

    inputField.current.focus();
  }

  function clearList() {
    setList([]);

    dispatch("clear");
  }

  return (
    <section class="section-center">
      {alert.show && <Alert msg={alert.msg} type={alert.type} />}
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>grocery bud</h3>
        <div class="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={item}
            onChange={(event) => setItem(event.target.value)}
            ref={inputField}
          />
          <button type="submit" className="submit-btn">
            {edit ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      <div class="grocery-container">
        <div className="grocery-list">
          {list.map((item, key) => {
            return (
              <Item
                title={item}
                deleteItem={deleteItem}
                idx={key}
                key={key}
                editItem={editItem}
              />
            );
          })}
          {list.length > 0 && (
            <button class="clear-btn" onClick={clearList}>
              clear items
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
