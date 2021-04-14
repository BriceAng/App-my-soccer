import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-in-form">
            <label htmlFor="email">Email</label>
            <br />
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1"><i className="bi bi-at"></i></span>
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock-fill"></i></span>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className="password error"></div>
            <br />
            <input type="submit" value="Se connecter" className="btn btn-warning" />
        </form>

    )
};

export default SignInForm;