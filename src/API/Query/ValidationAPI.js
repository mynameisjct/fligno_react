import * as endPoints from '../endpoints';
import {fetchApi} from '../index';

export const validateEMail = (payload,params) => fetchApi(endPoints.validation.email(params),payload,'post');