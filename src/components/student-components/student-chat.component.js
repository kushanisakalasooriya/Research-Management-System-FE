import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class StudentChat extends Component {
    constructor(props) {
        super(props);

        // this.onChangeSupervisorName = this.onChangeSupervisorName.bind(this);
        // this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentMsg = this.onChangeStudentMsg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            supervisorName: 'Jagath',
            studentName: 'kamal',
            studentMsg: '',
            supervisorMsg: '',
            chats: [],
            oneChat: [],
            available: false,
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:5000/chat/')
            .then(response => {
                this.setState({ chats: response.data })
                // console.log(this.state.chats);

                var i = 0;
                for (i = 0; i < this.state.chats.length; i++) {

                    if (this.state.studentName === '') {
                        this.state.available = false;
                        console.log(this.state.available);
                    }
                    else if (this.state.studentName === 'Kamal') {
                        this.state.available = true;
                        console.log(this.state.available);
                    }
                    // if (this.state.chats[i].studentName === "Mahen" &&
                    //     this.state.chats[i].studentMsg === "" &&
                    //     this.state.chats[i].supervisorMsg != "") {
                    //     this.state.oneChat.push(this.state.chats[i]);
                    //     this.state.available = true;
                    //     console.log(this.state.available);
                    // }
                    // else if (this.state.chats[i].studentName === "" &&
                    //     this.state.chats[i].studentMsg === "" &&
                    //     this.state.chats[i].supervisorMsg === "") {
                    //     this.state.oneChat.push(this.state.chats[i]);
                    //     this.state.available = false;
                    //     console.log(this.state.available);
                    // }

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

    // getMessages() {
    //     axios.get('http://localhost:5000/chat/' + this.props.match.params.id)
    //         .then(response => {
    //             this.setState({
    //                 supervisorName: response.data.supervisorName,
    //                 studentName: response.data.studentName,
    //                 studentMsg: response.data.studentMsg,
    //                 supervisorMsg: response.data.supervisorMsg,
    //             })
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //     // window.location.reload(true);
    // }

    onSubmit(e) {
        e.preventDefault();

        const chats = {
            supervisorName: this.state.supervisorName,
            studentName: this.state.studentName,
            studentMsg: this.state.studentMsg,
            supervisorMsg: this.state.supervisorMsg,
        }

        console.log(chats);
        if (this.state.available === true) {
            axios.post('http://localhost:5000/chat/update/' + this.props.match.params.id, chats)
                .then(res => console.log(res.data));
        }
        else {

        }
        alert("Sent!")
        // window.location = '/';
    }

    render() {
        return (

            <div>
                <h3>Student Chat</h3>
                {
                    this.state.oneChat.map(
                        chat =>
                            <div key={chat._id}>
                                <b> {this.state.studentName}</b> You Are Going to send message to Mr. <b> {this.state.supervisorName}</b> <Link to={"/student-chat/edit" + chat._id}> <button className='btn btn-primary'> Chat</button></Link>

                            </div>
                    )}

                <div>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                    <div class="container">
                        <div class="row clearfix">
                            <div class="col-lg-12">
                                <div class="card chat-app">

                                    {this.state.check == false && <div class="chat">
                                        <div class="chat-header clearfix">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                                    </a>
                                                    <div class="chat-about">
                                                        <h6 class="m-b-0">{this.state.supervisorName}</h6>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="chat-history">
                                            <ul class="m-b-0">

                                                <li class="clearfix">
                                                    {
                                                        this.state.oneChat.map(
                                                            chat =>
                                                                <div key={chat._id}>
                                                                    <div class="message my-message">{chat.supervisorMsg}</div>
                                                                </div>
                                                        )
                                                    }

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
                                                <button onClick={this.onSubmit}>Send Message</button>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>






            </div>
        )
    }
}