import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

export default class EmployeeRegistration extends Component {

    constructor(props) {
        super(props);

        this.onChangeStaffID = this.onChangeStaffID.bind(this);
        this.onChangeEmployeefirstName = this.onChangeEmployeefirstName.bind(this);
        this.onChangeEmployeelastName = this.onChangeEmployeelastName.bind(this);
        this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
        this.onChangeEmployeePassword = this.onChangeEmployeePassword.bind(this);
        this.onChangeEmployeeType = this.onChangeEmployeeType.bind(this);
        this.onChangeToLogin = this.onChangeToLogin.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            employees: [],
            empID: '',
            firstName: '',
            lastName: '',
            email: '',
            empType: '',
            password: '',
            image:''
        }

    }

    componentDidMount() {
        this.setState({
            employees: ['Supervisor', 'co-Supervisor', 'panel member'],
            empType: 'Supervisor'
        });
    }

    onChangeStaffID(e) {
        this.setState({
            empID: e.target.value
        })
    }

    onChangeEmployeefirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeEmployeelastName(e) {
        this.setState({
            lastName: e.target.value
        })
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

    onChangeEmployeeType(e) {
        this.setState({
            empType: e.target.value
        })
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        })
    }

    onChangeToLogin() {
        this.props.history.push('/employee-login');
    }


    onSubmit(e) {
        e.preventDefault();


        const empDetails = {
            empID: this.state.empID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            empType: this.state.empType,
            password: this.state.password,
            image: this.state.image
        }

        console.log(empDetails);

        axios.post('http://localhost:5000/employee/registration/', empDetails)
            .then(res => alert(res.data));

        this.setState({
            empID: '',
            firstName: '',
            lastName: '',
            email: '',
            empType: '',
            password: '',
            image:''
        })

        //after registration success navigate to the login
        this.props.history.push('/employee-login');


    }



    render() {
        return (

            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>

                        <h1>Welcome</h1>

                        <button type="button" className={styles.w_btn} onClick={this.onChangeToLogin}>
                            Sign in
                        </button>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={this.onSubmit}>

                            <h1>Create Account</h1>

                            <div className="form-group">
                                <label>Employee Type: </label>
                                <select ref="userInput"
                                    required
                                    className="form-control"
                                    value={this.state.empType}
                                    onChange={this.onChangeEmployeeType}>
                                    {
                                        this.state.employees.map(function (user) {
                                            return <option
                                                key={user}
                                                value={user}>
                                                {user}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Employee ID: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.empID}
                                    onChange={this.onChangeStaffID}
                                />
                            </div>

                            <div className="form-group">
                                <label>Employee first Name: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.firstName}
                                    onChange={this.onChangeEmployeefirstName}
                                />
                            </div>

                            <div className="form-group">
                                <label>Employee last Name: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.lastName}
                                    onChange={this.onChangeEmployeelastName}
                                />
                            </div>

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

                            <div className="form-group">
                                <label>Image: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.image}
                                    onChange={this.onChangeImage}
                                />
                            </div>


                            <button type="submit" className={styles.g_btn}>
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}