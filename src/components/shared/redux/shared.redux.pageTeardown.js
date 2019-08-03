import xhr from '../../../apis/utils/apis.utils.xhr';

export const pageTeardown = {
  type: 'pageTeardown',
  action() {
    return {
      type: pageTeardown.type,
    };
  },
  create() {
    xhr.cancelAll();
    return (dispatch) => {
      dispatch(pageTeardown.action());
    };
  },
  get reducer() {
    return state =>
      ({
        ...state,
        error: null,
      });
  },
};
