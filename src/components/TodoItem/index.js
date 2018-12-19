import React, { Component } from 'react'
import moment from 'moment';
import Input from '../Input'
import validateDueDate from '../../helper'

export default class TodoItem extends Component {


    state = {
        title: "",
        description: "",
        dueDate: '',
        edit: false
    }

    // componentDidMount() {
    //     const date = moment(this.props.todo.dueDate).subtract(1, 'days').calendar();
    //     const today = moment().calendar()
    //     const date_time = moment(date).isSameOrAfter(today)
    //     if(date ) console.log(this.props.todo.dueDate, date,today, moment(date).from(today));

    // }

    delete = (id) => {
        // console.log(id);
        this.props.handleDelete(id)
    }

    EditTodo = (id) => {
        console.log("forceUpdate");
        this.setState({ edit: true })
        // this.props.handelUpdate(id)
    }

    // Handle Change function to save values in the state
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // Hanle Focus to chage the type of the input from text to date type
    handleFocus = (e) => {
        e.target.type = "date"
    }

    // Hanle Blur to chage the type of the input from date to text type
    handleBlur = (e) => {
        e.target.type = "text"
    }
    submitResult = (id) => {

        // get copy from the state
        let { title, description, dueDate } = this.state
        // console.log(title, description, dueDate);


        dueDate = validateDueDate(dueDate);
        if (!dueDate) {
            alert("Due date should have the format 'dd.MM.yyyy HH:mm'");
            return;
        }

        // send the updated state to the App component
        this.props.handleUpdate(id, title, description, dueDate)
    }

    //////////

    DoneTodo = (id, status) => {
        this.props.handleDone(id, status)
    }

    render() {
        const { todo } = this.props
        return (
            <li>
                {this.state.edit ?
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.submitResult(todo.id)
                        this.setState({ edit: false })
                    }}>
                        <Input
                            types="text"
                            defaultValues={todo.title}
                            placeholders={"Title"}
                            name={"title"}
                            handleChange={this.handleChange}
                            require={true} />

                        <Input
                            types={"text"}
                            defaultValues={todo.description}
                            placeholders={"description"}
                            name={"description"}
                            handleChange={this.handleChange}
                            require={true} />
                            
                            <Input types={"text"}
                            // handleFocus={this.handleFocus}
                            // handleBlur={this.handleBlur}
                            defaultValues={moment(todo.dueDate).format('DD.MM.YYYY HH:mm')}
                            placeholders={"Due Date: dd.MM.yyyy HH:mm"}
                            name={"dueDate"}
                            handleChange={this.handleChange}
                            require={true} />
                        
                        <button onClick={() => this.setState({ edit: false })} >Cancel</button>
                        <button type="submit" >save</button>
                    </form>
                    :
                    <div>
                        <div className='marker' style={this.props.background }></div>
                        <h2 style={!todo.status?{}:{ textDecoration: "line-through" }}>{todo.title}</h2>
                        <h5 style={!todo.status?{}:{ textDecoration: "line-through" }}>{todo.description}</h5>
                        <p style={!todo.status?{}:{ textDecoration: "line-through" }}>
                            {moment(todo.dueDate).format('DD.MM.YYYY HH:mm')} <br />
                            {moment(todo.dueDate).fromNow()}
                        </p>
                    </div>
                }

                <button onClick={() => this.delete(todo.id)}>Delete</button>

                <button onClick={() => this.EditTodo(todo.id)}>Edit</button>
                    <button onClick={() => this.DoneTodo(todo.id, todo.status)} >{todo.status?'Not done':'done'}</button>
            </li>
        )
    }
}
