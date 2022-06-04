import React, { Component } from "react";
import axios from "axios";

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.onChangeGroupLeader = this.onChangeGroupLeader.bind(this);
    this.onChangemember02 = this.onChangemember02.bind(this);
    this.onChangemember03 = this.onChangemember03.bind(this);
    this.onChangemember04 = this.onChangemember04.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      groupname: "",
      groupleader: JSON.parse(sessionStorage.getItem("loggeduser")).stdID,
      member02: "",
      member03: "",
      member04: "",
      supervisor: "",
      cosupervisor: "",
      groupMembers: [],
      grouped: [],
      result1: "",
      result2: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/groups")
      .then((response) => {
        this.setState({ groupMembers: response.data });
        for (var i = 0; i < this.state.groupMembers.length; i++) {
          // console.log('i ', this.state.groups[i].status)
          this.state.grouped.push(this.state.groupMembers[i].groupleader);
          this.state.grouped.push(this.state.groupMembers[i].member02);
          this.state.grouped.push(this.state.groupMembers[i].member03);
          this.state.grouped.push(this.state.groupMembers[i].member04);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
             
  onChangeGroupName(e) {
    this.setState({
      groupname: e.target.value,
    });
  }

  onChangeGroupLeader(e) {
    this.setState({
      groupleader: e.target.value,
    });
  }

  onChangemember02(e) {
    this.setState({
      member02: e.target.value,
    });
  }

  onChangemember03(e) {
    this.setState({
      member03: e.target.value,
    });
  }

  onChangemember04(e) {
    this.setState({
      member04: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    if (this.state.grouped.includes(this.state.member02)) {
      alert(this.state.member02 + " is already registered for a group");
      this.setState({
        member02: "",
      });
    } else if (this.state.grouped.includes(this.state.member03)) {
      alert(this.state.member03 + " is already registered for a group");
      this.setState({
        member03: "",
      });
    } else if (this.state.grouped.includes(this.state.member04)) {
      alert(this.state.member04 + " is already registered for a group");
      this.setState({
        member04: "",
      });
    } else {
      const group = {
        groupname: this.state.groupname,
        groupleader: this.state.groupleader,
        member02: this.state.member02,
        member03: this.state.member03,
        member04: this.state.member04,
        supervisor: "N/A",
        cosupervisor: "N/A",
        panelMember: "N/A",
        topic: "N/A",
        status: "Pending",
      };

      await axios.post("http://localhost:5000/groups/add", group).then((res) => {
        // console.log(res.data);
        if (res.status == 201) {
          this.setState({
            result1: "1",
          });
        } else {
          this.setState({
            result1: "0",
          });
        }
      });
            

            const topic = {
                groupname: this.state.groupname,
                topic: null,
                state: 'Pending'
            }

            await axios
        .post("http://localhost:5000/supervisor/topic/add", topic)
        .then((res) => {
          if (res.status == 201) {
            this.setState({
              result2: "1",
            });
          } else {
            this.setState({
              result2: "0",
            });
          }
        });

        if (this.state.result1 == "1" || this.state.result2 == "1") {
          alert("Error adding");
        } else {
          alert("Group created successfully");
          this.props.history.push("/student-home");
        }
          this.props.history.push('/student-home');
      }
      this.setState({
        groupname: '',
        groupleader: '',
        member02: '',
        member03: '',
        member04: '',
    })
}
    

  render() {
    return (
      <div>
        <h3>Submit Project Group </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Group Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.groupname}
              onChange={this.onChangeGroupName}
            />
          </div>
          <div className="form-group">
            <label>Group Leader (Student ID number) : </label>
            <input
              type="text"
              readOnly
              required
              className="form-control"
              value={this.state.groupleader}
              onChange={this.onChangeGroupLeader}
            />
          </div>
          <div className="form-group">
            <label> Member 02 (Student ID number) : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.member02}
              onChange={this.onChangemember02}
            />
          </div>
          <div className="form-group">
            <label>Member 03 (Student ID number) : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.member03}
              onChange={this.onChangemember03}
            />
          </div>
          <div className="form-group">
            <label>Member 04 (Student ID number) : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.member04}
              onChange={this.onChangemember04}
            />
          </div>

          <div className="form-group">
            <input
              style={{
                marginBottom: "20px",
                float: "right",
                width: "25%",
                color: "dark grey",
              }}
              type="submit"
              className="btn btn-outline-dark"
              value="Create Group"
            />
          </div>
        </form>
      </div>
    );
  }
}
