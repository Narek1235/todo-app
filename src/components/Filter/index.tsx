import React, { Component } from "react";
import AddTodo from "../AddTodo";
import UserContext from '../../contexts/UserContext'

import "./index.css";
import TodoList from "../TodoList";

export interface IFilterProps {
  incompleteCount: number;
  filterChange: (state: 'all' | 'active' | 'complete') => void
}

class Filter extends React.PureComponent<IFilterProps, any> {


  render() {
    const { incompleteCount, filterChange } = this.props;
    const suffix = incompleteCount > 1 ? 's' : ''
    return (
      <div className="todo-filter">
        <span> {incompleteCount} item{suffix} left </span>
        <div className="todo-filter-buttons">
          <button onClick={() => filterChange('all')}>All</button>
          <button onClick={() => filterChange('active')}>Active</button>
          <button onClick={() => filterChange('complete')}>Completed</button>
        </div>
        <UserContext.Consumer>
          {(user) => {
            return user ? "Authenticated: " + user.username : "Not Authenticated"
          }}
        </UserContext.Consumer>
      </div>
    );
  }
}

export default Filter;
