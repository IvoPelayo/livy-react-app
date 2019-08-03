import xhr from './utils/apis.utils.xhr';
import { head, filter } from 'lodash';

const cityName = 'Brastlewark';

function getAllGnomes() {
  return xhr
    .get('/master/data.json')
    .then((response) => {
      return response.data[cityName];
    }).catch((e) => {
      Promise.reject(e);
    });
}

function getByNames(names, gnomes) {
 return filter(gnomes, (g) => names.indexOf(g.name) !== -1);
}

function getSingle(gnomeId) {
  return new Promise((resolve,reject) =>{
    getAllGnomes().then(gnomes => {
      let gnome = head(filter(gnomes, (g) => g.id === gnomeId));
      gnome.friends = getByNames(gnome.friends, gnomes);
      resolve(gnome);
    }).catch(e => reject(e));
  });
}

function getGridColumns() {
  return [
    {
      id: '',
      fieldType: 'image',
      name: 'thumbnail',
    },
    {
      id: 'name',
      fieldType: 'string',
      name: 'name',
    },
    {
      id: 'age',
      fieldType: 'number',
      name: 'age',
      unit: ' years',
    },
    {
      id: 'height',
      fieldType: 'float',
      name: 'height',
      unit: 'cm.',
    },
    {
      id: 'weight',
      fieldType: 'float',
      name: 'weight',
      unit: 'kg.',
    },
  ];
}

const GnomesApi = {
  getAllGnomes,
  getByNames,
  getGridColumns,
  getSingle,
};

export default GnomesApi;
