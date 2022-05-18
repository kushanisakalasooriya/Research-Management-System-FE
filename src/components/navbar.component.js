import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Research Project Management Tool</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Exercises</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Exercise Log</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin-home" className="nav-link">Admin</Link>
            </li>
            <li className="navbar-item">
              <Link to="/supervisor-home" className="nav-link">Supervisor</Link>
            </li>
            <li className="navbar-item">
              <Link to="/co-supervisor-home" className="nav-link">Co-Supervisor</Link>
            </li>
            <li className="navbar-item">
              <Link to="/panel-home" className="nav-link">Panel Member</Link>
            </li>
            <li className="navbar-item">
              <Link to="/student-home" className="nav-link"> Student</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}