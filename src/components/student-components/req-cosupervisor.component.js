import React, { Component } from "react";
import axios from "axios";

export default class reqCoSupervisor extends Component {
  constructor(props) {
    super(props);

    this.onChangeCoSupervisor = this.onChangeCoSupervisor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      groupname: "",
      cosupervisor: "",
      groups: [],
      loggedUser: [],
      employees: [],
      supervisors: [],
    };
  }

  componentDidMount() {
    this.setState({
      loggedUser: JSON.parse(sessionStorage.getItem("loggeduser")),
      groupname: sessionStorage.getItem("group"),
    });

    //get employees and filter cosupervisors
    axios
      .get("http://localhost:5000/employee/registration/")
      .then((response) => {
        this.setState({ employees: response.data });
        for (var i = 0; i < this.state.employees.length; i++) {
          // console.log('i ', this.state.employees[i].empType)
          if (this.state.employees[i].empType === "Co-Supervisor") {
            this.state.supervisors.push(
              this.state.employees[i].firstName +
                " " +
                this.state.employees[i].lastName
            );
          }
        }
        // console.log('s', this.state.supervisors);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/groups/")
      .then((response) => {
        this.setState({ groups: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeCoSupervisor(e) {
    this.setState({
      cosupervisor: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const cosupervisor = {
      groupname: this.state.groupname,
      cosupervisor: this.state.cosupervisor,
    };
    console.log(cosupervisor);

    axios
      .post("http://localhost:5000/groups/update/cosupervisor", cosupervisor)
      .then((res) => console.log(res.data));

    this.setState({
      groupname: "",
      cosupervisor: "",
    });
  }

  render() {
    return (
      <div>
        <h4> Request a cosupervisor </h4>
        <form onSubmit={this.onSubmit}>
          <div>
            <select
              className="browser-default custom-select"
              name="cosupervisor"
              id="cosupervisor"
              onChange={this.onChangeCoSupervisor}
              style={{
                width: "25%",
                marginBottom: "20px",
              }}
            >
              <option value="" selected>
                Choose
              </option>
              {this.state.supervisors.map(function (superv) {
                return (
                  <option key={superv} value={superv}>
                    {superv}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
