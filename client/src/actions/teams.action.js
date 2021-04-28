import axios from 'axios';

export const GET_TEAMS = 'GET_TEAMS';


// get all teams 
export const getTeams = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/team`)
            .then((res) => {
                dispatch({ type: GET_TEAMS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addTeam = (data) => {
    return (dispatch) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/team/`, data)
    };
}