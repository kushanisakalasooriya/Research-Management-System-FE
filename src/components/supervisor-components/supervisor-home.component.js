import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './supervisor-home-mod.css';

export default class SupervisorHome extends Component {

    render() {
        return (
            <div>
                <header className="section " style={{ marginBottom: '20px' }}>
                    <section className="full-width ">

                        <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h1>  Supervisor Home  </h1> </div>

                        <center>
                            <div className="laddBtn">
                                <Link to="/supervisor-topics"><button >Accept Topics</button></Link>
                            </div>
                            <div className="lModBtn">
                                <Link to="#"><button>Chat with Students</button></Link>
                            </div>
                            <div className="lReportBtn">
                                <button onClick={this.onClickReportV}>Evaluate documents</button>
                            </div>
                        </center>

                    </section>
                </header>

            </div>
        );
    }
}