import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

class App extends Component {
  state = {
    todos: []
  }

  // to get the data from local Storge 
  componentDidMount() {
    
    // get the old todos from localstorage
    const previousTodo = localStorage.getItem("todo")

    // if no data create one as array
    if (!previousTodo) {
        localStorage.setItem("todo", [])
    }
    else {
        this.setState({todos:JSON.parse(previousTodo)})
    }
  }
  
  updateTodos = (todos) => {
    // get the todos from the state 
    const todoslist = this.state.todos;

    // add the new todo to the todos list 
    todoslist.push(todos);
    
    // set the new todos to the localstorage as a string
    localStorage.setItem("todo", JSON.stringify(todoslist))
    this.setState({todos: todoslist})
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="App">
        <div className="header">To Do List</div>
        <TodoForm updateTodos={this.updateTodos} />
        <TodoList todos={todos}/>
      </div>
    );
  }
}

export default App;
