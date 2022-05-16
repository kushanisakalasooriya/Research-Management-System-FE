import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Student = props => (
    <tr>
        <td>{props.student.stdID}</td>
        <td>{props.student.studentfirstName} {props.student.studentlastName}</td>
        <td>
            <Link to={""}> Add </Link>
        </td>
    </tr>
)

export default class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.onChangeGroupName = this.onChangeGroupName.bind(this);
        this.onChangeGroupLeader = this.onChangeGroupLeader.bind(this);
        this.onChangeSupervisor = this.onChangeSupervisor.bind(this);
        this.onChangeCoSupervisor = this.onChangeCoSupervisor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            groupname: '',
            groupleader: '',
            supervisor: '',
            cosupervisor: '',
            students:[],
            nogroupstudents:[],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/studentDetails')
        .then(response => {
            this.setState({ students: response.data})
        })
        .catch((error) => {
            console.log(error);
        })

        // console.log(this.state.students);
    }

    studentDetailsList() {
        // console.log(this.state.students);
        var i = 0;
        for (i=0 ; i < this.state.students.length ; i++){
            if(this.state.students[i].studentGrpID == null){
                this.state.nogroupstudents.push(this.state.students[i]);
            }
        }
        // console.log(this.state.nogroupstudents);

        return this.state.nogroupstudents.map(currentstudentdetails => {
            return <Student student = {currentstudentdetails} key={currentstudentdetails._id}/>;
        })
    }

    onChangeGroupName(e) {
        this.setState({
            groupname: e.target.value
        });
    }

    onChangeGroupLeader(e) {
        this.setState({
            groupleader: e.target.value
        });
    }

    onChangeSupervisor(e) {
        this.setState({
            supervisor: e.target.value
        });
    }

    onChangeCoSupervisor(e) {
        this.setState({
            cosupervisor: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const group = {
            groupname: this.state.groupname,
            groupleader: this.state.groupleader,
            supervisor: this.state.supervisor,
            cosupervisor: this.state.cosupervisor,
        }

        console.log(group);

        axios.post('http://localhost:5000/groups/add', group)
            .then(res => console.log(res.data));

        this.setState({
            groupname: '',
            groupleader: '',
            supervisor: '',
            cosupervisor: '',
        })

        // window.location = '/';
    }


    render() {
        return (
            <div>

                <h3>All Student Details</h3>

                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.studentDetailsList()}
                    </tbody>
                </table>

                <h3>Create New Group Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Group Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.groupname}
                            onChange={this.onChangeGroupName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Group Leader: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.groupleader}
                            onChange={this.onChangeGroupLeader}
                        />
                    </div>
                    <div className="form-group">
                        <label> Supervisor: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.supervisor}
                            onChange={this.onChangeSupervisor}
                        />
                    </div>
                    <div className="form-group">
                        <label> Co-Supervisor: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.cosupervisor}
                            onChange={this.onChangeCoSupervisor}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Group" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
