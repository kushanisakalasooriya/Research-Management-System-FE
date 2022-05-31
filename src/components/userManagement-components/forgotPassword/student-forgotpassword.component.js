import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

export default class StudentForgotPassword extends Component {

    constructor(props) {
        super(props);


        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            students: [],
            email: ''
        }

    }

    onChangeStudentEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const stdpassword = {
            email: this.state.email
        }

        console.log(stdpassword);

        const { data } = axios.post('http://localhost:5000/student/password-reset/', stdpassword)
            .then(res => console.log(res.data));

        this.setState({
            email: ''
        });

        //navigate to ............

    }


    render() {
        return (
            <div style={{ marginTop:"-100px", marginLeft: "-200px" }} className={styles.container}>
                <form className={styles.form_container} onSubmit={this.onSubmit}>

                    <h1>Forgot Password</h1>

                    <div className="form-group">
                        <label>Student Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeStudentEmail}
                        />
                    </div>

                    <button type="submit" className={styles.green_btn}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
