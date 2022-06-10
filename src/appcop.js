import React, { useState, useEffect, useRef, useReducer } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const initialAlert = { show: false, msg: "", type: "" };
  const inputField = useRef();
  const [list, setList] = useState(
    localStorage.getItem("grocery").split(",") || []
  );
  const [item, setItem] = useState();
  const [edit, setEdit] = useState(false);
  const [target, setTarget] = useState();
  const [msg, setMsg] = useState();
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alert, dispatch] = useReducer(alertReducer, initialAlert);
  useEffect(() => {
    setTimeout(() => setAlert(false), 2000);
  }, [alert]);
  useEffect(() => {
    setItem(list[target]);
  }, [target]);
  useEffect(() => {
    localStorage.setItem("grocery", list);
  }, [list]);

  function handleSubmit(event) {
    event.preventDefault();
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
      setMsg("value changed");
      setAlert(true);
      setAlertType("success");
      setItem("");
    } else {
      setList((prev) => [...prev, item]);
      setMsg("item added to the list");
      setAlert(true);
      setAlertType("success");
      setItem("");
    }
  }

  function deleteItem(idx) {
    let newList = list.filter((item, index) => {
      return index !== idx;
    });
    setList(newList);
    setMsg("item deleted");
    setAlert(true);
    setAlertType("danger");
  }

  function editItem(idx) {
    setEdit(true);
    setTarget(idx);

    inputField.current.focus();
  }

  function clearList() {
    setList([]);
    setMsg("Empty List");
    setAlert(true);
    setAlertType("danger");
  }

  return (
    <section class="section-center">
      {alert && <Alert msg={msg} type={alertType} />}
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
        {list.map((item, key) => {
          return (
            <List
              title={item}
              deleteItem={deleteItem}
              idx={key}
              key={key}
              editItem={editItem}
            />
          );
        })}
      </div>
      <button class="clear-btn" onClick={clearList}>
        clear items
      </button>
    </section>
  );
}

export default App;
