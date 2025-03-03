import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import AuthReducer from './AuthReducer';
import WorkshopReducer from './Workshopreducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    workshop: WorkshopReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
