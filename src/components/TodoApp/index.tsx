import React, { Component } from "react";
import memoizeOne from 'memoize-one';
import AddTodo from "../AddTodo";

import "./index.css";
import TodoList from "../TodoList";
import Filter from "../Filter";

export interface ITodoListState {
  todos: ITodoItem[];
  isAllTodosCompleted: boolean;
  filterState: 'all' | 'active' | 'complete'
}

export interface ITodoItem {
  name: string;
  id: number;
  isCompleted: boolean;
}

class TodoApp extends Component<{}, ITodoListState> {
  static ID: number = 0;

  intervalId: any

  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
      isAllTodosCompleted: false,
      filterState: 'all'
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        todos: [{
          id: 1,
          name: 'Todo',
          isCompleted: false
        }]
      });
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  
  onAddTodoTextChange = addTodoName => {
    const { todos } = this.state;
    const todo = {
      id: ++TodoApp.ID,
      name: addTodoName,
      isCompleted: false
    }
    this.setState({
      todos: [
        ...todos,
        todo
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
    let index = todos.indexOf(todoItem);
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  };

  onFilterChange = (filterState) => {
    this.setState({ filterState });
  }

  doFilter = memoizeOne(function (todos: ITodoItem[], filterState) {
    if (filterState === 'all') {
      return todos;
    }
    if (filterState === 'active' || filterState === 'complete') {
      return todos.filter(v => filterState === 'active' ? !v.isCompleted : v.isCompleted);
    }
  });

  getActiveCount = memoizeOne(function (todos: ITodoItem[]) {
    return todos.filter(v => !v.isCompleted).length;
  });

  render() {
    const { isAllTodosCompleted, todos, filterState } = this.state;
    const filteredTodos = this.doFilter(todos, filterState);
    const activeCount = this.getActiveCount(todos);
    return (
      <div className="todo-app">
        <AddTodo
          isAllTodosCompleted={isAllTodosCompleted}
          onAddTodoTextChange={this.onAddTodoTextChange}
          onCompleteAllChange={this.onCompleteAllChange}
        />
        <TodoList todos={filteredTodos} onCompleteChange={this.onTodoItemCompleteChange}
          onRemove={this.onTodoItemRemove} />
        <Filter incompleteCount={activeCount} filterChange={this.onFilterChange} />
      </div>
    );
  }
}

export default TodoApp;
