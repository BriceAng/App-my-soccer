import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import teamsReducer from './teams.reducer';
import citiesReducer from './cities.reducer';

export default combineReducers({
    userReducer,
    teamsReducer,
    citiesReducer,
});