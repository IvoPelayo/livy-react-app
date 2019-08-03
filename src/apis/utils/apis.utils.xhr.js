import { buildUrl } from './utils.url.buildUrl';
import Axios from 'axios';

export default {
  get(url, params) {
    const newParams = params || {};
    if (!newParams.requestId) {
      newParams.requestId = url;
    }
    return Axios.get(buildUrl(url), newParams);
  },
  cancelAll() {
    Axios.cancelAll();
  },
  isCancelled(thrown) {
    return Axios.isCancel(thrown);
  },
};
