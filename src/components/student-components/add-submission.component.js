import React, { Component } from 'react'
import axios from 'axios';
import StuFileUpload from './stu-file-upload.component';

export default class addSubmission extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeSubmissionName = this.onChangeSubmissionName.bind(this);
        this.onChangeGroupname = this.onChangeGroupname.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          submissionName: '',
          groupname:'Warriors',
          feedback: '',
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
        // await axios.get('http://localhost:5000/admin/submissionType/getSubmissionId/'+this.state.submissionName)
        //   .then(response => {
        //     if (response.data.length > 0) {
        //       this.setState({
        //         description: response.data[0].description,
        //         deadline:response.data[0].deadline.substring(0,10)
        //       })
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
      }
    
      onChangeGroupname(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeFeedback(e) {
        this.setState({
          deadline: e.target.value
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
            <label>Group Name: </label>
            <input  type="text"
                required
                readOnly
                className="form-control"
                value={this.state.groupname}
                onChange={this.onChangeGroupname}
                />
          </div>
          
          <div className="form-group">
            <input type="submit" value="Add Submisson" className="btn btn-primary" />
          </div>
        </form>
        <div>
          <StuFileUpload/>
        </div>
      </div>
    )
  }
}
