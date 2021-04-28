import axios from 'axios';

export const GET_CITIES = "GET_CITIES";

export const getCities = () => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/city`)
        .then((res) => {
            dispatch({ type : GET_CITIES, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
};