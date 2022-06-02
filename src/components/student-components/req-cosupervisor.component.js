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
            groups: [],
            loggedUser: []
        }
    }

    componentDidMount() {

        this.setState({
            loggedUser: JSON.parse(sessionStorage.getItem("loggeduser")),
            groupname: sessionStorage.getItem("group")
        })

        axios.get('http://localhost:5000/groups/')
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
            groupname: this.state.groupname,
            cosupervisor: this.state.cosupervisor,
        }
        console.log(cosupervisor);

        axios.post('http://localhost:5000/groups/update/cosupervisor', cosupervisor)
            .then(res => console.log(res.data));

        this.setState({
            groupname: '',
            cosupervisor: ''
        })
    }

    render() {
        return (
            <div>
                <h4> Request a cosupervisor </h4>
                <form onSubmit={this.onSubmit}>

                    <div>
                        <select className="browser-default custom-select" name="cosupervisor" id="cosupervisor"
                            onChange={this.onChangeCoSupervisor}
                            style={{
                                width:'25%',
                                marginBottom:'20px'
                            }}>
                            <option value="" selected>Choose</option>
                            <option value="Amal">Amal</option>
                            <option value="Kasun">Kasun</option>
                            <option value="Nimal">Nimal</option>
                            <option value="Supun">Supun</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
