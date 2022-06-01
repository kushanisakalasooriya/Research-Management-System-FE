import React, {  useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export default function StudentForgotPassword() {

    const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");



    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/student/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};


  return (
    <div style={{ marginTop:"-100px", marginLeft: "-200px" }} className={styles.container}>
    <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={styles.input}
        />
        {error && <div className={styles.err_msg}>{error}</div>}
        {msg && <div className={styles.suc_msg}>{msg}</div>}
        <button type="submit" className={styles.g_btn}>
            Submit
        </button>
    </form>
</div>
  )
}
