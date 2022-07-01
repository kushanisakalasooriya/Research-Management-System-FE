import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResearchTopic = props => (
    <tr>
        <td>{props.researchTopic.topic}</td>
        <td>{props.researchTopic.groupName}</td>
        <td>{props.researchTopic.state}</td>
        <td>{props.researchTopic.csState} <Link to={"/co-supervisor-topics/edit/" + props.researchTopic._id}>Change</Link>
        </td>
    </tr>
)

export default class CoSupervisorGroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            researchTopics: [],
            pendingTopics: [],
        };
    }

    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/supervisor/topic')
            .then(response => {
                this.setState({ researchTopics: response.data })

                var i = 0;
                for (i = 0; i < this.state.researchTopics.length; i++) {
                    if (this.state.researchTopics[i].state === "Accepted")
                        if (this.state.researchTopics[i].csState === "Accepted" ||
                            this.state.researchTopics[i].csState === "Pending") {
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
            return <ResearchTopic researchTopic={currenttopic} deleteTopic={this.deleteTopic} key={currenttopic._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Tpoics</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Topic</th>
                            <th>Group Name</th>
                            <th>Supervisor State</th>
                            <th>Co-supervisor State</th>
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