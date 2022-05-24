import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Employee = props => (
    <tr>
        <td>{props.employee.staffID}</td>
        <td>{props.employee.employeefirstName}</td>
        <td>{props.employee.employeelastName}</td>
        <td>{props.employee.employeeEmail}</td>
        <td>{props.employee.employeePassword}</td>
        <td>{props.employee.employeeType}</td>
        <td>
            <Link to={"/update-employee-details/" + props.employee._id}> Update </Link> | <a href='#' onClick={() => {props.deleteEmployeeDetails(props.employee._id)}}> Delete </a>
        </td>
    </tr>
)

export default class EmployeeDetailsList extends Component {
    constructor(props){
        super(props);

        this.deleteEmployeeDetails = this.deleteEmployeeDetails.bind(this);

        this.state = {
            employees:[]
        }
}

componentDidMount(){
    axios.get('http://localhost:5000/employeeDetails')
    .then(response => {
        this.setState({ employees: response.data})
    })
    .catch((error) => {
        console.log(error);
    })
}

deleteEmployeeDetails(id) {
    axios.delete('http://localhost:5000/employeeDetails/' + id)
    .then(res => console.log(res.data));

    this.setState({
        employees: this.state.employees.filter(el => el._id !== id)
    })
}

employeeDetailsList() {
    return this.state.employees.map(currentemployeedetails => {
        return <Employee employee = {currentemployeedetails} deleteEmployeeDetails={this.deleteEmployeeDetails} key={currentemployeedetails._id}/>;
    })
}

  render() {
    return (
      <div>
          <h3>All Employee Details</h3>

            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Staff ID</th>
                        <th>Employee first name</th>
                        <th>Employee last name</th>
                        <th>Employee email</th>
                        <th>Employee Password</th>
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
