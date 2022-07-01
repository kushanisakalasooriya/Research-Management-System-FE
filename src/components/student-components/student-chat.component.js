import React, { Component } from 'react';
import axios from 'axios';

export default class StudentChat extends Component {
    constructor(props) {
        super(props);

        this.onChangeStudentMsg = this.onChangeStudentMsg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            supervisorName: '',
            studentName: '',
            studentMsg: '',
            supervisorMsg: '',
            chats: [],
            stdGroup: [],
            theSupervisor: '',
            resSupervisor: '',
            oneChat: '',
            StudentId: JSON.parse(sessionStorage.getItem("loggeduser")).firstName,
            StudentRegNo: JSON.parse(sessionStorage.getItem("loggeduser")).stdID,
        }
    }

    async componentDidMount() {

        await axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups')
            .then(response => {
                this.setState({ stdGroup: response.data })

                var i = 0;
                for (i = 0; i < this.state.stdGroup.length; i++) {
                    if (this.state.stdGroup[i].groupleader === this.state.StudentRegNo) {
                        this.state.theSupervisor = this.state.stdGroup[i].supervisor;
                        //slice
                        this.state.resSupervisor = this.state.theSupervisor.substring(0, 6);
                    }
                }
                this.setState({ topic: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        await axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/chat/')
            .then(response => {
                this.setState({ chats: response.data })

                var i = 0;
                for (i = 0; i < this.state.chats.length; i++) {

                    if (this.state.chats[i].studentName === this.state.StudentId) {
                        this.state.oneChat = this.state.chats[i]._id;
                    }
                }

                this.setState({ group: response.data })


            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeStudentMsg(e) {
        this.setState({
            studentMsg: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();

        const chats = {
            supervisorName: this.state.supervisorName,
            studentName: this.state.StudentId,
            studentMsg: this.state.studentMsg,
            supervisorMsg: this.state.supervisorMsg,
        }

        await axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/chat/getChat/' + this.state.StudentId)
            .then(res => {
                if (res.data.message === "success") {
                    //update
                    axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/chat/update/' + this.props.match.params.id, chats)
                        .then(res => console.log(res.data));
                }
                else {
                    //insert
                    axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/chat/add/', chats)
                        .then(res => console.log(res.data));
                }

            }
            );

        window.location = '/student-chatGo/edit/' + this.state.oneChat;
    }

    render() {
        return (

            <div>
                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}>
                    <h3>
                        Chat with Your supervisor
                    </h3>
                </div>

                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}>
                    <h6>
                        Hi <b> {this.state.StudentId}</b>, You can chat with your supervisor Mr. <b> {this.state.resSupervisor}</b>.
                        <br /><br /><a href="#" className='linkMod' style={{ textDecoration: 'none' }} onClick={this.onSubmit}>Start Your Conversation </a>
                    </h6>
                </div>

                <div>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                    <div class="container">
                        <div class="row clearfix">
                            <div class="col-lg-12">
                                <div class="card chat-app">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}