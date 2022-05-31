import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

export default class UpdateStudentDetails extends Component {
    constructor(props) {
        super(props);

        this.onChangeStudentID = this.onChangeStudentID.bind(this);
        this.onChangeStudentfirstName = this.onChangeStudentfirstName.bind(this);
        this.onChangeStudentlastName = this.onChangeStudentlastName.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            students: [],
            stdID: '',
            firstName: '',
            lastName: '',
            password: '',
            image: '',
            email: ''
        }
    }

    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/registration/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    stdID: response.data.stdID,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    password: response.data.password,
                    image: response.data.image,
                    email: response.data.email
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeStudentID(e) {
        this.setState({
            stdID: e.target.value
        })
    }

    onChangeStudentfirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeStudentlastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const studentDetails = {
            stdID: this.state.stdID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            image: this.state.image,
            email: this.state.email
        }

        console.log(studentDetails);

        axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/registration/update-student/' + this.props.match.params.id, studentDetails)
            .then(res => alert(res.data));

        this.setState({
            stdID: '',
            firstName: '',
            lastName: '',
            password: '',
            image: '',
            email: ''
        })
        // this.props.history.push('/student-details');
        // this.props.history.push('/student-profile');
    }

    render() {
        return (
            <div style={{ marginLeft: "-200px" }} className={styles.container}>

                <br />
                <form className={styles.form_container} onSubmit={this.onSubmit}>
                    <h3>Update Student Details</h3>
                    <div className="form-group">
                        <label>Student ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.stdID}
                            onChange={this.onChangeStudentID}
                        />
                    </div>

                    <div className="form-group">
                        <label>Student first Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeStudentfirstName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Student last Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.onChangeStudentlastName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Image: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Details" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
