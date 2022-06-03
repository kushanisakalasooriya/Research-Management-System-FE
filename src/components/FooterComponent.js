import React, { Component } from 'react';
import './common.css';
class FooterComponent extends Component {

    render() {
        return (
            <div>

                <footer class="site-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <h6>About</h6>
                                <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
                            </div>

                            <div class="col-xs-6 col-md-3">
                                <h6>Categories</h6>
                                <ul class="footer-links">
                                    <li><a href="#">C</a></li>
                                    <li><a href="#">UI Design</a></li>
                                    <li><a href="#">PHP</a></li>
                                    <li><a href="#">Java</a></li>
                                    <li><a href="#">Android</a></li>
                                    <li><a href="#">Templates</a></li>
                                </ul>
                            </div>

                            <div class="col-xs-6 col-md-3">
                                <h6>Contacts</h6>
                                <ul class="footer-links">
                                    <li><a href="#">afrmtp@researchmanagement.com</a></li>
                                    <li><a href="#">afmtp.com</a></li>
                                    <li><a href="#">081 2321 844</a></li>
                                    <li><a href="#">077 3542 564</a></li>
                                    <li><a href="#">072 5476 465</a></li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 col-sm-6 col-xs-12">
                                <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by <a href="#">AFMTP</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}

export default FooterComponent;