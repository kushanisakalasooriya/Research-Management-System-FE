import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

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
        window.sessionStorage.setItem(
          "loggeduser",
          JSON.stringify(res.data.user)
        );

        this.setState({
          email: "",
          password: "",
        });

        if (res.data.status === 200) {
          // navigate to the home page
          alert("Login Success");
          this.props.history.push("/home");
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

