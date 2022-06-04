import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  constructor(props){
    super(props);

    this.state = {
      flag: sessionStorage.getItem("navBarType")
    }
  }

  logOut() {
    sessionStorage.clear();
    window.location='/student-login';
  }

  selectNavBar(){
    if(this.state.flag === '1')
      {return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">Research Project Management Tool</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
  
              <li className="navbar-item">
                <Link to="/admin-home" className="nav-link">Admin</Link>
              </li>
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
              {/* <li className="navbar-student-profile-item">
                <Link to="/student-profile" className="nav-link"> <img style={{ width: "40px", height: "40px" }} src={profileIcon}></img></Link>
              </li> */}
              <li className="navbar-item">
                <Link onClick={this.logOut.bind(this)} className="nav-link"> logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      );}
    else if(this.state.flag === '2')
      {return (
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
                <Link onClick={this.logOut.bind(this)}  className="nav-link"> logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      );}
    else if(this.state.flag === '3')
     {return (
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
            <li className="navbar-student-profile-item">
              <Link to="/student-profile" className="nav-link"> <img style={{ width: "40px", height: "40px" }} ></img></Link>
            </li>
            <li className="navbar-item">
              <Link onClick={this.logOut.bind(this)}  className="nav-link"> logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    );}
    else
      return null
  }

  render() {
    const navbar = this.selectNavBar();
    return( 
    <div>
      {navbar}
    </div>
    )}   
}