import * as type from '../Constant/types';
import * as commonActions from './CommonActions';
import * as api from '../API/Query/RegisterAPI';

// GET USER DATA AFTER LOGGING IN
export const getUser = payload => ({
    type: type.USER,
    payload
});

//set uploaded profile picture to prop
export const setP = payload => ({
    type: type.PROFILEPICTURE,
    payload
});

//set uploaded cover photo to prop
export const setC = payload => ({
    type: type.COVERPHOTO,
    payload
});

export const setCoverPhoto = payload =>
    dispatch => {
        dispatch(setC(payload))
    };

export const savePicture = payload =>
    dispatch => {
        
        dispatch(commonActions.loading(true))

        console.log(payload)

        let data = new FormData();
        data.append('uploaded_file', payload.uploaded_file);
        data.append('email',payload.email);
        data.append('file_extension',payload.file_extension);
        data.append('type',payload.type);

        api.setPP(data)
        .then(res => res.json())
        .then(res => {
            dispatch(commonActions.getError(res['error']))
            dispatch(commonActions.customMessaage(res['message']))
        })
        .then(() => {
            dispatch(commonActions.loading(false))
        }).catch((err) => {
            console.log(err.getMessage)
        })
}

export const save = payload => 
    dispatch => {
        dispatch(commonActions.loading(true));

        api.register(payload)
        .then(res => res.json())
        .then(res => {
            dispatch(commonActions.getError(res['error']))
            dispatch(commonActions.customMessaage(res['message']))
        })
        .then(() => {
            dispatch(commonActions.loading(false))
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
