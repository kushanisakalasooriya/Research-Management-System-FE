import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";

export default class AdminHome extends Component {
  render() {
    return (
      <BrowserRouter>
      <div style={{ marginTop: "20px" }}>
        <center>
          <h2>ADMIN HOME</h2>
          <br />
          <br />
          <Link to="/admin-file-upload">
            <button
              type="button"
              style={{ marginRight: "50px", width: "40%" }}
              class="btn btn-info btn-lg"
            >
              File Upload
            </button>
          </Link>
          <Link to="/admin-file-download">
            <button
              type="button"
              style={{ width: "40%" }}
              class="btn btn-info btn-lg"
            >
              Download Files
            </button>
          </Link>
          <Link to="/admin-add-new-submission-type">
            <button
              type="button"
              style={{ marginRight: "50px", width: "40%", marginTop: "30px" }}
              class="btn btn-success btn-lg"
            >
              Add Submission Type
            </button>
          </Link>
          <Link to="/admin-submission-type-list">
            <button
              type="button"
              style={{ width: "40%", marginTop: "30px" }}
              class="btn btn-success btn-lg"
            >
              View Submission Types
            </button>
          </Link>
          <Link to="/admin-marking-upload">
            <button
              type="button"
              style={{ marginRight: "50px", width: "40%", marginTop: "30px" }}
              class="btn btn-primary btn-lg"
            >
              Add Marking Scheme
            </button>
          </Link>
          <Link to="/admin-marking-download">
            <button
              type="button"
              style={{width: "40%", marginTop: "30px" }}
              class="btn btn-primary btn-lg"
            >
              View Marking Schemes
            </button>
          </Link>
          <Link to="/admin-all-students">
            <button
              type="button"
              style={{ marginRight: "50px", width: "40%", marginTop: "30px" }}
              class="btn btn-danger btn-lg"
            >
              View Students
            </button>
          </Link>
          <Link to="/admin-all-employees">
            <button
              type="button"
              style={{ width: "40%", marginTop: "30px" }}
              class="btn btn-danger btn-lg"
            >
              View Employees
            </button>
          </Link>
          <Link to="/admin-group-list">
            <button
              type="button"
              style={{ marginTop: "30px", width: "85%" }}
              class="btn btn-warning btn-lg"
            >
              Allocate Panel Members
            </button>
          </Link>
        </center>
      </div>
      </BrowserRouter>
    );
  }
}
