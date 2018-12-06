import React, {
  Component
} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

class App extends Component {
  state = {
    todos: [],
    subTodos: [],
    noMoreTodos: false
  }

  // to get the data from local Storge 
  componentDidMount() {

    // get the old todos from localstorage
    const previousTodo = localStorage.getItem("todo")

    // if no data create one as array
    if (!previousTodo) {
      localStorage.setItem("todo", [])
    } else {
      const todos = JSON.parse(previousTodo)
      this.setState({
        todos,
        subTodos: todos.slice(0, 5)
      })

    }
  }

  showMore = () => {
    const { todos } = this.state;
    const todosLength = this.state.subTodos.length;
    const moreTodos = todos.slice(0, todosLength + 5);

    this.setState({
      subTodos: moreTodos
    })

    // send message when no more todos
    if (todosLength === moreTodos.length) {
      console.log(todos.slice(0, todosLength + 5));
      this.setState({
        noMoreTodos: true
      })
    }
  }

  createTodos = (todos) => {
    // get the todos from the state 
    const todoslist = this.state.todos;
    const subTodosList = this.state.subTodos;
    // add the new todo to the todos list 
    todoslist.push(todos);

    // set the new todos to the localstorage as a string
    localStorage.setItem("todo", JSON.stringify(todoslist))
    // if (subTodosList.length < 5) {
    //   const subTodosList = todoslist.slice(0, 5)
    // }

    this.setState({
      todos: todoslist, subTodos: subTodosList.length < 5 ? todoslist.slice(0, 5) : subTodosList
    })
    this.showMore()
  }

  handleDelete = (id) => {
    console.log(id);

    // get copy  from the data (the state)
    const {
      todos
    } = this.state

    // filter todos array and return items which has not same deleted element id 
    const filterTodo = todos.filter((todo) => {
      return todo.id != id

    })
    // set the new todos (filterTodo) in the state
    this.setState({
      todos: filterTodo, subTodos: filterTodo
    })

    // set the new todos (filterTodo) to the localstorage
    localStorage.setItem("todo", JSON.stringify(filterTodo))

  }

  handleUpdate = (id, title, desc, date) => {

    // get the data from the state (copy)
    const {
      todos
    } = this.state
    // console.log(id, title, desc, date);

    // get the item from the state has a same id 
    const updatedTodos = todos.map((todo) => {
      if (todo.id == id) {
        // console.log(todo);


        todo.title = title || todo.title;
        todo.description = desc || todo.description;
        todo.dueDate = date || todo.dueDate;
        // console.log(todo);
      }
      return todo

    })
    // console.log(updatedTodos);
    this.setState({ todos: updatedTodos })
    localStorage.setItem("todo", JSON.stringify(updatedTodos))
  }

  /////////////////////


  handleDone = (id, status) => {
    console.log(id, status);
    const { todos } = this.state;

    const updatedTodos = todos.map((todo) => {
      if (todo.id == id) {
        todo.status = !status
      }
      return todo
    })
    // console.log(updatedTodos);

    // send the changes to the state
    this.setState({ todos: updatedTodos })

    // send the changes to the storage
    localStorage.setItem("todo", JSON.stringify(updatedTodos))

  }

  render() {
    const {
      todos, subTodos, noMoreTodos
    } = this.state;
    return (<div className="App" >
      {noMoreTodos ? <div className="noMoreTodos"><span>No More Todos Ya 7ayawan</span><button onClick={() => this.setState({ noMoreTodos: false })}>OK</button></div> : ""}
      <TodoForm createTodos={
        this.createTodos
      }
      /> <TodoList todos={subTodos}
        handleDelete={
          this.handleDelete
        }
        handleUpdate={
          this.handleUpdate
        }
        handleDone={this.handleDone}
      />
      <button onClick={this.showMore}>More</button>
    </div>
    );
  }
}

export default App;