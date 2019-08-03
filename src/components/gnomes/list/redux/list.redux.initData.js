import { getPopulationInfo } from './list.redux.utils';
import Loader from './../../../../components/shared/redux/shared.redux.loader';
import GnomesApi from './../../../../apis/apis.gnomes';
import { errorHandler } from './../../../shared/redux/shared.redux.errorHandler';

const getGnomeListColumns = {
  type: 'getGnomeListColumns',
  action() {
    return dispatch => (   
        dispatch({
          type: getGnomeListColumns.type,
          columns: GnomesApi.getGridColumns(),
        })
    );
  },
  create() {
    return (dispatch) => {
      dispatch(getGnomeListColumns.action());
    };
  },
  get reducer() {
    return (state, data) => {
      const { columns } = data;
      return {
        ...state,
        gnomesList: {
          ...state.gnomesList,
          columns,
          }
      };
    };
  },
};

const gnomesListInitData = {
  type: 'gnomesListInitData',
  action() {
    return (dispatch) => {
      dispatch(Loader.showLoading.action());
      dispatch(getGnomeListColumns.action());
      return GnomesApi.getAllGnomes()
        .then(data => {
          dispatch({
            type: gnomesListInitData.type,
            gnomes: data,
          });
          dispatch(Loader.hideLoading.action());
        }).catch((e) => dispatch(errorHandler.action(e)));
      }
  },
  create() {
    return (dispatch) => {
      dispatch(gnomesListInitData.action());
    };
  },
  get reducer() {
    return (state, data) => {
      const { gnomes } = data;
      const populationInfo = getPopulationInfo(gnomes);
      return ({
        ...state,
        gnomesList: {
          ...state.gnomesList,
          populationInfo,
          ...{ items: gnomes, cachedItems: gnomes },
        },
      });
    };
  },
};

const actions = {
  gnomesListInitData,
  getGnomeListColumns,
};

export default actions;
