import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './supervisor-chat.css';
import './supervisor-home-mod.css';

export default class SupervisorChatPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeSupervisorMsg = this.onChangeSupervisorMsg.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            supervisorName: '',
            supervisorId: JSON.parse(sessionStorage.getItem("loggeduser")).firstName,
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
                    if (this.state.chats[i].supervisorName === this.state.supervisorId && this.state.chats[i].supervisorMsg === '') {
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
                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h3>  Chat with Students</h3> </div>
                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h5>Notifications</h5></div>

                {
                    this.state.oneChat.map(
                        chat =>
                            <div key={chat._id}>
                                <div class="Notifycard">
                                    <Link to={"/supervisor-chatGo/edit/" + chat._id} style={{ textDecoration: 'none' }}><div className="Notifycontainer"><i className="fa fa-bell" style={{ paddingRight: '20px' }}></i>
                                        You have a new message from <b>{chat.studentName}</b> !!
                                    </div></Link>
                                </div><br />
                            </div>
                    )
                }


                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                <div className="container" >
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card chat-app">

                                {/* <div id="plist" className="people-list" >
                                    <br />
                                    {
                                        this.state.oneChat.map(
                                            chat =>
                                                <ul className="list-unstyled chat-list mt-2 mb-0" key={chat._id}>
                                                    <Link to={"/supervisor-chat/edit" + chat._id}> <li className="oneChatDisplay">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                                        <div className="about">
                                                            <div className="Stdname" >{chat.studentName}</div>
                                                        </div>
                                                    </li>
                                                    </Link>

                                                </ul>
                                        )
                                    }
                                </div> */}

                                {this.state.check === false && <div className="chat" >
                                    <div className="chat-header clearfix">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                                <div className="chat-about">
                                                    <h6 className="m-b-0">{this.state.studentName}</h6>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <div className="chat-history">
                                            <ul className="m-b-0">

                                                <li className="clearfix">

                                                    <div className="message my-message">{this.state.studentMsg}</div>
                                                </li>

                                                <li className="clearfix">
                                                    <div className="message-data text-right">
                                                        <span className="message-data-time">{this.state.supervisorName}</span>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                                    </div>
                                                    <div className="message other-message float-right"> {this.state.supervisorMsg}</div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="chat-message clearfix">
                                            <div className="input-group mb-0">

                                                <input type="text" className="form-control" placeholder="Enter text here..." onChange={this.onChangeSupervisorMsg} />
                                                <button onClick={this.onSubmit}>Send Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

            </div >


        )
    }
}