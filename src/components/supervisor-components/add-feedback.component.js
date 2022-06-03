import React, { Component } from 'react';
import axios from 'axios';

export default class AddFeedback extends Component {
    constructor(props) {
        super(props);

        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            feedback: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/student-submission/getFeedback/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    feedback: response.data.feedback,
                    // description: response.data.description,

                })
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.state.feedback);
    }

    onChangeFeedback(e) {
        this.setState({
            feedback: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const file = {
            feedback: this.state.feedback,
            // description: this.state.description,
        }

        axios.post('http://localhost:5000/student-submission/update/' + this.props.match.params.id, file)
            .then(res => console.log(res.data));

        window.location = '/supervisor-research';
    }

    render() {
        return (
            <div>
                <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h3> Add Feedback</h3> </div>
                <center>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>New Feedback : </label>
                            <input style={{ width: '30%' }} ref="userInput"
                                required
                                className="form-control"
                                value={this.state.feedback}
                                onChange={this.onChangeFeedback} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add Feedback" className="btn btn-primary" />
                        </div>
                    </form>
                </center>
            </div>
        )
    }
}