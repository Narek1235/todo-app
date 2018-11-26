import React, { Component, ChangeEvent } from "react";
import PropTypes from "prop-types";

interface IAddTodoProps {
  isAllTodosCompleted: boolean;
  onCompleteAllChange: (isComplete: boolean) => void;
  onAddTodoTextChange: (text: string) => void;
}

class AddTodo extends Component<IAddTodoProps, any> {
  static propTypes = {
    isAllTodosCompleted: PropTypes.bool.isRequired,
    onCompleteAllChange: PropTypes.func.isRequired,
    onAddTodoTextChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      addTodoText: ""
    };
  }

  onAllCompletedChange = e => {
    this.props.onCompleteAllChange(e.target.checked);
  };

  onAddTodoTextChange = e => {
    this.setState({ addTodoText: e.target.value });
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.onAddTodoTextChange(this.state.addTodoText);
      this.setState({ addTodoText: "" });
    }
  };

  render() {
    const { isAllTodosCompleted } = this.props;
    const { addTodoText } = this.state;
    return (
      <div className="add-todo">
        <input type="checkbox" checked={isAllTodosCompleted} onChange={this.onAllCompletedChange} />
        <input type="text" value={addTodoText} onChange={this.onAddTodoTextChange} onKeyDown={this.onKeyDown} />
      </div>
    );
  }
}

export default AddTodo;
