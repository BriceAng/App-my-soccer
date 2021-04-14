import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = ( props ) => {
    const [signInModal, setSignInModal] = useState(props.signin);
    const [signUpModal, setSignUpModal] = useState(props.signup);

const handleModals = (e) => {
    if (e.target.id === "register") {
        setSignInModal(false);
        setSignUpModal(true);
    } else if (e.target.id === "login") {
        setSignInModal(true);
        setSignUpModal(false);
    }
}

    return (
        <div className="card form-connection">
            <div className="card-header">
                {signInModal && <h1>Connexion</h1>}
                {signUpModal && <h1>Inscription</h1>}
            </div>

            <div className="card-body">
                <div className={ signInModal ? "signInForm " : "signUpForm" }> 
                    {signInModal && <SignInForm />}
                    {signUpModal && <SignUpForm />}
                </div>

                <div className="setModal">
                    { signInModal && <p onClick={handleModals} id="register">Inscription</p>}
                    { signUpModal && <p onClick={handleModals} id="login">Connexion</p>}
                </div>
            </div>
        </div>
    );
};

export default Log;