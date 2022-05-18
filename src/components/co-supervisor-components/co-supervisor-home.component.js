import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './co-supervisor-home-mod.css';

export default class CoSupervisorHome extends Component {

    render() {
        return (
            <div>
                <header className="section " style={{ marginBottom: '20px' }}>
                    <section className="full-width ">

                        <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h1>  Co-Supervisor Home  </h1> </div>

                        <center>
                            <div className="lReportBtn">
                                <Link to="/supervisor-std-groups"><button >Accept Groups</button></Link>
                            </div>
                        </center>

                    </section>
                </header>

            </div>
        );
    }
}