import * as ActionTypes from './actionTypes';

export const user = (state = {
        isLoading: false,
        errMess: null,
        user: null
    }, action) => {

        switch(action.type) {
            case ActionTypes.ADD_USER:
                return {...state, isLoading: false, errMess: null, user: action.payload};

            case ActionTypes.USER_LOADING:
                return {...state, isLoading: true, errMess: null, user:null};

            case ActionTypes.USER_FAILED:
                return {...state, isLoading: false, errMess: action.payload, user:null};

            default:
                return state;
        }
    };