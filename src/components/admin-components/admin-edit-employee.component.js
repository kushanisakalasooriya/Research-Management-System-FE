import React, { Component } from 'react';
import axios from 'axios';

export default class AdminUpdateEmployeeDetails extends Component {
    constructor(props){
        super(props);

        this.onChangeEmployeeID = this.onChangeEmployeeID.bind(this);
        this.onChangeEmployeefirstName= this.onChangeEmployeefirstName.bind(this);
        this.onChangeEmployeelastName= this.onChangeEmployeelastName.bind(this);
        this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
        this.onChangeEmployeePassword= this.onChangeEmployeePassword.bind(this);
        this.onChangeEmployeeType= this.onChangeEmployeeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            emp: [],
            employees:[],
            staffID: '',
            employeefirstName: '',
            employeelastName: '',
            employeeEmail: '',
            employeePassword: '',
            employeeType: ''
        }
    }

    componentDidMount(){
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employeeDetails/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                staffID: response.data.staffID,
                employeefirstName: response.data.employeefirstName,
                employeelastName: response.data.employeelastName,
                employeeEmail: response.data.employeeEmail,
                employeePassword: response.data.employeePassword,
                employeeType: response.data.employeeType
            })
        })
        .catch(function (error) {
            console.log(error);
        })

        this.setState({
            emp: ['Supervisor','co-Supervisor','staff'],
            employeeType: 'Supervisor'
        });
    }

    onChangeEmployeeID(e) {
        this.setState({
            staffID: e.target.value
        })
    }

    onChangeEmployeefirstName(e) {
        this.setState({
            employeefirstName: e.target.value
        })
    }

    onChangeEmployeelastName(e) {
        this.setState({
            employeelastName: e.target.value
        })
    }

    onChangeEmployeeEmail(e) {
        this.setState({
            employeeEmail: e.target.value
        })
    }

    onChangeEmployeePassword(e) {
        this.setState({
            employeePassword: e.target.value
        })
    }

    onChangeEmployeeType(e) {
        this.setState({
            employeeType: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const employeeDetails = {
            staffID: this.state.staffID,
            employeefirstName:this.state.employeefirstName,
            employeelastName:this.state.employeelastName,
            employeeEmail:this.state.employeeEmail,
            employeePassword:this.state.employeePassword,
            employeeType:this.state.employeeType
        }

        console.log(employeeDetails);
    
        axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/employeeDetails/update-employee/' + this.props.match.params.id, employeeDetails)
          .then(res => alert(res.data));
    
        this.setState({
            staffID:'',
            employeefirstName: '',
            employeelastName:'',
            employeeEmail: '',
            employeePassword:'',
            employeeType: ''
        })
        this.props.history.push('/admin-all-employees');
      }


  render() {
    return (
        <div>
        <h3>Update Employee Details</h3>
        <br/>
        <form onSubmit={this.onSubmit}>

        <div className="form-group"> 
            <label>Employee Type: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.employeeType}
                onChange={this.onChangeEmployeeType}>
                    {
                        this.state.emp.map(function(user){
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
            <label>Staff ID: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.staffID}
                onChange={this.onChangeEmployeeID}
                />
          </div>

          <div className="form-group"> 
            <label>Employee first Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.employeefirstName}
                onChange={this.onChangeEmployeefirstName}
                />
          </div>

          <div className="form-group"> 
            <label>Employee last Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.employeelastName}
                onChange={this.onChangeEmployeelastName}
                />
          </div>

          <div className="form-group"> 
            <label>Employee Email: </label>
            <input  type="text"
                required
                readOnly
                className="form-control"
                value={this.state.employeeEmail}
                onChange={this.onChangeEmployeeEmail}
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
