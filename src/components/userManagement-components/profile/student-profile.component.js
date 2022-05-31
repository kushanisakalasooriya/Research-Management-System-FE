import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

export default class StudentProfile extends Component {
    constructor(props) {
        super(props);

        this.deleteStudentDetails = this.deleteStudentDetails.bind(this);
        this.editStudentDetails = this.editStudentDetails.bind(this);
        this.stuentLogout = this.stuentLogout.bind(this);

        this.state = {
            // Employees: [],
            stdID: '',
            firstName: '',
            lastName: '',
            image: '',


        }
    }


    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/registration/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    stdID: response.data.stdID,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    password: response.data.password,
                    image: response.data.image
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            emp: ['Supervisor', 'co-Supervisor', 'staff'],
            employeeType: 'Supervisor'
        });
    }

    stuentLogout() {
        this.props.history.push('/student-registration');
    }

    editStudentDetails() {
        this.props.history.push(`/update-student-details/${this.props.match.params.id}`);
    }

    deleteStudentDetails(id) {

        axios.delete('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/registration/' + this.props.match.params.id)
            .then(res => console.log(res.data));
        alert('Employee details are deleted.');
        this.props.history.push('/student-registration');

    }



    render() {
        return (
            <div>
                <div style={{ marginLeft:"-200px"}}  className={styles.container}>
                    <div>                      
                        <br />
                        <form className={styles.form_container} onSubmit={this.editStudentDetails}>
                        <h3>Profile</h3>
                            <div className="form-group">
                                <label>Profile photo:</label>
                                <div><img style={{ width: "200px", height: "200px" }} src={this.state.image}></img></div>
                            </div>

                            <div className="form-group">
                                <label>Student ID: </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.stdID}
                                />
                            </div>

                            <div className="form-group">
                                <label>Student first Name: </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.firstName}
                                />
                            </div>

                            <div className="form-group">
                                <label>Student last Name: </label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.lastName}
                                />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Update" className="btn btn-primary" />
                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" type='button' onClick={this.deleteStudentDetails}> Delete</button>
                                <button style={{ marginLeft: "10px" }} className="btn btn-success" type='button' onClick={this.stuentLogout}> LogOut</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

