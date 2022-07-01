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
            <button
              type="button"
              onClick={()=>{window.location="/admin-file-upload"}}
              style={{ marginRight: "50px", width: "40%", backgroundColor: "#a1a0a0 " }}
              class="btn btn-lg"
            >
              File Upload
            </button>
            <button
              onClick={()=>{window.location="/admin-file-download"}}
              type="button"
              style={{ width: "40%", backgroundColor: "#a1a0a0 " }}
              class="btn btn-lg"
            >
              Download Files
            </button>
            <button
              type="button"
              onClick={()=>{window.location="/admin-add-new-submission-type"}}
              style={{ marginRight: "50px", width: "40%", marginTop: "30px", backgroundColor: "#93c0e1" }}
              class="btn  btn-lg"
            >
              Add Submission Type
            </button>
            <button
              type="button"
              onClick={()=>{window.location="/admin-submission-type-list"}}
              style={{ width: "40%", marginTop: "30px", backgroundColor: "#93c0e1" }}
              class="btn btn-lg"
            >
              View Submission Types
            </button>
            <button
              type="button"
              onClick={()=>{window.location="/admin-marking-upload"}}
              style={{ marginRight: "50px", width: "40%", marginTop: "30px", backgroundColor: "#a1a0a0 " }}
              class="btn btn-lg"
            >
              Add Marking Scheme
            </button>
            <button
              type="button"
              onClick={()=>{window.location="/admin-marking-download"}}
              style={{ width: "40%", marginTop: "30px", backgroundColor: "#a1a0a0 " }}
              class="btn btn-lg"
            >
              View Marking Schemes
            </button>
            <button
              type="button"
              onClick={()=>{window.location="/admin-all-students"}}
              style={{ marginRight: "50px", width: "40%", marginTop: "30px", backgroundColor: "#93c0e1" }}
              class="btn btn-lg"
            >
              View Students
            </button>
            <button
              type="button"
              onClick={()=>{window.location="/admin-all-employees"}}
              style={{ width: "40%", marginTop: "30px", backgroundColor: "#93c0e1" }}
              class="btn btn-lg"
            >
              View Employees
            </button>
            <button
              type="button"
              onClick={()=>{window.location="/admin-group-list"}}
              style={{ marginTop: "30px", width: "85%", backgroundColor: "#a1a0a0 ", color: "black" }}
              class="btn btn-lg"
            >
              Allocate Panel Members
            </button>
        </center>
      </div>
      </BrowserRouter>
    );
  }
}
