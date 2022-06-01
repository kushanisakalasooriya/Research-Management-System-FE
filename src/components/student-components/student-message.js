import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

export default class StudentMessage extends Component {
    constructor(props) {
        super(props);

        // this.onChangeSupervisorMsg = this.onChangeSupervisorMsg.bind(this);
        this.onChangeStudentMsg = this.onChangeStudentMsg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            supervisorName: '',
            studentName: '',
            studentMsg: '',
            supervisorMsg: '',
            chats: [],
            oneChat: [],
            check: false,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/chat/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    supervisorName: response.data.supervisorName,
                    studentName: response.data.studentName,
                    studentMsg: response.data.studentMsg,
                    supervisorMsg: response.data.supervisorMsg,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/chat')
            .then(response => {
                this.setState({ chats: response.data })

                var i = 0;
                for (i = 0; i < this.state.chats.length; i++) {
                    if (this.state.chats[i].studentName == "Ruwanga") {
                        this.state.oneChat.push(this.state.chats[i]);
                    }
                }

                this.setState({ group: response.data })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    // onChangeSupervisorMsg(e) {
    //     this.setState({
    //         supervisorMsg: e.target.value
    //     })

    // }

    onChangeStudentMsg(e) {
        this.setState({
            studentMsg: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const chats = {
            supervisorName: this.state.supervisorName,
            studentName: this.state.studentName,
            studentMsg: this.state.studentMsg,
            supervisorMsg: '',
        }


        console.log(chats);

        axios.post('http://localhost:5000/chat/update/' + this.props.match.params.id, chats)
            .then(res => console.log(res.data));

        alert("Message Sent !")
        window.location = '/student-chat';
    }

    render() {
        return (
            <div>

                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                <div class="container">
                    <div class="row clearfix">
                        <div class="col-lg-12">
                            <div class="card chat-app">

                                <div id="plist" class="people-list">
                                    <div class="input-group">

                                    </div>

                                </div>

                                <div class="chat">
                                    <div class="chat-header clearfix">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                                <div class="chat-about">
                                                    <h6 class="m-b-0">{this.state.supervisorName}</h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="chat-history">
                                        <ul class="m-b-0">

                                            <li class="clearfix">

                                                <div class="message my-message">{this.state.supervisorMsg}</div>
                                            </li>

                                            <li class="clearfix">
                                                <div class="message-data text-right">
                                                    <span class="message-data-time">{this.state.studentName}</span>
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                                </div>
                                                <div class="message other-message float-right"> {this.state.studentMsg}</div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="chat-message clearfix">
                                        <div class="input-group mb-0">

                                            <input type="text" class="form-control" placeholder="Enter text here..." onChange={this.onChangeStudentMsg} />
                                            <button onClick={this.onSubmit} >Send Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}