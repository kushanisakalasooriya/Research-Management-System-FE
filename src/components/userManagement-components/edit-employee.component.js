import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateEmployeeDetails extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmployeeID = this.onChangeEmployeeID.bind(this);
        this.onChangeEmployeefirstName = this.onChangeEmployeefirstName.bind(this);
        this.onChangeEmployeelastName = this.onChangeEmployeelastName.bind(this);
        this.onChangeEmployeeImage = this.onChangeEmployeeImage.bind(this);
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
            image: ''
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
                    image: response.data.image
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            emp: ['Supervisor', 'co-Supervisor', 'staff'],
            employeeType: 'Supervisor'
        });
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

    onSubmit(e) {
        e.preventDefault();

        const employeeDetails = {
            empID: this.state.empID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            empType: this.state.empType,
            image: this.state.image,
            password: this.state.password,
            email: this.state.email
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
            email: ''
        })
        // this.props.history.push('/employee-details');
        this.props.history.push('/home');     
    }


    render() {
        return (
            <div>
                <h3>Update Employee Details</h3>
                <br />
                <form onSubmit={this.onSubmit}>

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
                    </div>
                </form>
            </div>
        )
    }
}
