import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
// import './supervisor-edit-mod.css';

// POP UP window
// class Popup extends React.Component {
//     render() {
//         return (
//             <div className='popup'>
//                 <div className='popup_inner'>

//                     <h3>{this.props.texttopic}</h3> <br />
//                     Group Name : {this.props.textgroup} <br />
//                     State : {this.props.textState} <br />

//                     <div>
//                         <select name="state" id="state"
//                             onChange={this.props.stateChange}>
//                             <option value="" selected>Choose</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Accepted">Accepted</option>
//                             <option value="Rejected">Rejected</option>
//                         </select>
//                     </div>
//                     <button onClick={this.props.closePopup}>Back</button>
//                     <button onClick={this.props.submit}>Submit</button>
//                 </div>

//             </div>
//         );
//     }
// }

export default class SupervisorEditTopics extends Component {
    constructor(props) {
        super(props);

        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeGroupName = this.onChangeGroupName.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            topic: '',
            groupName: '',
            state: '',
            csState: '',
            // showPopup: false
        }
    }
    // togglePopup() {
    //     this.setState({
    //         showPopup: !this.state.showPopup
    //     });
    // }

    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/supervisor/topic/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    topic: response.data.topic,
                    groupName: response.data.groupName,
                    state: response.data.state
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTopic(e) {
        this.setState({
            topic: e.target.value
        })
    }

    onChangeGroupName(e) {
        this.setState({
            groupName: e.target.value
        })
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const researchTopics = {
            topic: this.state.topic,
            groupName: this.state.groupName,
            state: this.state.state,
            csState: 'Pending',
        }

        console.log(researchTopics);

        axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/supervisor/topic/update/' + this.props.match.params.id, researchTopics)
            .then(res => console.log(res.data));

        alert("Successfully Edited !")
        window.location = '/supervisor-topics';
    }

    render() {
        return (
            <div>
                <center>
                    <hr></hr>
                    <h3>Edit Topic State</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Topic : </label> {this.state.topic}
                        </div>
                        <div className="form-group">
                            <label>Group Name : </label> {this.state.groupName}
                        </div>
                        <div className="form-group">
                            <label>State : </label> {this.state.state}
                        </div>

                        <div>
                            <select name="state" id="state"
                                onChange={this.onChangeState}>
                                <option value="" selected>Choose</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Edit topic state" className="btn btn-primary" />
                        </div>
                    </form>

                    {/* POP UP window */}
                    {/* <button onClick={this.togglePopup.bind(this)}>Edit Topic State</button>
                {this.state.showPopup ?
                    <Popup
                        texttopic={this.state.topic}
                        textgroup={this.state.groupName}
                        textState={this.state.state}
                        closePopup={this.togglePopup.bind(this)}
                        submit={this.onSubmit.bind(this)}
                        stateChange={this.onChangeState.bind(this)}
                    />
                    : null
                } */}
                </center>
            </div>
        )
    }
}