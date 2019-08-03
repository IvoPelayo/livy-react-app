
import { filter, flatten, some, orderBy } from 'lodash';
import Loader from './../../../../components/shared/redux/shared.redux.loader';

const filterGnomeList = {
  type: 'filterGnomeList',
  action() {
    return (dispatch, getState) => {
      const { filters, cachedItems } = getState().gnomes.gnomesList;
      dispatch(Loader.showLoading.action());
      dispatch({
        type: filterGnomeList.type,
        data: filterGnomeList.getResultData(filters, cachedItems),
      });
      dispatch(Loader.hideLoading.action());
    }
  },
  getResultData(filters, gnomes) {
    if(gnomes && gnomes.length){
      Object.keys(filters).forEach((key) => {
        if(filters[key]){
          switch(typeof filters[key]){
            case 'string':
              if(filters[key].length > 0){
                if(key === 'partialDescription'){
                  gnomes = filter(gnomes, (g) => {
                    let stringData = [
                      g.name,
                      g.hair_color,
                      ...flatten(g.professions)
                    ];
                    return some(stringData, (val) => val.toLowerCase().indexOf(filters[key].toLowerCase()) !== -1) });
                }
                else if(key === 'orderBy'){
                  gnomes = orderBy(gnomes, filters[key], filters.orderByDirection);
                }
                else if((typeof gnomes[0][key]) == 'string'){
                  gnomes = filter(gnomes, (g) => g[key] === filters[key]);
                }
                else if((typeof gnomes[0][key]) == 'object'){
                  gnomes = filter(gnomes, (g) => g[key].indexOf(filters[key]) !== -1);
                }
              }
            break;
            case 'number':
              gnomes = filter(gnomes, (g) => g[key] <= filters[key]);
            break;
            default: break;
          }
        }
      });
    }
    return gnomes;
  },
  create() {
    return (dispatch) => {
      dispatch(filterGnomeList.action());
    };
  },
  get reducer() {
    return (state, data) => {
      return ({
        ...state,
        gnomesList: {
          ...state.gnomesList,
          items: data.data,
        },
      });
    };
  },
};

const resetGnomeListFilters = {
  type: 'resetGnomeListFilters',
  action() {
    return (dispatch, getState) => {
      const { cachedItems } = getState().gnomes.gnomesList;
      dispatch(Loader.showLoading.action());
      dispatch({
        type: resetGnomeListFilters.type,
        data: cachedItems,
      });
      dispatch(Loader.hideLoading.action());
    }
  },
  create() {
    return (dispatch) => {
      dispatch(resetGnomeListFilters.action());
    };
  },
  get reducer() {
    return (state, data) => {
      return ({
        ...state,
        gnomesList: {
          ...state.gnomesList,
          filters: {},
          items: data.data,
        },
      });
    };
  },
};

const actions = {
  filterGnomeList,
  resetGnomeListFilters,
};

export default actions;
