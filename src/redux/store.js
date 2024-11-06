import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux'; // Import combineReducers
import authReducer from './reducers/authReducer';
import fleetReducer from './reducers/fleetReducer';
import ltoReducer from './reducers/ltoReducer';
import userReducer from './reducers/userReducer';
import reportReducer from './reducers/reportReducer';
import formsReducer from './reducers/formsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  fleet: fleetReducer,
  lto: ltoReducer,
  user: userReducer,
  report: reportReducer,
  forms: formsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
