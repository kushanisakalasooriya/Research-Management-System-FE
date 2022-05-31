import React, { Component } from 'react';
import axios from 'axios';

export default class AddStudentDetails extends Component {
    constructor(props){
        super(props);

        this.onChangeStudentID = this.onChangeStudentID.bind(this);
        this.onChangeStudentfirstName= this.onChangeStudentfirstName.bind(this);
        this.onChangeStudentlastName= this.onChangeStudentlastName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangeStudentPassword= this.onChangeStudentPassword.bind(this);
        this.onChangeStudentGrpID= this.onChangeStudentGrpID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            students:[],
            stdID: '',
            studentfirstName: '',
            studentlastName: '',
            studentEmail: '',
            studentPassword: '',
            studentGrpID: ''
        }
    }

    componentDidMount(){

    }


    onChangeStudentID(e) {
        this.setState({
            stdID: e.target.value
        })
    }

    onChangeStudentfirstName(e) {
        this.setState({
            studentfirstName: e.target.value
        })
    }

    onChangeStudentlastName(e) {
        this.setState({
            studentlastName: e.target.value
        })
    }

    onChangeStudentEmail(e) {
        this.setState({
            studentEmail: e.target.value
        })
    }

    onChangeStudentPassword(e) {
        this.setState({
            studentPassword: e.target.value
        })
    }

    onChangeStudentGrpID(e) {
        this.setState({
            studentGrpID: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const studentDetails = {
            stdID: this.state.stdID,
            studentfirstName:this.state.studentfirstName,
            studentlastName:this.state.studentlastName,
            studentEmail:this.state.studentEmail,
            studentPassword:this.state.studentPassword,
            studentGrpID:this.state.studentGrpID
        }

        console.log(studentDetails);
    
        axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/registration/', studentDetails)
          .then(res => alert(res.data));
    
        this.setState({
            stdID:'',
            studentfirstName: '',
            studentlastName:'',
            studentEmail: '',
            studentPassword:'',
            studentGrpID: ''
        })
        this.props.history.push('/student-details');
      }
    



  render() {
    return (
        <div>
        <h3>Add Student Details</h3>
        <br/>
        <form onSubmit={this.onSubmit}>

          <div className="form-group"> 
            <label>Student ID: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.stdID}
                onChange={this.onChangeStudentID}
                />
          </div>

          <div className="form-group"> 
            <label>Student first Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.studentfirstName}
                onChange={this.onChangeStudentfirstName}
                />
          </div>

          <div className="form-group"> 
            <label>Student last Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.studentlastName}
                onChange={this.onChangeStudentlastName}
                />
          </div>

          <div className="form-group"> 
            <label>Student Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.studentEmail}
                onChange={this.onChangeStudentEmail}
                />
          </div>

          <div className="form-group"> 
            <label>Student Group No: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.studentGrpID}
                onChange={this.onChangeStudentGrpID}
                />
          </div>

          <div className="form-group"> 
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.studentPassword}
                onChange={this.onChangeStudentPassword}
                />
          </div>

          {/* <div className="form-group"> 
            <label>Re-enter Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div> */}

          

          <div className="form-group">
            <input type="submit" value="Submit Details" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
