import React, { Component } from "react";
import classNames from "classnames";

import "./index.css";
import { ITodoItem } from "../TodoApp";

function ListItem(props) {
  console.log("Rendered: ", props.todo)
  const todo = props.todo;
  return <li
    className={classNames("todo-item", {
      "is-completed": todo.isCompleted
    })}
  >
    <input
      type="checkbox"
      checked={todo.isCompleted}
      onChange={e => props.onCompleteChange(todo, e.target.checked)}
    />
    <div className="todo-name">{todo.name}</div>
    <button onClick={() => props.onRemove(todo)}>Remove</button>
  </li>

}

const ListItemMemo = React.memo(ListItem)

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
        {todos.map(todo => (<ListItemMemo todo={todo} key={todo.id}
          onCompleteChange={onCompleteChange}
          onRemove={onRemove}></ListItemMemo>

        ))}
      </ul>
    );
  }
}

export default TodoList;
