import React, { Component } from "react";
import axios from "axios";

export default class AdminUpdateEmployeeDetails extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmployeeID = this.onChangeEmployeeID.bind(this);
    this.onChangeEmployeefirstName = this.onChangeEmployeefirstName.bind(this);
    this.onChangeEmployeelastName = this.onChangeEmployeelastName.bind(this);
    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeePassword = this.onChangeEmployeePassword.bind(this);
    this.onChangeEmployeeType = this.onChangeEmployeeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      emp: [],
      employees: [],
      empID: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: "",
      empType: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employee/registration/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          empID: response.data.empID,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          password: response.data.password,
          empType: response.data.empType,
          image: response.data.image,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      emp: ["Supervisor", "co-Supervisor", "staff"],
      empType: "Supervisor",
    });
  }

  onChangeEmployeeID(e) {
    this.setState({
      empID: e.target.value,
    });
  }

  onChangeEmployeefirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeEmployeelastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeEmployeeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeEmployeePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmployeeType(e) {
    this.setState({
      empType: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const employeeDetails = {
      empID: this.state.empID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      empType: this.state.empType,
      image: this.state.image,
    };

    console.log(employeeDetails);

    axios
      .post(
        "https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employee/registration/update-employee/" +
          this.props.match.params.id,
        employeeDetails
      )
      .then((res) => alert(res.data));

    this.setState({
      empID: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      empType: "",
      image:""
    });
    this.props.history.push("/admin-all-employees");
  }

  render() {
    return (
      <div>
        <h3>Update Employee Details</h3>
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Employee Type: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.empType}
              onChange={this.onChangeEmployeeType}
            >
              {this.state.emp.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Staff ID: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.empID}
              onChange={this.onChangeEmployeeID}
            />
          </div>

          <div className="form-group">
            <label>Employee first Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangeEmployeefirstName}
            />
          </div>

          <div className="form-group">
            <label>Employee last Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangeEmployeelastName}
            />
          </div>

          <div className="form-group">
            <label>Employee Email: </label>
            <input
              type="text"
              required
              readOnly
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmployeeEmail}
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
