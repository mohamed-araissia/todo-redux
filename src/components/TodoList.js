import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask, deleteTask, completeTask } from "../Actions/Action";

const TodoList = ({ addTask, deleteTask, completeTask, todos }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    addTask({
      text: value,
      id: Math.random(),
      isComplete: false,
    });
    setValue("");
  };

  return (
    <>
      <header>
        <h2>YOUR TO-DO LIST</h2>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="addBtn" onClick={handleAdd}>
          ADD
        </button>
      </header>
      <ul>
        {todos.map((el) => (
          <li key={el.id}>
            <span
              style={
                el.isComplete
                  ? { textDecoration: "line-through" }
                  : null
              }
            >
              {el.text}
            </span>
            <div className="btn">
              <button onClick={() => deleteTask(el.id)}>
                Delete
              </button>
              <button onClick={() => completeTask(el.id)}>
                {el.isComplete ? "Undo" : "Complete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return { todos: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (payload) => dispatch(addTask(payload)),
    deleteTask: (payload) => dispatch(deleteTask(payload)),
    completeTask: (payload) => dispatch(completeTask(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
