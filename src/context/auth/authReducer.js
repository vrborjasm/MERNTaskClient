import { 
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGN_OUT
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                auth: true,
                load: false,
                message: null
            }
        case GET_USER:
            return {
                ...state,
                auth: true,
                load: false,
                user: action.payload
            }
        case SIGN_OUT:
        case LOGIN_ERROR:
        case SIGNUP_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                auth: null,
                load: false,
                message: action.payload
            }
        default:
            return state;
    }
}