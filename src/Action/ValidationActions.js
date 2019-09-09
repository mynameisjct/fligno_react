import * as type from '../Constant/types';
import * as commonActions from './CommonActions';
import * as api from '../API/Query/ValidationAPI';

// GET USER DATA AFTER LOGGING IN
export const emailValidation = payload => ({
    type: type.VALIDATION,
    payload
});

export const checkEmailFormat = payload =>
    dispatch => {
        
        dispatch(commonActions.loading(true))

        api.validateEMail(payload)
        .then(res => res.json())
        .then(res => {
            dispatch(emailValidation(res['validation']))
        })
        .then(() => {
            dispatch(commonActions.loading(false))
        }).catch((err) => {
            console.log(err.getMessage)
        })
}