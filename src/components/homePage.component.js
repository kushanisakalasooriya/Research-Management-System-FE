import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './supervisor-components/supervisor-home-mod.css';

export default class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }

  }

  render() {
    return (
      <div>


        <div className="homeTopic" style={{ marginBottom: "30px" }}> <h2>  Research management tool </h2> </div>

        <div class="row">

          <div class="col">
            <img style={{ width: "700px", height: "500px" }} src="https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
          </div>

          <div class="col">

            <p className='stdPara'>All SLIIT undergraduates must do a research project in their 4th year.
              This Research Project module is a 16 credit, two semesters long project.
              A student group must find a research topic in a specific research field and send it to a supervisor who has interests in the same research field.
              Once the supervisor accepted the topic, they must find a co-supervisor of the same research interest.</p>
            <center>
              <div className="homeStdBtn">
                <Link to="/student-login"><button >Students</button></Link>
              </div>
            </center>

            <hr></hr>
            <p className='empPara'>After finalizing the supervisor student must send a document including the topic details of the Research.
              Then topic evaluation panel will evaluate the topic and send feedback to the student group.
              If the topic is accepted, they can continue to do the project.
              If rejected, they must find a new topic and submit it back.</p>
            <center>
              <div className="homeEmpBtn">
                <Link to="/employee-login"><button>Employee</button></Link>
              </div>
            </center>


          </div>

        </div>









      </div>
    )
  }
}
