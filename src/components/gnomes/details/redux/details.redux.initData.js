import GnomesApi from '../../../../apis/apis.gnomes';
import Loader from '../../../shared/redux/shared.redux.loader';

const gnomesDetailsInitData = {
  type: 'gnomesDetailsInitData',
  action(gnomeId) {
    return (dispatch) => {
      dispatch(Loader.showLoading.action());
      return GnomesApi.getSingle(gnomeId).then(gnome =>{
        dispatch({
          type: gnomesDetailsInitData.type,
          data: gnome,
        });
        dispatch(Loader.hideLoading.action());
      }).catch(dispatch(Loader.hideLoading.action()));
    }
  },
  get reducer() {
    return (state, data) => {
      return ({
        ...state,
        gnomeDetails: data.data,
      });
    };
  },
};

const actions = {
  gnomesDetailsInitData,
};

export default actions;
