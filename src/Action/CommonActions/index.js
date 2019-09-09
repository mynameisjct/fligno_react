import * as type from '../../Constant/types';

// GET FETCH ERRORS
export const getError = payload => ({
    type: type.ERROR_MESSAGES,
    payload
});


// LOADING
export const loading = payload => ({
    type: type.LOADING,
    payload
});

// CUSTOM MESSAGES
export const customMessaage = payload => ({
    type: type.CUSTOMMESSAGE,
    payload
})

// ERROR MESSAGES
export const errorMessaage = payload => ({
    type: type.ERROR_MESSAGES,
    payload
})

//DISPATCH CUSTOM MESSAGE TO EMPTY
export const resetMessage = payload =>
    dispatch => {
        dispatch(customMessaage(''))
    };

//DISPATCH ERROR MESSAGE TO EMPTY
export const resetErrorMessage = payload =>
    dispatch => {
        dispatch(errorMessaage(''))
    };