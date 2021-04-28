import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/index.scss";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getTeams } from './actions/teams.action';
import { getCities } from './actions/city.action';


//dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

store.dispatch(getTeams());
store.dispatch(getCities());



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
