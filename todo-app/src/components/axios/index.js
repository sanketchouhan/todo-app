import axios from 'axios';
import * as actionTypes from '../redux/actionTypes';

// url
const ulr = ''

//login user
export const loginUser = (name, password) => dispatch =>{
    dispatch(userLoading());
    axios.post(`${ulr}/users/login` , {name: name , password: password})
    .then(res => {
        dispatch(addUser(res.data));
      })
      .catch(err => {
        dispatch(userFailed(err.message));
      });
}

//register user
export const registerUser = (name, password) => dispatch => {
    dispatch(userLoading());
    axios.post(`${ulr}/users/register` , {name: name , password: password})
    .then(res => {
        dispatch(addUser(res.data));
    })
      .catch(err => {
        dispatch(userFailed(err.message));
    });
}

const userLoading = () =>({
    type: actionTypes.USER_LOADING,
});

const userFailed = (errMess) => ({
    type: actionTypes.USER_FAILED,
    payload: errMess
});

const addUser = (user) => ({
    type: actionTypes.ADD_USER,
    payload: user
});



// get all groups and tasks 
export const getGroups = (userId) => dispatch => {
    dispatch(groupsLoading());
    axios.post(`${ulr}/groups/all` , {userId: userId})
    .then(res => {
        dispatch(addGroups(res.data));
    })
      .catch(err => {
        dispatch(groupsFailed(err.message));
    });
}

// add group
export const addGroup = (name, userId) => dispatch => {
    dispatch(groupsLoading());
        axios.post(`${ulr}/groups` , {userId: userId, name: name})
        .then(res => {
            dispatch(addGroups(res.data));
        })
          .catch(err => {
            dispatch(groupsFailed(err.message));
        });
}

// edit group
export const updateGroup = (name, id) => dispatch => {
    dispatch(groupsLoading())
    axios.put(`${ulr}/groups` , {id: id, name: name})
    .then(res => {
        dispatch(addGroups(res.data));
    })
      .catch(err => {
        dispatch(groupsFailed(err.message));
    });
}
// delete group
export const deleteGroup = (id, userId) => dispatch => {
    dispatch(groupsLoading())
    axios.post(`${ulr}/groups/delete` , {id: id, userId: userId}) .then(res => {
            dispatch(addGroups(res.data));
        })
          .catch(err => {
            dispatch(groupsFailed(err.message));
        });
}

// add task
export const addTask = (task, id) => dispatch => {
    dispatch(groupsLoading())
    axios.post(`${ulr}/groups/task` , {id: id, message: task})
    .then(res => {
        dispatch(addGroups(res.data));
    })
      .catch(err => {
        dispatch(groupsFailed(err.message));
    });

}

// edit task
export const updateTask = ( id, taskId, message, completed) => dispatch => {
    dispatch(groupsLoading())
    axios.put(`${ulr}/groups/task` , {id: id, taskId: taskId, message: message, completed: completed})
    .then(res => {
        dispatch(addGroups(res.data));
    })
      .catch(err => {
        dispatch(groupsFailed(err.message));
    });
}
// delete task
export const deleteTask = (id, taskId) => dispatch => {
    dispatch(groupsLoading())
    axios.post(`${ulr}/groups/task/delete` , {id: id, taskId: taskId})
        .then(res => {
            dispatch(addGroups(res.data));
        })
          .catch(err => {
            dispatch(groupsFailed(err.message));
        });
}


const groupsLoading = () =>({
    type: actionTypes.GROUPS_LOADING,
});

const groupsFailed = (errMess) => ({
    type: actionTypes.GROUP_FAILED,
    payload: errMess
});

const addGroups = (groups) => ({
    type: actionTypes.ADD_GROUP,
    payload: groups
});