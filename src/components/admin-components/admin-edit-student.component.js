import React, { Component } from "react";
import axios from "axios";

export default class AdminUpdateStudentDetails extends Component {
  constructor(props) {
    super(props);

    this.onChangeStudentID = this.onChangeStudentID.bind(this);
    this.onChangeStudentfirstName = this.onChangeStudentfirstName.bind(this);
    this.onChangeStudentlastName = this.onChangeStudentlastName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      students: [],
      stdID: "",
      firstName: "",
      lastName: "",
      password:"",
      image:"",
      email: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/registration/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          stdID: response.data.stdID,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          image:response.data.image,
          password:response.data.password
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
      firstName: e.target.value,
    });
  }

  onChangeStudentlastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeStudentEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }


  onSubmit(e) {
    e.preventDefault();

    const studentDetails = {
      stdID: this.state.stdID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password:this.state.password,
      image:this.state.image
    };

    console.log(studentDetails);

    axios
      .post(
        "http://localhost:5000/student/registration/update-student/" +
          this.props.match.params.id,
        studentDetails
      )
      .then((res) => alert(res.data));

    this.setState({
      stdID: "",
      firstName: "",
      lastName: "",
      email: "",
      image:"",
      password:""
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
              value={this.state.firstName}
              onChange={this.onChangeStudentfirstName}
            />
          </div>

          <div className="form-group">
            <label>Student last Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.lastName}
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
              value={this.state.email}
              onChange={this.onChangeStudentEmail}
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
