/* eslint-disable */
export function buildUrl(url) {
    return process.env === 'development' ? url : 'https://raw.githubusercontent.com/rrafols/mobile_test/' + url;
}
