import * as ActionTypes from './actionTypes';

export const groups = (state = {
        isLoading: false,
        errMess: null,
        groups: null
    }, action) => {

        switch(action.type) {
            case ActionTypes.ADD_GROUP:
                return {...state, isLoading: false, errMess: null, groups: action.payload};

            case ActionTypes.GROUPS_LOADING:
                return {...state, isLoading: true, errMess: null};

            case ActionTypes.GROUP_FAILED:
                return {...state, isLoading: false, errMess: action.payload, groups:null};

            default:
                return state;
        }
    };