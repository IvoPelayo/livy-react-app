const showLoading = {
  type: 'showLoading',
  action() {
    return { type: showLoading.type };
  },
};

const hideLoading = {
  type: 'hideLoading',
  action() {
    return { type: hideLoading.type };
  },
};

const updateLoading = {
  type: 'updateLoading',
  action(isLoading) {
    return {
      type: updateLoading.type,
      isLoading,
    };
  },
  get reducer() {
    return (state, { isLoading }) => ({
      ...state,
      isLoading,
    });
  },
};

const actions = {
  showLoading,
  hideLoading,
  updateLoading,
};

export default actions;
