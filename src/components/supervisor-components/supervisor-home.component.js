import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './supervisor-home-mod.css';

export default class SupervisorHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
        }

    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(sessionStorage.getItem("loggeduser")),
        })
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div>

                <header className="section " style={{ marginBottom: '20px' }}>
                    <section className="full-width ">

                        <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h2>  Supervisor Home  </h2> </div>

                        <Link
                            to={"/employee-profile/" + this.state.user._id}
                            className="nav-link"
                        >
                            <div style={{ marginBottom: "40px" }}>
                                <img
                                    style={{ width: "40px", height: "40px", float: "right", borderRadius: "50px" }}
                                    src={this.state.user.image}
                                ></img>
                            </div>
                        </Link>

                        <center>
                            <div className="laddBtn">
                                <Link to="/supervisor-topics"><button >Accept Topics</button></Link>
                            </div><br />
                            <div className="laddBtn">
                                <Link to="/supervisor-research"><button >Accept Research</button></Link>
                            </div>
                            {/* <div className="laddBtn">
                                <Link to="/supervisor-std-groups"><button >Accept Groups</button></Link>
                            </div> */}
                            <div className="lModBtn">
                                <Link to="/supervisor-chat"><button>Chat with Students</button></Link>
                            </div>
                            <div className="lReportBtn">
                                <Link to="/mscheme-download"><button>Evaluate documents</button></Link>
                            </div>
                        </center>

                    </section>
                </header>

            </div>
        );
    }
}