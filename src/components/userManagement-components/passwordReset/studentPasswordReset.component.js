import React, { Component, Fragment } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";






export default class StudentPasswordReset extends Component {

    constructor(props) {
        super(props);


        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            students: [],
            password: '',
            validUrl: true,
            msg: '',
            error: ''
        }

    }



    onChangeNewPassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    componentDidMount() {
        const verifyUrl = async () => {
            try {
                await axios.get(`https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/password-reset/${this.props.match.param.id}/${this.props.match.param.token}`);
                this.setState({
                    validUrl: true
                })


            } catch (error) {
                this.setState({
                    validUrl: false
                })
            }
        };
        verifyUrl();

        console.log("valid url" , this.state.validUrl);
    }


    // componentDidMount(){
    //     axios.get(`https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/password-reset//${this.props.match.param.id}/${this.props.match.param.token}`)
    //     .then(response => {
    //         this.setState({ students: response.data})
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    onSubmit(e) {
        e.preventDefault();
        const stdnewpassword = {
            password: this.state.password
        }
        console.log(stdnewpassword);

        try {
            const { data } = axios.post(`https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/password-reset/${this.props.match.params.id}/${this.props.match.params.token}/`, stdnewpassword)
                .then(res => console.log(res.data));
            this.setState({
                password: '',
                msg: data.message,
                error: ''
            })
            //navigate to login page
            this.props.history.push('/student-login');

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                this.setState({
                    error: error.response.data.message,
                    msg: ''
                })
            }
        }
    }


    render() {
        return (
            // <div style={{ marginLeft: "-200px" }} className={styles.container}>
            //     <form className={styles.form_container} onSubmit={this.onSubmit}>

            //         <h1>Reset Your Password</h1>

            //         <div className="form-group">
            //             <label>New Password: </label>
            //             <input type="password"
            //                 required
            //                 className="form-control"
            //                 value={this.state.password}
            //                 onChange={this.onChangeNewPassword}
            //             />
            //         </div>

            //         <button type="submit" className={styles.green_btn}>
            //             Submit
            //         </button>
            //     </form>
            // </div>
            
            <Fragment>
                    <div style={{ marginLeft: "-200px" }} className={styles.container}>
                        <form className={styles.form_container} onSubmit={this.onSubmit}>

                            <h1>Reset Your Password</h1>

                            <div className="form-group">
                                <label>New Password: </label>
                                <input type="password"
                                    required
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangeNewPassword}
                                />
                            </div>

                            <button type="submit" className={styles.green_btn}>
                                Submit
                            </button>
                        </form>
                    </div>
            </Fragment>
        )
    }
}


