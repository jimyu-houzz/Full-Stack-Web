import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export  default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        // so react knows 'this' for each function
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // react lifecylce method, called right before anything is displayed on the page
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeUserName(e) {
        this.setState({
            // target is the textbox
            username: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
        console.log("typing")
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        // navigate back to root after submit
        window.location = '/';
        
    }


    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUserName}>
                        {
                            // map: do something for each element from array
                            this.state.users.map(function(user) {
                                // return options for drop down box
                                return  <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>    
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}