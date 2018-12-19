import React, { Component } from 'react'
import moment from 'moment'
import TodoItem from '../TodoItem'


export default class TodoList extends Component {
    checkToDoStatus = (todo) => {
        if(todo.status)return 'done'
        const now = moment();
        const diff=now.diff(new Date(todo.dueDate),'days');
        if (diff===-1 && !todo.status) {
            return 'semi-urgent'
        }
        if (diff >= 0 && !todo.status) {
            return 'urgent';
        }

        return 'done'
    }


    render() {
        // get the todos from App.js as props 
        const { todos } = this.props;
        let bg = {
            'semi-urgent': { background: 'yellow' },
            'urgent': { background: 'red' },
            'done': {background: 'green'}
        };
        return (
            <ul>
                {/* chack if we have data, create todos, if not show no thing todo yet */}
                {todos.length > 0 ? todos.map(todo => {
                    return <TodoItem background={bg[this.checkToDoStatus(todo)]} key={todo.id} handleDelete={this.props.handleDelete} handleUpdate={this.props.handleUpdate} handleDone={this.props.handleDone} todo={todo} />
                }) : <div>
                        <h4>Nothing to do yet.</h4>
                    </div>}
            </ul>
        )
    }
}

