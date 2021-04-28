import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from '../../actions/user.actions';
import RequestTeam from '../team/RequestTeam';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const teamsData = useSelector((state) => state.teamsReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

    return (
        <div className="profil-container">
            <h1>Profil de {userData.username}</h1>
            <div className="profil-body">
                <div className="left-part col-lg-4">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />

                </div>
                <div className="rigth-part col-lg-8">
                    <h3>Bio</h3>
                    {updateForm === false && (
                        <>
                            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                            <button className="btn btn-warning" onClick={() => setUpdateForm(!updateForm)} >Modifier</button>
                        </>
                    )}
                    {updateForm && (
                        <>
                            <textarea
                                type="text"
                                defaultValue={userData.bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                            <button className="btn btn-outline-warning" onClick={handleUpdate}>Valider modifications</button>
                        </>
                    )}

                    <h3>Équipe</h3>
                    <div className="request-team" >
                        {console.log(userData)}
                        {teamsData ? (
                            <>
                                {userData.team ? (
                                    <div>vous avez une équipe</div>
                                ) : (
                                    <>
                                        <h5>Demande pour rejoindre une équipe : {userData.waitList ? userData.waitList.length : ""}</h5>
                                        <RequestTeam userData={userData} />
                                    </>
                                )}

                            </>
                        ) : (
                            <div>Loading...</div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;