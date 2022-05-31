import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Employee = props => (
    <tr>
        <td><img style={{width:"100%", height:"300px"}} src={props.employee.image}></img></td>
        <td>{props.employee.empID}</td>
        <td>{props.employee.firstName}</td>
        <td>{props.employee.lastName}</td>
        <td>{props.employee.email}</td>
        <td>{props.employee.empType}</td>
        <td>
            <Link to={"/update-employee-details/" + props.employee._id}> Update </Link> | <a href='#' onClick={() => { props.deleteEmployeeDetails(props.employee._id) }}> Delete </a>
        </td>
    </tr>
)

export default class EmployeeDetailsList extends Component {
    constructor(props) {
        super(props);

        this.deleteEmployeeDetails = this.deleteEmployeeDetails.bind(this);

        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employee/registration')
            .then(response => {
                this.setState({ employees: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteEmployeeDetails(id) {
        axios.delete('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employee/registration/' + id)
            .then(res => console.log(res.data));

        this.setState({
            employees: this.state.employees.filter(el => el._id !== id)
        })
    }

    employeeDetailsList() {
        return this.state.employees.map(currentemployeedetails => {
            return <Employee employee={currentemployeedetails} deleteEmployeeDetails={this.deleteEmployeeDetails} key={currentemployeedetails._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>All Employee Details</h3>

                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Profile photo</th>
                            <th>Staff ID</th>
                            <th>Employee first name</th>
                            <th>Employee last name</th>
                            <th>Employee email</th>
                            <th>Employee type</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.employeeDetailsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
