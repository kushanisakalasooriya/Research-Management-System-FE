import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class SupervisorEditStdGroups extends Component {
    constructor(props) {
        super(props);

        // this.onChangeGroupName = this.onChangeGroupName.bind(this);
        // this.onChangeGroupLeader = this.onChangeGroupLeader.bind(this);
        // this.onChangeMember02 = this.onChangeMember02.bind(this);
        // this.onChangeMember03 = this.onChangeMember03.bind(this);
        // this.onChangeMember04 = this.onChangeMember04.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            groupname: '',
            groupleader: '',
            member02: '',
            member03: '',
            member04: '',
            status: ''
        }
    }

    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    groupname: response.data.groupname,
                    groupleader: response.data.groupleader,
                    member02: response.data.member02,
                    member03: response.data.member03,
                    member04: response.data.member04,
                    status: response.data.status
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // onChangeGroupName(e) {
    //     this.setState({
    //         topic: e.target.value
    //     })
    // }

    // onChangeGroupLeader(e) {
    //     this.setState({
    //         groupName: e.target.value
    //     })
    // }

    // onChangeMember02(e) {
    //     this.setState({
    //         member02: e.target.value
    //     })
    // }

    // onChangeMember03(e) {
    //     this.setState({
    //         member03: e.target.value
    //     })
    // }

    // onChangeMember04(e) {
    //     this.setState({
    //         member04: e.target.value
    //     })
    // }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const groups = {
            groupname: this.state.groupname,
            groupleader: this.state.groupleader,
            member02: this.state.member02,
            member03: this.state.member03,
            member04: this.state.member04,
            status: this.state.status
        }

        console.log(groups);

        axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/update/' + this.props.match.params.id, groups)
            .then(res => console.log(res.data));

        alert("Successfully Updated !")
        window.location = '/supervisor-std-groups';
    }

    render() {
        return (
            <div>
                <center>
                    <hr></hr>
                    <h3>Edit Students Group State</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Group Name : </label> {this.state.groupname}
                        </div>
                        <div className="form-group">
                            <label>Group Leader : </label> {this.state.groupleader}
                        </div>
                        <div className="form-group">
                            <label>Member 02 : </label> {this.state.member02}
                        </div>
                        <div className="form-group">
                            <label>Member 03 : </label> {this.state.member03}
                        </div>
                        <div className="form-group">
                            <label>Member 04 : </label> {this.state.member04}
                        </div>
                        <div className="form-group">
                            <label>Group Status : </label> {this.state.status}
                        </div>

                        <div>
                            <select name="status" id="status"
                                onChange={this.onChangeStatus}>
                                <option value="" selected>Choose</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Edit Group status" className="btn btn-primary" />
                        </div>
                    </form>

                </center>
            </div>
        )
    }
}