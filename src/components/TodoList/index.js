import React, { Component } from 'react'



export default class TodoList extends Component {

    delete = (id) => {
        // console.log(id);

    }

    render() {
        // get the todos from App.js as props 
        const { todos } = this.props;

        return (
                <ul>
                    {/* chack if we have data, create todos, if not show no thing todo yet */}
                    {todos.length > 0 ? todos.map(todo => {
                        return <li key={todo.id}>
                            <h2>{todo.title}</h2>
                            <h5>{todo.description}</h5>
                            <p> Due Date at: <span>{todo.dueDate}</span></p>

                            <button onClick={() => this.delete(todo.id)}>Delete</button>

                            <button>Edit</button>
                            <button>done</button>
                        </li>
                    }) : <div>
                            <h4>Nothing to do yet.</h4>
                        </div>}
                </ul>
        )
    }
}

