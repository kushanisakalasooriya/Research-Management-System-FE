import React, { Component } from "react";
import axios from "axios";
// import { response } from 'express';

class Message extends React.Component {
  render() {
    return (
      <p style={{ color: "red" }}>
        Seems you are currently not belongs to any group.First, Submit a group
        according to register the research topic.
      </p>
    );
  }
}

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
      loggedUser:'',
    };
  }

  componentDidMount() {
    //get the user details from the session
    this.setState({
        loggedUser: JSON.parse(sessionStorage.getItem("loggeduser")),
        groupname: sessionStorage.getItem("group")
    })

    axios
      .get("http://localhost:5000/groups/")
      .then((response) => {
        this.setState({ groups: response.data });
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
        <h3> Register the research Topic</h3>
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
            />
          </div>

          <div>
            <select
              name="supervisor"
              id="supervisor"
              onChange={this.onChangeSupervisor}
            >
              <option value="" selected>
                Choose
              </option>
              <option value="Janith">Janith - IOT</option>
              <option value="Sahan">Sahan - AI </option>
              <option value="Poorna">Poorna - AI</option>
              <option value="Eranda">Eranda - WEB</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Submit topic"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
