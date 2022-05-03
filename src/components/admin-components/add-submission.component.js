import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class AddSubmission extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubmissionName = this.onChangeSubmissionName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeRegNo = this.onChangeRegNo.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      submissionName: '',
      description:'',
      deadline: '',
      regNo:'',
      remarks: '',
      submissionTypes:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/admin/submissionType/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            submissionTypes: response.data.map(submission => submission.submissionName),
            submissionName: ''
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  async onChangeSubmissionName(e) {
    await this.setState({
      submissionName: e.target.value
    })
    await axios.get('http://localhost:5000/admin/submissionType/getSubmissionId/'+this.state.submissionName)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            description: response.data[0].description,
            deadline:response.data[0].deadline.substring(0,10)
          })
        }
      })
      .catch((error) => {
        console.log(error);
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

  onChangeRegNo(e) {
    this.setState({
      regNo: e.target.value
    })
  }

  onChangeRemarks(e) {
    this.setState({
      remarks: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      submissionName: this.state.submissionName,
      regNo: this.state.regNo,
      remarks: this.state.remarks
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Add a submission</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Submission Type: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.submissionName}
              onChange={this.onChangeSubmissionName}>
              {
                this.state.submissionTypes.map(function(submission) {
                  return <option 
                    key={submission}
                    value={submission}>{submission}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              readOnly
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Deadline: </label>
          <input 
              type="text" 
              readOnly
              className="form-control"
              value={this.state.deadline}
              onChange={this.onChangeDeadline}
              />
        </div>
        <div className="form-group">
          <label>Registration No:</label>
          <input 
              type="text" 
              className="form-control"
              required
              value={this.state.regNo}
              onChange={this.onChangeRegNo}
              />
        </div>
        <div className="form-group">
          <label>Remarks:</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.remarks}
              onChange={this.onChangeRemarks}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}