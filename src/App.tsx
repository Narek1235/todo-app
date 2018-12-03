import React, { Component } from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import UserContext from './contexts/UserContext'
import UserUpdateContext from './contexts/UserUpdateContext'

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

  updateUser = (user) => {
    this.setState(
      {
        user: {
          id: 1,
          username: 'Vacho'
        }
      }
    )
  }

  render() {
    return (
      <div className="App">
        <UserContext.Provider value={this.state.user}>
          <UserUpdateContext.Provider value={this.updateUser}>
            <TodoApp />
          </UserUpdateContext.Provider>
        </UserContext.Provider>

      </div >
    );
  }
}

export default App;
