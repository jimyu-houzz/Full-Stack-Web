import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional React component, no state, componentDidMount functions, only recieving props
// TODO: change the <a> to a button.
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.diescription}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | 
                <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)


export  default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };
    }

    // fetch exercises before showing the page
    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteExercise(id){
        // axios sends DELETE request to the url
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => { console.log(response.data) });
    
        this.setState({
            // keep the exercise that is not the input _id
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}