import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

export default class UpdateEmployeeDetails extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmployeeID = this.onChangeEmployeeID.bind(this);
        this.onChangeEmployeefirstName = this.onChangeEmployeefirstName.bind(this);
        this.onChangeEmployeelastName = this.onChangeEmployeelastName.bind(this);
        this.onChangeEmployeeImage = this.onChangeEmployeeImage.bind(this);
        this.onChangeEmployeeResearchField = this.onChangeEmployeeResearchField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            emp: [],
            employees: [],
            empID: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            empType: '',
            image: '',
            researchField:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employee/registration/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    empID: response.data.empID,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    password: response.data.password,
                    empType: response.data.empType,
                    image: response.data.image,
                    researchField: response.data.researchField
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeEmployeeID(e) {
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

    onChangeEmployeeImage(e) {
        this.setState({
            image: e.target.value
        })
    }

    onChangeEmployeeResearchField(e) {
        this.setState({
            researchField: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const employeeDetails = {
            empID: this.state.empID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            empType: this.state.empType,
            image: this.state.image,
            password: this.state.password,
            email: this.state.email,
            researchField: this.state.researchField
        }

        console.log(employeeDetails);

        axios.post('http://localhost:5000/employee/registration/update-employee/' + this.props.match.params.id, employeeDetails)
            .then(res => alert(res.data));

        this.setState({
            empID: '',
            firstName: '',
            lastName: '',
            empType: '',
            image: '',
            password: '',
            email: '',
            researchField: ''
        })
        
        this.props.history.push(`/employee-profile/${this.props.match.params.id}`);
    }

    cancel() {
        this.props.history.push(`/employee-profile/${this.props.match.params.id}`);
    }

    render() {
        return (
            <div style={{ marginLeft: "-200px" }} className={styles.container}>

                <br />
                <form className={styles.form_container} onSubmit={this.onSubmit}>
                    <h3>Update Employee Details</h3>
                    <div className="form-group">
                        <label>Employee Type: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.empType}
                        />
                    </div>

                    <div className="form-group">
                        <label>Employee ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.empID}
                            onChange={this.onChangeEmployeeID}
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
                        <label>Research Field: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.researchField}
                            onChange={this.onChangeEmployeeResearchField}
                        />
                    </div>

                    <div className="form-group">
                        <label>Profile photo: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.image}
                            onChange={this.onChangeEmployeeImage}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Details" className="btn btn-primary" />
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}> Cancel </button>
                    </div>
                </form>
            </div>
        )
    }
}
