import * as todo from '../Constant/types';
import {combineReducers} from 'redux';

export const profiles = (state = [], action) => {
    switch(action.type){
        case todo.GETPROFILES:
            return action.payload;
        default:
            return state;
    }
}

export const userDetails = (state = null,action) => {
    switch(action.type){
        case todo.USER:
            return action.payload;
        default:
            return state;
    }
}

export const UID = (state = null,action) => {
    switch(action.type){
        case todo.USERID:
            return action.payload;
        default:
            return state;
    }
}

export const profilepic = (state = null,action) => {
    switch(action.type){
        case todo.PROFILEPICTURE:
            return action.payload;
        default:
            return state;
    }
}

export const coverpht = (state = null,action) => {
    switch(action.type){
        case todo.COVERPHOTO:
            return action.payload;
        default:
            return state;
    }
}

export const tempprofilepic = (state = null,action) => {
    switch(action.type){
        case todo.TEMPPROFILEPICTURE:
            return action.payload;
        default:
            return state;
    }
}

export const tempcoverpht = (state = null,action) => {
    switch(action.type){
        case todo.TEMPCOVERPHOTO:
            return action.payload;
        default:
            return state;
    }
}

export const errorMessages = (state = null, action) => {
    switch(action.type){
        case todo.ERROR_MESSAGES:
            return action.payload;
        default:
            return state;
    }
}

export const customMessages = (state = '', action) => {
    switch(action.type){
        case todo.CUSTOMMESSAGE:
            return action.payload;
        default:
            return state;
    }
}

export const validate = (state = true, action) => {
    switch(action.type){
        case todo.VALIDATION:
            return action.payload;
        default:
            return state;
    }
}

export const loadmask = (state = false,action) => {
    switch(action.type){
        case todo.LOADING:
            return action.payload
        default: return state;
    }
}

const rootReducer = combineReducers({
    user: userDetails,
    userid: UID,
    errorMessage: errorMessages,
    customMessage: customMessages,
    loadmask: loadmask,
    pofilePicture: profilepic,
    coverPhoto: coverpht,
    validation: validate,
    tempProfilePicture: tempprofilepic,
    tempCoverPhoto: tempcoverpht,
    profile_data: profiles,
});

export default rootReducer;