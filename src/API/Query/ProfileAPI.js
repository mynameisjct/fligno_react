import * as endPoints from '../endpoints';
import {fetchApi} from '../index';

export const getProfileData = (payload,params) => fetchApi(endPoints.profiles.all(params),payload,'get');
export const deleteProfile = (payload,params) => fetchApi(endPoints.profiles.delete(params),payload,'post');