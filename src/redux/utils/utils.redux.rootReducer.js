import { combineReducers } from 'redux';
import gnomes from './utils.redux.handleActionsReducersState';

const rootReducer = combineReducers({
  gnomes,
});

export default rootReducer;
