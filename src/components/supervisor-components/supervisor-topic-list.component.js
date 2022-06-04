import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './supervisor-home-mod.css';

const ResearchTopic = props => (
    <tr>
        <td>{props.researchTopic.topic}</td>
        <td>{props.researchTopic.groupName}</td>
        <td>{props.researchTopic.state} </td>
        <td><Link to={"/supervisor-topics/edit/" + props.researchTopic._id}>Change</Link>
        </td>

    </tr>
)

export default class SuperrvisorTopicList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            supervisorName: JSON.parse(sessionStorage.getItem("loggeduser")).firstName + " " +
                JSON.parse(sessionStorage.getItem("loggeduser")).lastName + " - " +
                JSON.parse(sessionStorage.getItem("loggeduser")).researchField,
            researchTopics: [],
            pendingTopics: [],
            stdGroup: [],
            theGroup: [],
        };
        console.log(JSON.parse(sessionStorage.getItem("loggeduser")));
        console.log('Supervisor Name', this.state.supervisorName);
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/groups')
            .then(response => {
                this.setState({ stdGroup: response.data })

                var i = 0;
                for (i = 0; i < this.state.stdGroup.length; i++) {
                    if (this.state.stdGroup[i].supervisor === this.state.supervisorName) {
                        this.state.theGroup.push(this.state.stdGroup[i].groupname);
                    }
                }
                this.setState({ topic: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        const topicGroup = {
            theGroup: this.state.theGroup
        }

        await axios.post('http://localhost:5000/supervisor/topic/researchTopics', topicGroup)
            .then(response => {
                this.setState({ researchTopics: response.data.group })

                var i = 0;
                for (i = 0; i < this.state.researchTopics.length; i++) {
                    if (this.state.researchTopics[i].state === "Pending" || this.state.researchTopics[i].state === "Accepted") {
                        this.state.pendingTopics.push(this.state.researchTopics[i]);
                    }
                }

                this.setState({ topic: response.data })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    topicList() {
        return this.state.pendingTopics.map(currenttopic => {
            return <ResearchTopic researchTopic={currenttopic} />;
        })
    }

    render() {
        return (
            <div>
                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h3> Research topics</h3> </div>

                <table className="table table-bordered table-light" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                    <thead className="table-dark">
                        <tr>
                            <th>Topic</th>
                            <th>Group Name</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.topicList()}
                    </tbody>
                </table>
            </div>
        )
    }
}