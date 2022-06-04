import React, { Component } from "react";
import axios from "axios";
// import { response } from 'express';

export default class regResearchTopic extends Component {
  constructor(props) {
    super(props);

    this.onChangeResearchTopic = this.onChangeResearchTopic.bind(this);
    this.onChangeSupervisor = this.onChangeSupervisor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      groupname: "",
      topic: "",
      supervisor: "",
      status: "",
      groups: [],
      stdid: "Thar",
      flag: "0",
      loggedUser: "",
      employees: [],
      supervisors: []
    };
  }

  componentDidMount() {
    //get the user details from the session
    this.setState({
      loggedUser: JSON.parse(sessionStorage.getItem("loggeduser")),
      groupname: sessionStorage.getItem("group"),
    });

    //get all groups
    axios
      .get("http://localhost:5000/groups/")
      .then((response) => {
        this.setState({ groups: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    //get employees and filter supervisors
    axios
      .get("http://localhost:5000/employee/registration/")
      .then((response) => {
        this.setState({ employees: response.data });
        for (var i = 0; i < this.state.employees.length; i++) {
          // console.log('i ', this.state.employees[i].empType)
          if (this.state.employees[i].empType === 'Supervisor') {
            this.state.supervisors.push(this.state.employees[i].firstName +
              ' ' + this.state.employees[i].lastName +
              ' - ' + this.state.employees[i].researchField);
          }
        }
        console.log('s', this.state.supervisors);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log('groups1', this.state.groups)
    if (this.state.flag === "1") {
      console.log("mount");
    }
  }

  onChangeResearchTopic(e) {
    this.setState({
      topic: e.target.value,
    });
  }

  onChangeSupervisor(e) {
    this.setState({
      supervisor: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateTopic = {
      groupname: this.state.groupname,
      topic: this.state.topic,
    };
    console.log("Update Topic = > ", updateTopic);

    axios
      .post("http://localhost:5000/groups/update/topic", updateTopic)
      .then((res) => console.log(res.data));

    const updateSupervisor = {
      groupname: this.state.groupname,
      supervisor: this.state.supervisor,
    };
    console.log("Update Supervisor = > ", updateSupervisor);

    axios
      .post("http://localhost:5000/groups/update/supervisor", updateSupervisor)
      .then((res) => console.log(res.data));

    this.setState({
      topic: "",
      supervisor: "",
    });
  }

  render() {
    // for (var i = 0; i < this.state.groups.length; i++) {
    //   // console.log('i ', this.state.groups[i].status)
    //   if (this.state.groups[i].groupleader === this.state.stdid) {
    //     if (
    //       this.state.groups[i].status === "pending" ||
    //       this.state.groups[i].status === "reject"
    //     ) {
    //       // this.state.mygroup.push(this.state.groups[i]);
    //       this.state.flag = "1";
    //     }
    //   }
    // }

    // console.log("flag =>", this.state.flag);
    // console.log(this.state.stdid)
    // console.log('hi', this.state.groups[0]._id)
    // console.log('hi1', this.state.mygroup[0])

    // let component, isDisabled;
    // if (this.state.flag === "1") {
    //   console.log("Done");
    //   component = <Message />;
    //   isDisabled = true;
    // }

    return (
      <div>
        <div className="container" style={{ width: '800px' }}>
          <div className="row justify-content-center">
            <div className="col-3 col-md-auto">
              <h3 style={{
                width: '100%',
                marginBottom: '40px'
              }}> Register Research Topic</h3>
              {/* {component} */}

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label> Research Topic : </label>
                  <input
                    type="text"
                    //   disabled={isDisabled}
                    required
                    className="form-control"
                    value={this.state.topic}
                    onChange={this.onChangeResearchTopic}
                    style={{
                      marginBottom: '20px'
                    }}
                  />
                </div>

                <div>
                  <label> Supervisor : </label>
                  <select
                    className="browser-default custom-select"
                    aria-label="Default select example"
                    name="supervisor"
                    id="supervisor"
                    onChange={this.onChangeSupervisor}
                    style={{
                      marginBottom: '20px'
                    }}
                  ><option value="" selected>
                      Choose
                    </option>

                    {
                      this.state.supervisors.map(function (superv) {
                        return <option
                          key={superv}
                          value={superv}>{superv}
                        </option>;
                      })
                    }
                    {/* <option value="" selected>
                Choose
              </option> */}
                    {/* <option value="Janith">Janith - IOT</option>
              <option value="Sahan">Sahan - AI </option>
              <option value="Poorna">Poorna - AI</option>
              <option value="Eranda">Eranda - WEB</option> */}
                  </select>
                </div>

                <div className="form-group text-center">
                  <input
                    class="btn btn-outline-dark"
                    type="submit"
                    value="Submit topic"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
