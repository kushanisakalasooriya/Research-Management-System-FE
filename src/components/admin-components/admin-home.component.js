import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AdminHome extends Component {

  render() {
    return (
      <div style={{marginTop:'60px'}}>
        <center>
        <Link to="/admin-file-upload"><button type="button" style={{marginRight: "50px"}} class="btn btn-primary btn-lg">File Upload</button></Link>
        <Link to="/admin-file-download"><button type="button" style={{marginRight: "50px"}} class="btn btn-primary btn-lg">Download Files</button></Link>
        <Link to="/admin-add-new-submission-type"><button type="button" style={{marginRight: "50px"}} class="btn btn-primary btn-lg">Add Submission Type</button></Link>
        <Link to="/admin-submission-type-list"><button type="button" class="btn btn-primary btn-lg">View Submission Types</button></Link>
        <Link to="/admin-marking-upload"><button type="button" style={{marginRight: "50px", marginTop:'30px'}} class="btn btn-primary btn-lg">Add Marking Scheme</button></Link>
        <Link to="/admin-marking-download"><button type="button" style={{marginTop:'30px'}} class="btn btn-primary btn-lg">View Marking Schemes</button></Link>
        </center>
      </div>
    );
  }
}
