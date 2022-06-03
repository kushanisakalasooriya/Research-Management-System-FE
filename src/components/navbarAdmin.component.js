import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class NavbarAdmin extends Component {

  logOut() {
    sessionStorage.clear();
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Research Project Management Tool</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/admin-home" className="nav-link">Admin Home</Link>
            </li>
            <li className="navbar-student-profile-item">
              <Link to="/student-profile" className="nav-link"> <img style={{ width: "40px", height: "40px" }} ></img></Link>
            </li>
            <li className="navbar-item">
              <Link onClick={this.logOut.bind(this)} to="/student-login" className="nav-link"> logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}