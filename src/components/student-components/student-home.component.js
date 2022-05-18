import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class studentHome extends Component {
  render() {
    return (
      <div>
        <Link to="/add-group"> <button type="button" class="btn btn-secondary"> Submit the student group </button> </Link>
        <Link to="/reg-topic"><button type="button" class="btn btn-success"> Register the research topic </button> </Link>
        <Link to="/req-cosupervisor"><button type="button" class="btn btn-danger"> Request Co-Supervisor  </button> </Link>
        {/* <button type="button" class="btn btn-danger"> Request  Co-Supervisor </button> */}
        <button type="button" class="btn btn-warning"> Submit documents </button>
        <button type="button" class="btn btn-info"> Download templates </button>
      </div>
    )
  }
}
