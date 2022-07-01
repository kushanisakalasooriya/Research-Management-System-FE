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
      .get("https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employee/registration/")
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
      .get("https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/")
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
      .post("https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/update/cosupervisor", cosupervisor)
      .then((res) => {
        // if ( res.status == '200'){
          // window.location='/student-home'
          alert('Success');
          // this.props.history.push('/student-home');
          // this.props.history.push('/student-home');
        // }else {
          alert('Error inserting')
        // }
      });

    this.setState({
      groupname: "",
      cosupervisor: "",
    });
    alert('Done')
    this.props.history.push('/student-home');
  }

  render() {
    return (
      <div>
        <hr />
        <h4 style={{ textAlign:'center'}}> Request a Co-Supervisor </h4>
        <hr />
        <br></br>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-3 col-md-auto">
              
            <form onSubmit={this.onSubmit}>
          <div>
            <select
              className="browser-default custom-select"
              name="cosupervisor"
              id="cosupervisor"
              onChange={this.onChangeCoSupervisor}
              style={{
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

          <div className="form-group text-center">
            <input 
            class="btn btn-outline-dark"
            style={{width:'300px'}} type="submit" value="Submit" />
          </div>
        </form>

            </div>
          </div>
        </div>

        
        
      </div>
    );
  }
}
