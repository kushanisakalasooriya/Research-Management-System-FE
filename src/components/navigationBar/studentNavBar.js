import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import profileIcon from '../userManagement-components/images/profileicon.png'

export default class studentNavBar extends Component {
  
    render() {
        return (
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Research Project Management Tool</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                
                <li className="navbar-item">
                  <Link to="/supervisor-home" className="nav-link">Supervisor</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/co-supervisor-home" className="nav-link">Co-Supervisor</Link>
                </li>
                {/* <li className="navbar-item">
                  <Link to="/panel-home" className="nav-link">Panel Member</Link>
                </li> */}
                <li className="navbar-item">
                  <Link to="/student-home" className="nav-link"> Student</Link>
                </li>
                <li className="navbar-student-profile-item">
                  <Link to="/student-profile" className="nav-link"> <img style={{ width: "40px", height: "40px" }} src={profileIcon}></img></Link>
                </li>
              </ul>
            </div>
          </nav>
        );
      }
    }
