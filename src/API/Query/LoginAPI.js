import * as endPoints from '../endpoints';
import {fetchApi, mockFetch} from '../index';

export const getBaseLogin = (payload,params) => fetchApi(endPoints.login.get(params),payload,'get');
export const postLogin = (payload,params) => fetchApi(endPoints.login.post(params),payload,'post');
export const test = (payload,params) => fetchApi(endPoints.login.test(params),payload,'post');

// export const get = payload => mockFetch(endPoints.login.get(payload),payload,'get');
// export const post = payload => mockFetch(endPoints.login.post(payload),payload,'post',{},true);