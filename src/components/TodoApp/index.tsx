import React, { Component } from "react";
import AddTodo from "../AddTodo";

import "./index.css";
import TodoList from "../TodoList";

export interface ITodoListState {
  todos: ITodoItem[];
  isAllTodosCompleted: boolean;
}

export interface ITodoItem {
  name: string;
  id: number;
  isCompleted: boolean;
}

class TodoApp extends Component<{}, ITodoListState> {
  static ID: number = 0;
  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
      isAllTodosCompleted: false
    };
  }

  onAddTodoTextChange = addTodoName => {
    const { todos } = this.state;
    this.setState({
      todos: [
        ...todos,
        {
          id: ++TodoApp.ID,
          name: addTodoName,
          isCompleted: false
        }
      ]
    });
  };

  onCompleteAllChange = isAllTodosCompleted => {
    const newTodos = this.state.todos.map(todo => ({
      ...todo,
      isCompleted: true
    }));
    this.setState({ isAllTodosCompleted, todos: newTodos });
  };

  onTodoItemCompleteChange = (todoItem, isComplete) => {
    todoItem.isCompleted = isComplete;
    this.setState({
      todos: [...this.state.todos]
    });
  };

  onTodoItemRemove = todoItem => {
    const { todos } = this.state;
    const index = todos.indexOf(todoItem);
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  };

  render() {
    const { isAllTodosCompleted, todos } = this.state;
    return (
      <div className="todo-app">
        <AddTodo
          isAllTodosCompleted={isAllTodosCompleted}
          onAddTodoTextChange={this.onAddTodoTextChange}
          onCompleteAllChange={this.onCompleteAllChange}
        />
        <TodoList todos={todos} onCompleteChange={this.onTodoItemCompleteChange} onRemove={this.onTodoItemRemove} />
      </div>
    );
  }
}

export default TodoApp;
