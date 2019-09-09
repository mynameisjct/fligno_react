import * as type from '../Constant/types';
import * as commonActions from './CommonActions';
import * as api from '../API/Query/ProfileAPI';

// get all profile data
export const getData = payload => ({
    type: type.GETPROFILES,
    payload
});

export const fetchProfiles = (payload, user) =>
dispatch => {
    
    dispatch(commonActions.loading(true))

    api.getProfileData(payload,user)
    .then(res => res.json())
    .then(res => {
        dispatch(getData(res))
    })
    .then(() => {
        dispatch(commonActions.loading(false))
    }).catch((err) => {
        console.log(err.getMessage)
    })
}

export const deleteProfiles = (payload) =>
dispatch => {
    
    dispatch(commonActions.loading(true))

    api.deleteProfile(payload)
    .then(res => res.json())
    .then(res => {
        dispatch(commonActions.customMessaage(res['message']))
        dispatch(commonActions.errorMessaage(res['error']))
    })
    .then(() => {
        dispatch(commonActions.loading(false))
    }).catch((err) => {
        console.log(err.getMessage)
    })
}