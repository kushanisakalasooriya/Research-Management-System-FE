import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

export default class AdminGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: '',
      errorMsg: '',
      data: ''
    }
    this.columns = [
      {
        key: "groupname",
        text: "Group Name",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        key: "groupleader",
        text: "Group Leader",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "supervisor",
        text: "Supervisor",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "cosupervisor",
        text: "Co-Supervisor",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "panelMember",
        text: "Panel Member",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "status",
        text: "Status",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "action",
        text: "Allocate Panel Member",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          return (
            <Fragment>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => this.allocatePanelMember(record)}
                style={{ marginRight: '5px' }}>
                Allocate
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
  allocatePanelMember(record) {
    this.props.history.push("/admin-allocate-panel-member/" + record._id);
  }

  componentWillMount(props) {
    axios.get(`${API_URL}/groups`)
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
        <h4>REGISTERED STUDENT GROUPS - ADMIN VIEW</h4>
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

