import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {quoteCatcherReducer} from './reducers/index';
import thunk from 'redux-thunk';


const store = createStore(
  combineReducers({
    quoteCatcherReducer,
    form: formReducer
  }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;