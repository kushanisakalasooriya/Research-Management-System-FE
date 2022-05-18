import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './panel-home-mod.css';

export default class PanelHome extends Component {

    render() {
        return (
            <div>
                <header className="section " style={{ marginBottom: '20px' }}>
                    <section className="full-width ">

                        <div className="headingModsLand" style={{ marginBottom: "30px", marginTop: "20px" }}> <h1>  Panel Member Home  </h1> </div>

                        <center>
                            <div className="laddBtn">
                                <Link to="/supervisor-std-groups"><button >Evaluate Topics</button></Link>
                            </div>
                            <div className="lModBtn">
                                <Link to="#"><button>Evaluate Presentation</button></Link>
                            </div>
                        </center>

                    </section>
                </header>

            </div>
        );
    }
}