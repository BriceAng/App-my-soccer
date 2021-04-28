import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";


const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const usernameError = document.querySelector(".username.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
            ".password-confirm.error"
        );
        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML =
                    "Les mots de passe ne correspondent pas";

            if (!terms.checked)
                termsError.innerHTML = "Veuillez valider les conditions générales";
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    username,
                    email,
                    password,
                },
            })
                .then((res) => {
                    if (res.data.errors) {
                        usernameError.innerHTML = res.data.errors.username;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <span></span>
                    <h4 className="succes">Enregistrement réussi</h4>
                    <SignInForm />
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <br />
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-fill"></i></span>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setusername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="username error"></div>
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-at"></i></span>
                        <input
                            type="text"
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
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-unlock-fill"></i></span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="password error"></div>
                    <br />
                    <label htmlFor="password-conf">Confirmer mot de passe</label>
                    <br />
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock-fill"></i></span>
                        <input
                            type="password"
                            name="password"
                            id="password-conf"
                            onChange={(e) => setControlPassword(e.target.value)}
                            value={controlPassword}
                        />
                    </div>
                    <div className="password-confirm error"></div>
                    <br />
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        J'accepte les{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            conditions générales
            </a>
                    </label>
                    <div className="terms error"></div>
                    <br />
                    <input type="submit" value="S'inscrire" className="btn btn-warning" />
                </form>
            )}
        </>
    );
};

export default SignUpForm;
