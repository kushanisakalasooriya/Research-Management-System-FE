import React, { Component } from 'react'
import axios from 'axios';

export default class regResearchTopic extends Component {
    constructor(props) {
        super(props);

        this.onChangeResearchTopic = this.onChangeResearchTopic.bind(this);
        this.onChangeSupervisor = this.onChangeSupervisor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            groupname: '',
            researchTopic: '',
            supervisor: '',
            status:'' 
        }
    }

    onChangeResearchTopic(e) {
        this.setState({
            researchTopic: e.target.value
        });
    }

    onChangeSupervisor(e) {
        this.setState({
            supervisor: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const topic = {
            groupname: 'm',
            researchTopic: this.state.researchTopic,
            status:'pending' 
        }
        console.log(topic);

        axios.post('http://localhost:5000/supervisor/topic/add', topic)
            .then(res => console.log(res.data));

        const updateSupervisor = {
            groupname: 'm',
            supervisor: this.state.supervisor,
        }
        console.log(updateSupervisor);

        axios.post('http://localhost:5000/groups/update/supervisor', updateSupervisor)
            .then(res => console.log(res.data));

        this.setState({
            researchTopic: '',
            supervisor: '',
            groupname: '',
            status:''    
        }) 
    }

  render() {
    return (
      <div>
        <h3> Register the research Topic</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Research Topic : </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.researchTopic}
                            onChange={this.onChangeResearchTopic}
                        />
                    </div>

                    <div>
                            <select name="supervisor" id="supervisor"
                                onChange={this.onChangeSupervisor}>
                                <option value="" selected>Choose</option>
                                <option value="Janith">Janith - IOT</option>
                                <option value="Sahan">Sahan - AI </option>
                                <option value="Poorna">Poorna - AI</option>
                                <option value="Eranda">Eranda - WEB</option>
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
