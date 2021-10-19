import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var id = '';
var index;

var findIndex = (tasks, id) => {
    var result;
    tasks.forEach((task, index) => {
        if(task.id === id) {
            result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LIST_ALL: 
            return state;
        case types.SUBMIT_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status,
            };
            if(!task.id) {
                var randomstring = require("randomstring");
                task.id = randomstring.generate();
                state.push(task);
            } else {
                index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return[...state]; // copy ra cai array moi roi tra ve
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            state[index] = {
                ...state[index], // copy lai task cu
                status: !state[index].status

            };
            localStorage.setItem('tasks', JSON.stringify(state));
            return[...state];
        case types.DELETE_TASK: 
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1); // cat 1 phan tu tai vi tri index
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: 
            return state;
    }
}

export default myReducer;
