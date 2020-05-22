import {FORM_PROJECT, 
        ADD_PROJECT,    
        GET_PROJECTS,
        ERROR_PROJECT,
        FORM_VALIDATION,
        SELECTED_PROJECT,
        DELETE_PROJECT
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [ ...state.projects, action.payload ],
                form: false,
                validationError: false
            }
        case SELECTED_PROJECT:
            return {
                ...state,
                project: state.projects.filter( project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter( project => project._id !== action.payload),
                project: null
            }
        case FORM_PROJECT:
            return {
                ...state,
                form: true
            }
        case FORM_VALIDATION:
            return {
                ...state,
                validationError: true
            }
        case ERROR_PROJECT:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}