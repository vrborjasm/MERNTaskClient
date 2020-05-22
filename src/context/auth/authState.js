import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { 
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGN_OUT
 } from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        message: null,
        load: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signUpUser = async data => {
        try {
            const resp = await clientAxios.post('/api/users', data);
            console.log(resp.data);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: resp.data
            });
            authUser();
            console.log('prueba');
        } catch (error) {
            console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: SIGNUP_ERROR,
                payload: alert
            })
        }
    }

    const authUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }
        try {
            const resp = await clientAxios.get('/api/auth');
            console.log(resp);
            dispatch({
                type: GET_USER,
                payload: resp.data.user
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
    
    const login = async data => {
        try {
            const resp = await clientAxios.post('/api/auth', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload:resp.data
            });
            authUser();
        } catch (error) {
            console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const logout = () => {
        dispatch({
            type: SIGN_OUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                load: state.load,
                signUpUser,
                login,
                authUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;