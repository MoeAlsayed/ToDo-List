import React, { Component } from 'react'
import TodoItem from '../TodoItem'


export default class TodoList extends Component {



    render() {
        // get the todos from App.js as props 
        const { todos } = this.props;

        return (
            <ul>
                {/* chack if we have data, create todos, if not show no thing todo yet */}
                {todos.length > 0 ? todos.map(todo => {
                    return <TodoItem key={todo.id} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} handleDone={this.props.handleDone} todo={todo} />
                }) : <div>
                        <h4>Nothing to do yet.</h4>
                    </div>}
            </ul>
        )
    }
}

