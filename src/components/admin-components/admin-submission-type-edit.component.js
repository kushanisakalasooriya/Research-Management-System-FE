import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditSubmissionType extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubmissionName = this.onChangeSubmissionName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      submissionName: '',
      description: '',
      deadline:new Date()
    }
  }

  componentDidMount() {
    axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/admin/submissionType/getSubmission/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          submissionName: response.data.submissionName,
          description: response.data.description,
          deadline:new Date(response.data.deadline)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
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

  onChangeDeadline(deadline) {
    this.setState({
      deadline: deadline
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const submissionType = {
      submissionName: this.state.submissionName,
      description: this.state.description,
      deadline:this.state.deadline
    }

    axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/admin/submissionType/update/' + this.props.match.params.id, submissionType)
      .then(res => console.log(res.data));

    window.location = '/admin-submission-type-list';
  }

  render() {
    return (
    <div>
      <h3>Edit Submission - Admin</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Submission Type Name: </label>
          <input ref="userInput"
              required
              className="form-control"
              value={this.state.submissionName}
              onChange={this.onChangeSubmissionName}/>
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
          <input type="submit" value="Update Submission Type" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}