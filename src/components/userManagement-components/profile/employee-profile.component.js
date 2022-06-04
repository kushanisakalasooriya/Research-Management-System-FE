import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

const empdetails = window.sessionStorage.getItem("loggeduser")

export default class EmployeeProfile extends Component {
    constructor(props) {
        super(props);

        this.deleteEmployeeDetails = this.deleteEmployeeDetails.bind(this);
        this.editEmployeeDetails = this.editEmployeeDetails.bind(this);
        this.employeeLogout = this.employeeLogout.bind(this);

        this.state = {
            empID: '',
            firstName: '',
            lastName: '',
            empType: '',
            image: '',
            researchField: ''

        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/employee/registration/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    empID: response.data.empID,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    password: response.data.password,
                    empType: response.data.empType,
                    image: response.data.image,
                    researchField: response.data.researchField
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            emp: ['Supervisor', 'Co-Supervisor', 'Panel Member'],
            employeeType: 'Supervisor'
        });
    }

    employeeLogout() {
        this.props.history.push('/employee-registration');
    }

    editEmployeeDetails() {
        //if empType is Panel Member
        if (this.state.empType === 'Panel Member') {
            this.props.history.push(`/update-panelMember-details/${this.props.match.params.id}`);
        }
        else {
            this.props.history.push(`/update-employee-details/${this.props.match.params.id}`);
        }

    }

    deleteEmployeeDetails(id) {

        const confirmBox = window.confirm(
            "Are you sure want to delete your account?"
        )
        if (confirmBox === true) {
            axios.delete('http://localhost:5000/employee/registration/' + this.props.match.params.id)
                .then(res => console.log(res.data));
            alert('Your account delete successfully!');
            this.props.history.push('/employee-registration');
        }

    }

    render() {
        return (
            <div>
                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h2>  Employee Profile </h2> </div>

                <div style={{ marginLeft: "-200px" }} className={styles.emp_container}>

                    <br />
                    <form className={styles.emp_form_container} onSubmit={this.editEmployeeDetails} >
                        <div class="row">
                            <div class="col" style={{ marginTop: "30px" }}>
                                <div className="form-group">
                                    <h3>{this.state.firstName} {this.state.lastName}</h3>
                                    <div><img style={{ width: "220px", height: "220px" }} src={this.state.image}></img></div>
                                </div>
                            </div>
                            <div class="col" style={{ marginTop: "50px", marginLeft: "30px" }}>
                                <div className="form-group">
                                    <label>Employee Type: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.empType}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Staff ID: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.empID}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Research Field: </label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.researchField}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Update" className="btn btn-primary" />
                            <button style={{ marginLeft: "10px" }} className="btn btn-danger" type='button' onClick={this.deleteEmployeeDetails}> Delete</button>
                            <button style={{ marginLeft: "10px" }} className="btn btn-danger" type='button' onClick={this.employeeLogout}> Logout</button>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

