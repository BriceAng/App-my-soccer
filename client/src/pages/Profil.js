import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";


const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className="profil-page container">
            {uid ? (
                <UpdateProfil />
            ) : (
                <div className="log-container">
                    <Log signin={true} signup={false} />
                </div>
            )}
        </div>
    );
};

export default Profil;
