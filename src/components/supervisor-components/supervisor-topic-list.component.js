import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResearchTopic = props => (
    <tr>
        <td>{props.researchTopic.topic}</td>
        <td>{props.researchTopic.groupName}</td>
        <td>{props.researchTopic.state} <Link to={"/supervisor-topics/edit/" + props.researchTopic._id}>Change</Link>
        </td>
        <td>
            <a href="#" onClick={() => { props.deleteTopic(props.researchTopic._id) }}>delete</a>
        </td>
    </tr>
)

export default class SuperrvisorTopicList extends Component {
    constructor(props) {
        super(props);

        this.deleteTopic = this.deleteTopic.bind(this)

        this.state = { researchTopics: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/supervisor/topic')
            .then(response => {
                this.setState({ researchTopics: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTopic(id) {
        axios.delete('http://localhost:5000/supervisor/topic/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            researchTopics: this.state.researchTopics.filter(el => el._id !== id)
        })
    }

    topicList() {
        return this.state.researchTopics.map(currenttopic => {
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
                            <th>State</th>
                            <th>Actions</th>
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