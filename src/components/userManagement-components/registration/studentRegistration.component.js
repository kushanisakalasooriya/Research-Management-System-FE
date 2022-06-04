import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";


export default class StudentRegistration extends Component {

    constructor(props) {
        super(props);

        this.onChangeStudentID = this.onChangeStudentID.bind(this);
        this.onChangeStudentfirstName = this.onChangeStudentfirstName.bind(this);
        this.onChangeStudentlastName = this.onChangeStudentlastName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
        this.onChangeToLogin = this.onChangeToLogin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            students: [],
            stdID: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_BzGCRFUnQvDPPd8rrI9cHczEpj4ED5avR1pnKjAxkZ3yq_yoCrdXalvDvjLLEaaEMH0&usqp=CAU',
            msg: ''
        }

    }

    onChangeStudentID(e) {
        this.setState({
            stdID: e.target.value
        })
    }

    onChangeStudentfirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeStudentlastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeStudentEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeStudentPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeToLogin() {
        this.props.history.push('/student-login');
    }


    onSubmit(e) {
        e.preventDefault();


        const studentDetails = {
            stdID: this.state.stdID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            image: this.state.image
        }

        axios.post('http://localhost:5000/student/registration/', studentDetails)
            .then(res => { 

                if (res.data === 'Student Registration successfully!') {
                    alert(res.data);
                    this.setState({
                        stdID: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_BzGCRFUnQvDPPd8rrI9cHczEpj4ED5avR1pnKjAxkZ3yq_yoCrdXalvDvjLLEaaEMH0&usqp=CAU'
                    })
            
            
                    //after registration success navigate to the login
                    this.props.history.push('/student-login')
                }
                else{
                    alert(res.data);
                }

            }
            );

    }


    render() {
        return (

            <div className={styles.Stdsignup_container}>
                <div className={styles.Stdsignup_form_container}>
                    <div className={styles.stdleft}>

                        <h1>Welcome</h1>

                        <button type="button" className={styles.w_btn} onClick={this.onChangeToLogin}>
                            Sign in
                        </button>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={this.onSubmit}>

                            <h2 style={{ marginTop: "-50px", marginBottom: "50px" }}>Create Student Account</h2>
                            <div class="row">
                                <div class="col">
                                    <div className="form-group">
                                        <label>Student ID: </label>
                                        <input type="text"
                                            required
                                            className="form-control"
                                            value={this.state.stdID}
                                            onChange={this.onChangeStudentID}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Student first Name: </label>
                                        <input type="text"
                                            required
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={this.onChangeStudentfirstName}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Student last Name: </label>
                                        <input type="text"
                                            required
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.onChangeStudentlastName}
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <div className="form-group">
                                        <label>Student Email: </label>
                                        <input type="email"
                                            required
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.onChangeStudentEmail}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Password: </label>
                                        <input type="password"
                                            required
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={this.onChangeStudentPassword}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button style={{ marginTop: "20px" }} type="submit" className={styles.g_btn}>
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

