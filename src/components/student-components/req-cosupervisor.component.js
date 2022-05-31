import React, { Component } from 'react';
import axios from 'axios';

export default class reqCoSupervisor extends Component {
    constructor(props) {
        super(props);

        this.onChangeCoSupervisor = this.onChangeCoSupervisor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            groupname: '',
            cosupervisor: '',
            groups: []
        }
    }

    componentDidMount() {
        axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/')
            .then(response => {
                this.setState({ groups: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeCoSupervisor(e) {
        this.setState({
            cosupervisor: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const cosupervisor = {
            groupname: 'Thar',
            cosupervisor: this.state.cosupervisor,
        }
        console.log(cosupervisor);

        axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/groups/update/cosupervisor', cosupervisor)
            .then(res => console.log(res.data));

        this.setState({
            groupname: '',
            cosupervisor: ''
        })
    }

    render() {
        return (
            <div>
                <h3> Request a cosupervisor </h3>
                <form onSubmit={this.onSubmit}>

                    <div>
                        <select name="cosupervisor" id="cosupervisor"
                            onChange={this.onChangeCoSupervisor}>
                            <option value="" selected>Choose</option>
                            <option value="Amal">Amal</option>
                            <option value="Kasun">Kasun</option>
                            <option value="Nimal">Nimal</option>
                            <option value="Supun">Supun</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit topic" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
