import {
    TASKS_PROJECT,
    ADD_TASK,
    FORM_VALIDATION,
    DELETE_TASK,
    EDIT_TASK,
    SELECTED_TASK,
    CLEAN_TASK
} from '../../types';

export default (state, action) => {
switch(action.type) {
    case TASKS_PROJECT:
        return {
            ...state,
            tasksProject: action.payload
        }
    case ADD_TASK:
        return {
            ...state,
            tasksProject: [ action.payload, ...state.tasksProject ],
            taskError: false
        }
    case DELETE_TASK:
        return {
            ...state,
            tasksProject: state.tasksProject.filter( task => task._id !== action.payload),
        }
    case FORM_VALIDATION:
        return {
            ...state,
            taskError: true
        }
    case EDIT_TASK:
        return {
            ...state,
            tasksProject: state.tasksProject.map( task => task._id === action.payload._id ? action.payload : task )
        }
    case SELECTED_TASK:
        return {
            ...state,
            selectTask: action.payload
        }
    case CLEAN_TASK:
        return {
            ...state,
            selectTask: null
        }
    default:
        return state;
}
}