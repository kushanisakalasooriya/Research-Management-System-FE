import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';

export default class EmployeeLogin extends Component {

  constructor(props) {
    super(props);


    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeePassword = this.onChangeEmployeePassword.bind(this);
    this.onChangeLoginToRegistration = this.onChangeLoginToRegistration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      employees: [],
      email: '',
      password: ''
    }

  }

  onChangeEmployeeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeEmployeePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeLoginToRegistration() {
    this.props.history.push("/employee-registration");
  }

  onSubmit(e) {
    e.preventDefault();


    const empDetails = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:5000/employee/login/', empDetails)
      .then((res) => {
        //create session for passing employee details
        window.sessionStorage.setItem(
          "loggeduser",
          JSON.stringify(res.data.user)
        );

        this.setState({
          email: "",
          password: "",
        });

        if (res.data.status === 200) {
          alert("logged in successfully");

          //Navigate to the employee related page
          if (res.data.user.empType === 'Supervisor') {
            window.sessionStorage.setItem(
              "navBarType",
              ('3')
            );
            this.props.history.push('/supervisor-home');
          }
          else if (res.data.user.empType === 'Co-Supervisor') {
            window.sessionStorage.setItem(
              "navBarType",
              ('3')
            );
            this.props.history.push('/co-supervisor-home');
          }
          else if (res.data.user.empType === 'Panel Member') {
            this.props.history.push('/panel-home');
          }
          else if (res.data.user.empType === 'Admin') {
            window.sessionStorage.setItem(
              "navBarType",
              ('2')
            );
            this.props.history.push('/admin-home');
          }
          // this.props.history.push(`/employee-profile/${res.data.user._id}`);

        } else {
          alert("Login Failed. Please re-check your credentials.");
        }
      });

  }


  render() {
    return (

      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={this.onSubmit}>
              <h1>Login to Your Account</h1>

              <div className="form-group">
                <label>Employee Email: </label>
                <input type="email"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmployeeEmail}
                />
              </div>

              <div className="form-group">
                <label>Password: </label>
                <input type="password"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangeEmployeePassword}
                />
              </div>

              <Link to="/employee-forgot-password" style={{ marginLeft: '85px', alignSelf: "flex-start" }}>
                <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
              </Link>

              <button type="submit" className={styles.g_btn}>
                Sign in
              </button>
            </form>
          </div>

          <div className={styles.right}>
            <h1 style={{ textAlign: "center" }}>Create new Account</h1>

            <button
              type="button"
              onClick={this.onChangeLoginToRegistration}
              className={styles.w_btn}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    )
  }
}

