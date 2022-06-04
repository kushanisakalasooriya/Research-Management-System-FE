import React, { Component } from 'react';
import axios from 'axios';

export default class EditMarkingScheme extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: ''
    }
  }

  componentDidMount() {
    axios.get('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/admin/marking/getFile/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,

        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const file = {
      title: this.state.title,
      description: this.state.description,
    }

    axios.post('https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/admin/marking/update/' + this.props.match.params.id, file)
      .then(res => console.log(res.data));

    window.location = '/admin-marking-download';
  }

  render() {
    return (
    <div>
      <h3>Edit File - Admin</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input ref="userInput"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}/>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Update File" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}