import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

export default class SuperrvisorResearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesList: '',
            errorMsg: '',
            data: '',
            stdGroup: [],
            theGroup: [],
            supervisorName: JSON.parse(sessionStorage.getItem("loggeduser")).firstName,
        }
        console.log('Supervisor Name', this.state.supervisorName);
        this.columns = [
            {
                key: "groupname",
                text: "Group Name",
                className: "address",
                align: "left",
                sortable: true
            },
            {
                key: "feedback",
                text: "Feedback",
                className: "address",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "Download Research Paper",
                className: "action",
                width: 250,
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-info btn-sm"
                                style={{ marginLeft: "75px" }}
                                onClick={() => this.downloadFile(record)}>
                                Download
                            </button>
                        </Fragment>
                    );
                }
            },
            {
                key: "action",
                text: "Add Feedback",
                className: "action",
                width: 150,
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{ marginRight: '5px', marginLeft: "40px" }}>
                                Add
                            </button>
                        </Fragment>
                    );
                }
            },

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
        this.props.history.push("/supervisor-research/add/" + record._id);
    }

    async downloadFile(record) {
        try {
            const result = await axios.get(`${API_URL}/student-submission/download/${record._id}`, {
                responseType: 'blob'
            });
            const split = record.file_path.split('/');
            const filename = split[split.length - 1];
            this.state.errorMsg = '';
            return download(result.data, filename, record.mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Error while downloading file. Try again later');
            } else if (error.response && error.response.status === 404) {
                alert('File does not exists. Sorry for the inconvenience.');
            }
        }
    }

    async componentWillMount(props) {

        await axios.get('http://localhost:5000/groups')
            .then(response => {
                this.setState({ stdGroup: response.data })

                var i = 0;
                for (i = 0; i < this.state.stdGroup.length; i++) {
                    if (this.state.stdGroup[i].supervisor === this.state.supervisorName) {
                        this.state.theGroup.push(this.state.stdGroup[i].groupname);
                    }
                }
                this.setState({ topic: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        const topicGroup = {
            theGroup: this.state.theGroup
        }
        console.log("The Group", this.state.theGroup);

        await axios.post('http://localhost:5000/student-submission/researchSubmission', topicGroup)
            .then(res => {
                this.setState({ records: res.data.group })
                console.log("Records", this.state.records)
            })
            .catch((error) => {
                console.log(error);
            })

    }

    setErrorMsg(err) {
        this.setState = {
            errorMsg: err
        }
    }
    render() {
        return (
            <div >
                <br />
                <h4>Download Research Papers </h4>
                <hr />
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "15px" }}>
                    <br />
                    <ReactDatatable
                        config={this.config}
                        records={this.state.records}
                        columns={this.columns}
                        extraButtons={this.extraButtons}
                    />
                </div>
            </div>
        )
    }
}