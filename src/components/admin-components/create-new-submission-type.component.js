import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class AddNewSubmissionType extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.onChangeSubmissionName = this.onChangeSubmissionName.bind(this);
    this.onChangeDescription= this.onChangeDescription.bind(this);
    this.onChangeDeadline= this.onChangeDeadline.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      submissionName: '',
      description:'',
      deadline:new Date()
    }
  }

  onChangeSubmissionName(e) {
    this.setState({
      submissionName: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeDeadline(date) {
    this.setState({
      deadline: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const submission = {
      submissionName: this.state.submissionName,
      description:this.state.description,
      deadline:this.state.deadline
    }

    axios.post('http://localhost:5000/admin/submissionType/add', submission)
      .then(res => alert(res.data));

    this.setState({
      submissionName:'',
      description: '',
      deadline:new Date()
    })
    this.props.history.push('/admin-submission-type-list');
  }

  render() {
    return (
      <div>
        <h3>Create New Submission Type</h3>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Submission Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.submissionName}
                onChange={this.onChangeSubmissionName}
                />
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group"> 
            <label>Deadline: </label>
            <div>
            <DatePicker
              selected={this.state.deadline}
              onChange={this.onChangeDeadline}
            />
          </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}