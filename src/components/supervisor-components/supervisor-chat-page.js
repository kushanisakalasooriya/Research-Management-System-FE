import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './supervisor-chat.css';

export default class SupervisorChatPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeSupervisorMsg = this.onChangeSupervisorMsg.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            supervisorName: '',
            studentName: '',
            studentMsg: '',
            supervisorMsg: '',
            chats: [],
            oneChat: [],

        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/chat')
            .then(response => {
                this.setState({ chats: response.data })

                var i = 0;
                for (i = 0; i < this.state.chats.length; i++) {
                    if (this.state.chats[i].supervisorName == "Jagath") {
                        this.state.oneChat.push(this.state.chats[i]);
                    }
                }

                this.setState({ group: response.data })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    getMessages() {
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
        // window.location.reload(true);
    }


    onChangeSupervisorMsg(e) {
        this.setState({
            supervisorMsg: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const chats = {
            supervisorName: this.state.supervisorName,
            studentName: this.state.studentName,
            studentMsg: this.state.studentMsg,
            supervisorMsg: this.state.supervisorMsg,
        }

        console.log(chats);

        axios.post('http://localhost:5000/chat/update/' + this.props.match.params.id, chats)
            .then(res => console.log(res.data));

        alert("Message Sent !")
        window.location = '/supervisor-chat';
    }

    render() {
        return (
            <div>
                {/* {
                    this.state.oneChat.map(
                        chat =>
                            <div key={chat._id}>
                                <div class="Notifycard">
                                    <div class="Notifycontainer">
                                        You have a new Message From <b>{chat.studentName}</b> !! <Link to={"/supervisor-chat/edit" + chat._id}> <button className='btn btn-primary'> Chat</button></Link>
                                    </div>
                                </div><br />
                            </div>
                    )
                } */}

                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                <div class="container" >
                    <div class="row clearfix">
                        <div class="col-lg-12">
                            <div class="card chat-app">

                                <div id="plist" class="people-list" style={{ backgroundColor: "white", marginTop: "30px" }}>
                                    <div class="input-group">

                                    </div>


                                    {
                                        this.state.oneChat.map(
                                            chat =>
                                                <ul class="list-unstyled chat-list mt-2 mb-0" key={chat._id}>
                                                    <li class="clearfix">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                                        <div class="about">
                                                            <div class="name">{chat.studentName} <Link to={"/supervisor-chat/edit" + chat._id}> <button onClick={() => { this.getMessages() }} className='btn btn-primary'> Chat</button></Link></div>
                                                        </div>
                                                    </li>

                                                </ul>
                                        )
                                    }
                                </div>

                                {this.state.check == false && <div class="chat" >
                                    <div class="chat-header clearfix">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                                </a>
                                                <div class="chat-about">
                                                    <h6 class="m-b-0">{this.state.studentName}</h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="chat-history">
                                        <ul class="m-b-0">

                                            <li class="clearfix">

                                                <div class="message my-message">{this.state.studentMsg}</div>
                                            </li>

                                            <li class="clearfix">
                                                <div class="message-data text-right">
                                                    <span class="message-data-time">{this.state.supervisorName}</span>
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                                </div>
                                                <div class="message other-message float-right"> {this.state.supervisorMsg}</div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="chat-message clearfix">
                                        <div class="input-group mb-0">

                                            <input type="text" class="form-control" placeholder="Enter text here..." onChange={this.onChangeSupervisorMsg} />
                                            <button onClick={this.onSubmit}>Send Message</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}