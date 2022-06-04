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
            stdID: '',
            firstName: '',
            lastName: '',
            image: '',


        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/student/registration/' + this.props.match.params.id)
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

        const confirmBox = window.confirm(
            "Are you sure want to delete your account?"
        )
        if (confirmBox === true) {
            axios.delete('http://localhost:5000/student/registration/' + this.props.match.params.id)
                .then(res => console.log(res.data));
            alert('Your account delete successfully!');
            this.props.history.push('/student-registration');
        }

    }

    render() {
        return (
            <div>

                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h2>  Student Profile </h2> </div>

                <div style={{ marginLeft: "-200px" }} className={styles.emp_container}>

                    <br />
                    <form className={styles.emp_form_container} onSubmit={this.editStudentDetails} >
                        <h3>{this.state.firstName} {this.state.lastName}</h3>
                        <div class="row">
                            <div class="col" style={{ marginTop: "30px" }}>
                                <div className="form-group">
                                    <div><img style={{ width: "220px", height: "220px" }} src={this.state.image} alt=""></img></div>
                                </div>
                            </div>
                            <div class="col" style={{ marginTop: "50px", marginLeft: "30px" }}>
                                <div className="form-group">
                                    <label>Student ID: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.stdID}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.email}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Update" className="btn btn-primary" />
                            <button style={{ marginLeft: "10px" }} className="btn btn-danger" type='button' onClick={this.deleteStudentDetails}> Delete</button>
                            <button style={{ marginLeft: "10px" }} className="btn btn-danger" type='button' onClick={this.stuentLogout}> Logout</button>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

