import * as type from '../Constant/types';
import * as commonActions from './CommonActions';
import * as api from '../API/Query/PicturesAPI';

// GET profile picture
export const getPP = payload => ({
    type: type.PROFILEPICTURE,
    payload
});

// get cover photo
export const getCP = payload => ({
    type: type.COVERPHOTO,
    payload
});


// temp cover photo
export const getTempCP = payload => ({
    type: type.TEMPCOVERPHOTO,
    payload
});

// temp profile photo
export const getTempPP = payload => ({
    type: type.TEMPPROFILEPICTURE,
    payload
});

// clear recent path 
export const clearPP = payload =>
    dispatch => {
        dispatch(getTempCP(payload))
    };

export const clearCP = payload =>
    dispatch => {
        dispatch(getTempCP(payload))
    };


// save temp img
export const tempProfilePicture = payload =>
    dispatch => {
        dispatch(getTempPP(payload))
    };

export const tempCoverPhoto = payload =>
    dispatch => {
        dispatch(getTempCP(payload))
    };


export const retrieve_PP = (payload, user) =>
    dispatch => {
        
        dispatch(commonActions.loading(true))
        api.getProfilePicture(payload,user)
        .then(res => res.json())
        .then(res => {
            dispatch(getPP(res['path']))
            // dispatch(commonActions.getError(res['error']))
            // dispatch(commonActions.customMessaage(res['message']))
        })
        .then(() => {
            dispatch(commonActions.loading(false))
        }).catch((err) => {
            console.log(err.getMessage)
        })
}

export const retrieve_CP = (payload, user) =>
    dispatch => {
        
        dispatch(commonActions.loading(true))

        api.getCoverPhoto(payload,user)
        .then(res => res.json())
        .then(res => {
            dispatch(getCP(res['path']))
            // dispatch(commonActions.getError(res['error']))
            // dispatch(commonActions.customMessaage(res['message']))
        })
        .then(() => {
            dispatch(commonActions.loading(false))
        }).catch((err) => {
            console.log(err.getMessage)
        })
}