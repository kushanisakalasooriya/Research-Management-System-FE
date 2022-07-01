import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CoSupervisorEditGroups extends Component {
    constructor(props) {
        super(props);

        this.onChangeCsState = this.onChangeCsState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            topic: '',
            groupName: '',
            state: '',
            csState: '',
        }
    }

    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/supervisor/topic/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    topic: response.data.topic,
                    groupName: response.data.groupName,
                    state: response.data.state,
                    csState: response.data.csState,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeCsState(e) {
        this.setState({
            csState: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const researchTopics = {
            topic: this.state.topic,
            groupName: this.state.groupName,
            state: this.state.state,
            csState: this.state.csState,
        }

        console.log(researchTopics);

        axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/supervisor/topic/update/' + this.props.match.params.id, researchTopics)
            .then(res => console.log(res.data));

        alert("Successfully Edited !")
        window.location = '/co-supervisor-topics';
    }

    render() {
        return (
            <div>
                <center>
                    <hr></hr>
                    <h3>Edit Topic State</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Topic : </label> {this.state.topic}
                        </div>
                        <div className="form-group">
                            <label>Group Name : </label> {this.state.groupName}
                        </div>
                        <div className="form-group">
                            <label>Supervisor State : </label> {this.state.state}
                        </div>
                        <div className="form-group">
                            <label>Co Supervisor State : </label> {this.state.csState}
                        </div>

                        <div>
                            <select name="state" id="state"
                                onChange={this.onChangeCsState}>
                                <option value="" selected>Choose</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Edit topic state" className="btn btn-primary" />
                        </div>
                    </form>

                </center>
            </div>
        )
    }
}