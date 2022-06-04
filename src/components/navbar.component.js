import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './common.css';
import logo from './imgs/logo.png';

export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flag: sessionStorage.getItem("navBarType"),
      user: JSON.parse(sessionStorage.getItem("loggeduser")),
    }
  }
  logOut() {
    if (this.state.flag === '1') {
      sessionStorage.clear();
      window.location = '/student-login';
    } else if (this.state.flag === '2') {
      sessionStorage.clear();
      window.location = '/employee-login';
    } else {
      sessionStorage.clear();
      window.location = '/employee-login';
    }

  }

  selectNavBar() {

    // Student
    if (this.state.flag === '1') {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
          <Link to="/" className="navbar-brand">
            <img style={{ width: "35px", height: "35px", borderRadius: '50px', marginRight: "10px" }}
              src={logo} alt=""></img>
            Research Project Management Tool
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">

              <li className="navbar-item" style={{ paddingTop: "6px" }}>
                <Link to="/student-home" className="nav-link">Home</Link>
              </li>
              <li className="navBarLogout" style={{ paddingTop: "6px" }}>
                <Link onClick={this.logOut.bind(this)} className="nav-link"> Logout</Link>
              </li>
              <li className="navBarImg" >
                <Link to={"/student-profile/" + this.state.user._id} className="nav-link">
                  <img style={{ width: "35px", height: "35px", borderRadius: '50px', marginRight: "0px" }} src={this.state.user.image} alt=""></img>
                </Link>
              </li>
            </ul>
          </div >
        </nav >
      );
    }

    // Admin
    else if (this.state.flag === '2') {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">
            <img style={{ width: "35px", height: "35px", borderRadius: '50px', marginRight: "10px" }}
              src={logo} alt=""></img>
            Research Project Management Tool
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item" style={{ paddingTop: "6px" }}>
                <Link to="/admin-home" className="nav-link">Home</Link>
              </li>
              <li className="navBarLogout" style={{ paddingTop: "6px" }}>
                <Link onClick={this.logOut.bind(this)} className="nav-link"> Logout</Link>
              </li>
              <li className="navBarImg">
                <Link to={"/employee-profile/" + this.state.user._id} className="nav-link">
                  <img style={{ width: "35px", height: "35px", borderRadius: '50px' }} src={this.state.user.image} alt=""></img>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }

    // Supervisor
    else if (this.state.flag === '3') {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand"><img style={{ width: "35px", height: "35px", borderRadius: '50px', marginRight: "10px" }}
            src={logo} alt=""></img>
            Research Project Management Tool
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item" style={{ paddingTop: "6px" }}>
                <Link to="/supervisor-home" className="nav-link">Home</Link>
              </li>
              <li className='navBarLogout' style={{ paddingTop: "6px" }}>
                <Link onClick={this.logOut.bind(this)} className="nav-link"> Logout</Link>
              </li>
              <li className='navBarImg' >
                <Link to={"/employee-profile/" + this.state.user._id} className="nav-link">
                  <img style={{ width: "35px", height: "35px", borderRadius: '50px' }} src={this.state.user.image} alt=""></img>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
    else {
      return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand"><img style={{ width: "35px", height: "35px", borderRadius: '50px', marginRight: "10px" }}
            src={logo} alt=""></img>
            Research Project Management Tool
          </Link>
        </nav>
      );
    }
  }

  render() {
    const navbar = this.selectNavBar();
    return (
      <div>
        {navbar}
      </div>
    )
  }
}