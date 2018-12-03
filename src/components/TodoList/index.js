import React, { Component } from 'react'
import Input from '../Input';



export default class TodoList extends Component {

    delete = (id) => {
        // console.log(id);


    }

    render() {
        // get the todos from App.js as props 
        const { todos } = this.props;

        return (
            <div className='todo-list'>
                <ul>
                    {/* chack if we have data, create todos, if not show no thing todo yet */}
                    {todos.length > 0 ? todos.map(todo => {
                        return <li key={todo.id}>
                            <h2>{todo.title}</h2>
                            <p>{todo.description}</p>
                            <p>{todo.dueDate}</p>
                            <button onClick={() => this.delete(todo.id)}>delete</button>
                            <button>update todo</button>
                            <button>done</button>
                        </li>
                    }) : <div>
                            <h4>Nothing to do yet.</h4>
                        </div>}
                </ul>
            </div>
        )
    }
}

