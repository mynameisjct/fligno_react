import * as endPoints from '../endpoints';
import {fetchApi, fetchUploadAPI} from '../index';

export const register = (payload,params) => fetchApi(endPoints.register.save(params),payload,'post');
export const setPP = (payload,params) => fetchUploadAPI(endPoints.register.uploadProfilePicture(params),payload,'post');

