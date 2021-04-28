import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import { addTeam } from '../../actions/teams.action';


const TeamForm = () => {

    const cities = [
        { value: "Paris", label: "Paris" },
        { value: "Rennes", label: "Rennes" },
        { value: "Nantes", label: "Nantes" },
        { value: "Brest", label: "Brest" }
    ]
    
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [selectedOption, setSelectedOption] = useState(null); // City Selected
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setSelectedOption(e);
    }
    const handleTeam = async () => {

        if (name && selectedOption) {
            const data = new FormData();
            data.append('leadId', userData._id);
            data.append('name', name);
            data.append('cityId', selectedOption);

            await dispatch(addTeam(data));
        } else {
            alert("Veuillez remplir les champs")
        }
    }

    useEffect(() => {
        if ( !isEmpty(userData)) setIsLoading(false);
    }, [userData])

    return (
        <div className="container" >
            {isLoading ? (
                <h2>Chargement</h2>
            ) : (
                <form action="">
                <div className="form-group">
                    <label htmlFor="name">Nom d'équipe</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cityId">Votre ville</label>
                    <Select
                        id="cityId"
                        name='cityId'
                        placeholder="Selectionner votre ville"
                        value={selectedOption} // set selected City
                        options={cities} //set list of cities
                        onChange={handleChange} //assign onChange function
                    />
                </div>
                <button onClick={handleTeam} className="btn btn-primary">Valider</button>
            </form>
            )}
            
        </div>
    );
};

export default TeamForm;

