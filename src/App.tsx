import React, { Component } from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import UserContext from './contexts/UserContext'

class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        {
          user: {
            id: 1,
            username: 'Vacho'
          }
        }
      )
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        <UserContext.Provider value={this.state.user}>
          <TodoApp />
        </UserContext.Provider>

      </div >
    );
  }
}

export default App;
