import { uniq, map, flatten, min, max } from 'lodash';
import { round } from '../../../shared/utils/utils.numeric';

export function getPopulationInfo(data){
  return {
    hairColors: uniq(map(data, 'hair_color')),
    minWeight: round(min(map(data, 'weight'))),
    maxWeight: round(max(map(data, 'weight')),'top'),
    minHeight: round(min(map(data, 'height'))),
    maxHeight: round(max(map(data, 'height')),'top'),
    minAge: round(min(map(data, 'age'))),
    maxAge: round(max(map(data, 'age')),'top'),
    professions: uniq(flatten(map(data, 'professions'))),
  };
}
