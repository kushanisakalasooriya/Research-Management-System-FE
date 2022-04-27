import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AdminHome extends Component {

  render() {
    return (
      <div>
        <Link to="/admin-file-upload"><button type="button" style={{marginRight: "50px"}} class="btn btn-primary btn-lg">File Upload</button></Link>
        <Link to="/admin-file-download"><button type="button" class="btn btn-primary btn-lg">Download Files</button></Link>
      </div>
    );
  }
}
