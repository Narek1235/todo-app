import React, { Component } from "react";
import classNames from "classnames";

import "./index.css";
import { ITodoItem } from "../TodoApp";

class TodoList extends Component<
  {
    todos: ITodoItem[];
    onRemove: (todo: ITodoItem) => void;
    onCompleteChange: (todo: ITodoItem, isCompleted: boolean) => void;
  },
  any
> {
  render() {
    const { todos, onRemove, onCompleteChange } = this.props;
    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames("todo-item", {
              "is-completed": todo.isCompleted
            })}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={e => onCompleteChange(todo, e.target.checked)}
            />
            <div className="todo-name">{todo.name}</div>
            <button onClick={() => onRemove(todo)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoList;
