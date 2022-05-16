import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (
    <tr>
        <td>{props.student.stdID}</td>
        <td>{props.student.studentfirstName}</td>
        <td>{props.student.studentlastName}</td>
        <td>{props.student.studentEmail}</td>
        <td>{props.student.studentPassword}</td>
        <td>{props.student.studentGrpID}</td>
        <td>
            <Link to={"/update-student-details/" + props.student._id}> Update </Link> | <a href='#' onClick={() => {props.deleteStudentDetails(props.student._id)}}> Delete </a>
        </td>
    </tr>
)

export default class StudentDetailsList extends Component {
    constructor(props){
        super(props);

        this.deleteStudentDetails = this.deleteStudentDetails.bind(this);

        this.state = {
            students:[]
        }
    }

componentDidMount(){
    axios.get('http://localhost:5000/studentDetails')
    .then(response => {
        this.setState({ students: response.data})
    })
    .catch((error) => {
        console.log(error);
    })
}

deleteStudentDetails(id) {
    axios.delete('http://localhost:5000/studentDetails/' + id)
    .then(res => console.log(res.data));

    this.setState({
        students: this.state.students.filter(el => el._id !== id)
    })
}

studentDetailsList() {
    return this.state.students.map(currentstudentdetails => {
        return <Student student = {currentstudentdetails} deleteStudentDetails={this.deleteStudentDetails} key={currentstudentdetails._id}/>;
    })
}

render() {
    return (
      <div>
          <h3>All Student Details</h3>

          <table className='table'>
              <thead className='thead-light'>
                  <tr>
                      <th>Student ID</th>
                      <th>Student first name</th>
                      <th>Student last name</th>
                      <th>Student email</th>
                      <th>Student Password</th>
                      <th>Student group id</th>
                      <th>Action</th>
                  </tr>
              </thead>

              <tbody>
                  {this.studentDetailsList()}
              </tbody>
          </table>
      </div>
    )
  }
}
