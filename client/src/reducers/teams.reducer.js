import { GET_TEAMS } from "../actions/teams.action";


const initialState = {};

export default function teamsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TEAMS:
            return action.payload;
        default:
            return state;
    }
}