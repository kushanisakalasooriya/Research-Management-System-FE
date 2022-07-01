import React, { Component } from "react";
import axios from "axios";

export default class AllocatePanelMember extends Component {
  constructor(props) {
    super(props);

    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.onChangeGroupID = this.onChangeGroupID.bind(this);
    this.onChangePanelMember = this.onChangePanelMember.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      employees: [],
      panelMembers: [],
      groupID:this.props.match.params.id,
      panelMember: '',
      groupName: ''
    };
  }

  async componentDidMount() {
    await axios
      .get(`https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/${this.state.groupID}`)
      .then((response) => {
          this.setState({
            groupName : response.data.groupname
          });
          console.log('groupName : ',this.state.groupName);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get("https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employee/registration")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            employees: response.data,
          });
          var i = 0;
          for (i = 0; i < this.state.employees.length; i++) {
            if (this.state.employees[i].empType === "panel member") {
              this.state.panelMembers.push(
                this.state.employees[i].firstName +
                  " " +
                  this.state.employees[i].lastName
              );
            }
          }
         this.forceUpdate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeGroupName(e) {
    this.setState({
      groupName: e.target.value,
    });
  }

  onChangeGroupID(e) {
    this.setState({
      groupID: e.target.value,
    });
  }

  onChangePanelMember(e) {
    this.setState({
      panelMember: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const group = {
      panelMember : this.state.panelMember
    };

    axios
      .post(`https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/addPanelMember/${this.state.groupID}`, group)
      .then((res) => console.log(res.data));

      this.props.history.push("/admin-group-list");
  }

  render() {
    return (
      <div>
        <h3>Allocate Panel Member - ADMIN</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Group Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.groupName}
              onChange={this.onChangeGroupName}
              />
        </div>
        <div className="form-group"> 
          <label>Group ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.groupID}
              onChange={this.onChangeGroupID}
              />
        </div>
          <div className="form-group">
            <label>Panel Member: </label>
            <select
              required
              className="form-control"
              value={this.state.panelMember}
              onChange={this.onChangePanelMember}
            >
              {this.state.panelMembers.map(function (panelMembers) {
                return (
                  <option key={panelMembers} value={panelMembers}>
                    {panelMembers}
                  </option>
                );
              })}
            </select>
          </div>
          <input type="submit" value="Allocate Panel Member" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}
