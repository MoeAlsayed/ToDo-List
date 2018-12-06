import React, {
    Component
} from 'react';
import Input from '../Input';


export default class TodoForm extends Component {

    // Forms state
    state = {
        id: null,
        title: "",
        description: "",
        dueDate: '',
        status: false
    };


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

    // Add Todo function to add new todo 
    addTodo = () => {
        const {
            title,
            description,
            dueDate,
            status
        } = this.state;

        // get data from localstorage to create an Id for the new todo
        let todos = localStorage.getItem("todo");

        if (!todos) {
            todos = [];
        } else {
            todos = JSON.parse(todos);
            // console.log(todos);

        }
        if (!title || !description || !dueDate) return

        // to avoid repeating id, get the last item id and increment it    
        const id = todos.length > 0 ? todos[todos.length - 1].id : 0;
        // create new todo
        const newTodo = {
            id: id + 1,
            title,
            description,
            dueDate,
            status
        }


        // call createTodos function and pass the new todo as a parameter
        this.props.createTodos(newTodo)
    }

    render() {
        return (<div className="container-form" >
            <h3 > Add todo </h3>
            <form onSubmit={
                e => {
                    e.preventDefault();
                    this.addTodo();
                    // to make the inputs empty 
                    this.setState({
                        title: "",
                        description: '',
                        dueDate: ''
                    });
                }
            }>
                <Input types={"text"}
                    values={this.state.title}
                    placeholders={"Title"}
                    name={"title"}
                    handleChange={this.handleChange}
                    require={true}
                />

                <
                    Input types={
                        "text"
                    }
                    values={
                        this.state.description
                    }
                    placeholders={
                        "description"
                    }
                    name={
                        "description"
                    }
                    handleChange={
                        this.handleChange
                    }
                    require={
                        true
                    }
                />

                <
                    Input types={
                        "text"
                    }
                    handleFocus={
                        this.handleFocus
                    }
                    handleBlur={
                        this.handleBlur
                    }
                    values={
                        this.state.dueDate
                    }
                    placeholders={
                        "Due Date"
                    }
                    name={
                        "dueDate"
                    }
                    handleChange={
                        this.handleChange
                    }
                    require={
                        true
                    }
                /> <
            button type="submit" > Add < /button> < /
            form > <
            /div>
                            )
                        }
}