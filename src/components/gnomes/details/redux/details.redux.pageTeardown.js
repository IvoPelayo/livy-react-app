import gnomesDetailState from './details.redux.initialState';

const gnomeDetailsPageTeardown = {
  type: 'gnomeDetailsPageTeardown',
  action() {
    return {
      type: gnomeDetailsPageTeardown.type,
    };
  },
  create() {
    return dispatch => dispatch(gnomeDetailsPageTeardown.action());
  },
  get reducer() {
    return state => ({
      ...state,
      gnomeDetail: {
        ...gnomesDetailState,
      },
    });
  },
};

const actions = {
  gnomeDetailsPageTeardown,
};

export default actions;
