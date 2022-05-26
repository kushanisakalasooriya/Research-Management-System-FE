import React, { Component } from 'react';
import axios from 'axios';

const empdetails = window.sessionStorage.getItem("loggeduser")

export default class EmployeeProfile extends Component {
    constructor(props) {
        super(props);

        this.deleteEmployeeDetails = this.deleteEmployeeDetails.bind(this);
        this.editEmployeeDetails = this.editEmployeeDetails.bind(this);
        this.employeeLogout = this.employeeLogout.bind(this);

        this.state = {
            // Employees: [],
            empID: '',
            firstName: '',
            lastName: '',
            empType: '',
            image: '',


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

    employeeLogout() {
        this.props.history.push('/employee-registration');      
    }

    editEmployeeDetails() {
        this.props.history.push(`/update-employee-details/${this.props.match.params.id}`);      
    }

    deleteEmployeeDetails(id) {
        
        axios.delete('http://localhost:5000/employee/registration/' + this.props.match.params.id)
            .then(res => console.log(res.data));
           alert('Employee details are deleted.');
           this.props.history.push('/employee-registration');

    }



    render() {
        return (
            <div>
                <h3>Profile</h3>
                <br />
                <form onSubmit={this.editEmployeeDetails}>

                    <div className="form-group">
                        <label>Profile photo:</label>
                        <div><img style={{ width: "100%", height: "300px" }} src={this.state.image}></img></div>
                    </div>

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
                        <label>Employee first Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.firstName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Employee last Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.lastName}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                        <button style={{ marginLeft: "10px" }} className="btn btn-danger" type='button' onClick={this.deleteEmployeeDetails}> Delete</button>
                        <button style={{ marginLeft: "10px" }} className="btn btn-danger" type='button' onClick={this.employeeLogout}> LogOut</button>
                        
                    </div>
                </form>


            </div>
        )
    }
}

