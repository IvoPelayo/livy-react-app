import { handleActions } from 'redux-actions';
import loaderReducers from './../../components/shared/redux/shared.redux.loader';

import gnomesListInitDataReducers from './../../components/gnomes/list/redux/list.redux.initData';
import gnomesListFilterReducers from './../../components/gnomes/list/redux/list.redux.filters';
import gnomesListTeardownReducer from './../../components/gnomes/list/redux/list.redux.pageTeardown';

import gnomeDetailsInitDataReducers from './../../components/gnomes/details/redux/details.redux.initData';
import gnomeDetailsTeardownReducer from './../../components/gnomes/details/redux/details.redux.pageTeardown';
import { handleActionsExt } from './utils.redux.handleActionsExt';
import gnomesListState from './../../components/gnomes/list/redux/list.redux.initialState';
import gnomesDetailState from '../../components/gnomes/details/redux/details.redux.initialState';

const initialState = {
  gnomesList: gnomesListState,
  gnomeDetails: gnomesDetailState,
  error: {},
  isLoading: false,
};

const gnomes = handleActions(
  {
    ...handleActionsExt(loaderReducers),
    ...handleActionsExt(gnomesListInitDataReducers),
    ...handleActionsExt(gnomesListFilterReducers),
    ...handleActionsExt(gnomesListTeardownReducer),
    ...handleActionsExt(gnomeDetailsInitDataReducers),
    ...handleActionsExt(gnomeDetailsTeardownReducer),
  },
  initialState
);

export default gnomes;
