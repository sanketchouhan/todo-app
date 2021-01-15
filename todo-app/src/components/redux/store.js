import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { user } from './user';
import { groups } from './groups'


export const ConfigureStore = () => {  

    const store = createStore(
        combineReducers(
            {
                user,
                groups
            }
        ),
        applyMiddleware(thunk)
    );

    return { store };
};