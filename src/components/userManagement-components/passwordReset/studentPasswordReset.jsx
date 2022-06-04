import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

export default function StudentPasswordReset() {

	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `https://mndexmgdhd.execute-api.us-east-2.amazonaws.com/student/password-reset/${param.id}/${param.token}`;

	//check valid URL or not
	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);


	const onsubmit = async (e) => {

		e.preventDefault();

		try {

			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/student-login";

		}
		catch (error) {

			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
				setMsg("");
			}

		}
	};


	return (

		<Fragment>

			{validUrl ? (

				<div style={{ marginTop: "-100px", marginLeft: "-200px" }} className={styles.container}>

					<form className={styles.form_container} onSubmit={onsubmit}>

						<h1>Add New Password</h1>

						<input
							type="password"
							placeholder="Password"
							name="password"
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
							title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>

						{/* display invalid password message */}
						{error && <div className={styles.err_msg}>{error}</div>}
						{/* display password reset success message */}
						{msg && <div className={styles.suc_msg}>{msg}</div>}

						<button type="submit" className={styles.g_btn}>
							Submit
						</button>

					</form>
				</div>
			) : (

				<h1>404 Not Found</h1>

			)}

		</Fragment>
	)
}
