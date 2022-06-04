import React, { Component } from 'react';
import axios from 'axios';
export default class SupervisorEditTopics extends Component {
    constructor(props) {
        super(props);

        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeGroupName = this.onChangeGroupName.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            topic: '',
            groupName: '',
            state: '',
            csState: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/supervisor/topic/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    topic: response.data.topic,
                    groupName: response.data.groupName,
                    state: response.data.state
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTopic(e) {
        this.setState({
            topic: e.target.value
        })
    }

    onChangeGroupName(e) {
        this.setState({
            groupName: e.target.value
        })
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const researchTopics = {
            topic: this.state.topic,
            groupName: this.state.groupName,
            state: this.state.state,
            csState: 'Pending',
        }

        console.log(researchTopics);

        axios.post('http://localhost:5000/supervisor/topic/update/' + this.props.match.params.id, researchTopics)
            .then(res => console.log(res.data));

        alert("Successfully Edited !")
        window.location = '/supervisor-topics';
    }

    render() {
        return (
            <div>
                <center>
                    <hr></hr>
                    <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h3> Accept Topic </h3> </div>
                    <form onSubmit={this.onSubmit}>
                        {/* <div className="form-group">
                            <label >Topic : </label> {this.state.topic}
                        </div>
                        <div className="form-group">
                            <label>Group Name : </label> {this.state.groupName}
                        </div> */}
                        <div className="form-group">
                            <label>State : </label> {this.state.state}
                        </div>

                        <div>
                            <select name="state" id="state"
                                onChange={this.onChangeState}>
                                <option value="Pending" selected>Pending</option>
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