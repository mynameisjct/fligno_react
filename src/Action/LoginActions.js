import * as type from '../Constant/types';
import * as commonActions from './CommonActions';
import * as api from '../API/Query/LoginAPI';

// GET USER DATA AFTER LOGGING IN
export const getUser = payload => ({
    type: type.USER,
    payload
});

// GET USER ID
export const getID = payload => ({
    type: type.USERID,
    payload
});

// GET LAST USER WHO ACCESS THE APP
export const getLastUser = payload => ({
    type: type.LASTUSER,
    payload
});

export const signin = payload =>
    dispatch => {
        dispatch(commonActions.loading(true))

        api.postLogin(payload)
        .then(response => response.json())
        .then(response => {
            dispatch(commonActions.getError(response['error']));
            if(response['success']){
                // expect user and id response
                dispatch(getUser(response['user']));
                dispatch(getID(response['id'])); 
            }
        })
        .then(() => {
            dispatch(commonActions.loading(false));
        })
        .catch((err) => {
            console.log('There was some error in signin: ' + err.message)
        })
    }

export const getLogin = params =>
    dispatch => {
      //  let stateValue = [];

        dispatch(commonActions.loading(true));

        api.getBaseLogin(params)
        .then((res) => res.json())
        .then((res) => {
            dispatch(getLastUser(res['last_username']));
            dispatch(commonActions.getError(res['error']));
        })
        .then(() => {
            dispatch(commonActions.loading(false));
        })
        .catch((err) => {
            console.log('There was some error: ' + err.message)
        })
}
