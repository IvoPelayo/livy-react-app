import gnomeListInitialState from './list.redux.initialState';

const gnomesListPageTeardown = {
  type: 'gnomesListPageTeardown',
  action() {
    return {
      type: gnomesListPageTeardown.type,
    };
  },
  create() {
    return dispatch => dispatch(gnomesListPageTeardown.action());
  },
  get reducer() {
    return state => ({
      ...state,
      gnomeList: {
        ...gnomeListInitialState,
        cachedItems: state.gnomeList.cachedItems,
      },
    });
  },
};

const actions = {
  gnomesListPageTeardown,
};

export default actions;
