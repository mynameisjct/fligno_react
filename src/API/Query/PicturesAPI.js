import * as endPoints from '../endpoints';
import {fetchApi} from '../index';

export const getProfilePicture = (payload,params) => fetchApi(endPoints.picture.profile(params),payload,'get');
export const getCoverPhoto = (payload,params) => fetchApi(endPoints.picture.cover(params),payload,'get');

