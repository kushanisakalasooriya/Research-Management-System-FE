import React, { Component } from "react";
import axios from "axios";

export default class AdminUpdateStudentDetails extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentID = this.onChangeStudentID.bind(this);
    this.onChangeStudentfirstName = this.onChangeStudentfirstName.bind(this);
    this.onChangeStudentlastName = this.onChangeStudentlastName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
    this.onChangeStudentGrpID = this.onChangeStudentGrpID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      students: [],
      stdID: "",
      studentfirstName: "",
      studentlastName: "",
      studentEmail: "",
      studentPassword: "",
      studentGrpID: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/studentDetails/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          stdID: response.data.stdID,
          studentfirstName: response.data.studentfirstName,
          studentlastName: response.data.studentlastName,
          studentEmail: response.data.studentEmail,
          studentPassword: response.data.studentPassword,
          studentGrpID: response.data.studentGrpID,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeStudentID(e) {
    this.setState({
      stdID: e.target.value,
    });
  }

  onChangeStudentfirstName(e) {
    this.setState({
      studentfirstName: e.target.value,
    });
  }

  onChangeStudentlastName(e) {
    this.setState({
      studentlastName: e.target.value,
    });
  }

  onChangeStudentEmail(e) {
    this.setState({
      studentEmail: e.target.value,
    });
  }

  onChangeStudentPassword(e) {
    this.setState({
      studentPassword: e.target.value,
    });
  }

  onChangeStudentGrpID(e) {
    this.setState({
      studentGrpID: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const studentDetails = {
      stdID: this.state.stdID,
      studentfirstName: this.state.studentfirstName,
      studentlastName: this.state.studentlastName,
      studentEmail: this.state.studentEmail,
      studentPassword: this.state.studentPassword,
      studentGrpID: this.state.studentGrpID,
    };

    console.log(studentDetails);

    axios
      .post(
        "https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/studentDetails/update-student/" +
          this.props.match.params.id,
        studentDetails
      )
      .then((res) => alert(res.data));

    this.setState({
      stdID: "",
      studentfirstName: "",
      studentlastName: "",
      studentEmail: "",
      studentPassword: "",
      studentGrpID: "",
    });
    this.props.history.push("/admin-all-students");
  }

  render() {
    return (
      <div>
        <h3>Update Student Details</h3>
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Student ID: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.stdID}
              onChange={this.onChangeStudentID}
            />
          </div>

          <div className="form-group">
            <label>Student first Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.studentfirstName}
              onChange={this.onChangeStudentfirstName}
            />
          </div>

          <div className="form-group">
            <label>Student last Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.studentlastName}
              onChange={this.onChangeStudentlastName}
            />
          </div>

          <div className="form-group">
            <label>Student Email: </label>
            <input
              type="text"
              required
              readOnly
              className="form-control"
              value={this.state.studentEmail}
              onChange={this.onChangeStudentEmail}
            />
          </div>

          <div className="form-group">
            <label>Student Group No: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.studentGrpID}
              onChange={this.onChangeStudentGrpID}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Details"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
