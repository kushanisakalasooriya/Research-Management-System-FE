import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Group = props => (
    <tr>
        <td>{props.group.groupname}</td>
        <td>{props.group.groupleader}</td>
        <td>{props.group.member02}</td>
        <td>{props.group.member03}</td>
        <td>{props.group.member04}</td>
        <td>{props.group.status} <Link to={"/supervisor-std-groups/edit/" + props.group._id}>Change</Link></td>
    </tr >
)

export default class SuperrvisorStdGroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            pendingGroups: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/groups')
            .then(response => {
                this.setState({ groups: response.data })

                var i = 0;
                for (i = 0; i < this.state.groups.length; i++) {
                    if (this.state.groups[i].status === "Pending") {
                        this.state.pendingGroups.push(this.state.groups[i]);
                    }
                }

                this.setState({ group: response.data })

                // console.log(this.state.pendingGroups);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    groupList() {
        return this.state.pendingGroups.map(currentgroup => {
            return <Group group={currentgroup} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Group List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Group Name</th>
                            <th>Group Leader </th>
                            <th>Member 2</th>
                            <th>Member 3</th>
                            <th>Member 4</th>
                            <th>Group Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.groupList()}
                    </tbody>
                </table>
            </div>
        )
    }
}