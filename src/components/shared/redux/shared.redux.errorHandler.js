import Loader from './shared.redux.loader';

export const errorHandler = {
  type: 'errorHandler',
  action(error) {
    Loader.hideLoading.action();
    return {
      type: errorHandler.type,
      data: error,
    };
  },
  create() {
    return (dispatch) => {
      dispatch(errorHandler.action());
    };
  },
  get reducer() {
    return (state, data) =>
      ({
        ...state,
        error: data.data,
      });
  },
};
