import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

export default class AdminEmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: '',
      errorMsg: '',
      data: ''
    }
    this.columns = [
      {
        key: "staffID",
        text: "Employee ID",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        key: "employeefirstName",
        text: "First Name",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "employeelastName",
        text: "Last Name",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "employeeEmail",
        text: "Email",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "employeeType",
        text: "Employee Type",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "action",
        text: "Update",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          return (
            <Fragment>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.editRecord(record)}
                style={{ marginRight: '5px' }}>
                Update
              </button>
            </Fragment>
          );
        }
      },
      {
        key: "action",
        text: "Delete",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          return (
            <Fragment>
              <button
                name="Delete"
                className="btn btn-danger btn-sm"
                onClick={() => this.deleteRecord(record)}>
                Delete
              </button>
            </Fragment>
          );
        }
      }
    ];
    this.config = {
      page_size: 5,
      length_menu: [10, 20, 50],
      button: {
        excel: false,
        print: false,
        extra: false,
      },
    }
    this.extraButtons = [
      {
        className: "btn btn-primary buttons-pdf",
        title: "Export TEst",
        children: [
          <span>
            <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
          </span>
        ],
        onClick: (event) => {
          console.log(event);
        },
      },
      {
        className: "btn btn-primary buttons-pdf",
        title: "Export TEst",
        children: [
          <span>
            <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
          </span>
        ],
        onClick: (event) => {
          console.log(event);
        },
        onDoubleClick: (event) => {
          console.log("doubleClick")
        }
      },
    ]
  }
  editRecord(record) {
    this.props.history.push("/admin-update-employee/" + record._id);
  }

  deleteRecord(record) {
    try {
      axios.delete(`http://localhost:5000/employeeDetails/${record._id}`)
        .then(response => { console.log(response.data) });
      window.location.reload(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState = {
          errorMsg: 'Error while deleting file. Try again later'
        }
      }
    }
  }

  componentWillMount(props) {
    axios.get(`${API_URL}/employeeDetails`)
      .then(res => {
        this.setState({ records: res.data });
        console.log(this.state.records)
      }
      )
  }

  setErrorMsg(err) {
    this.setState = {
      errorMsg: err
    }
  }
  render() {
    return (
      <div>
        <hr />
        <h4>REGISTERED EMPLOYEES - ADMIN VIEW</h4>
        <hr />
        <br />
        <ReactDatatable
          config={this.config}
          records={this.state.records}
          columns={this.columns}
          extraButtons={this.extraButtons}
        />
      </div>
    )
  }
}
