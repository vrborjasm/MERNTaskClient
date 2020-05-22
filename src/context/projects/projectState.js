import React, { useReducer } from 'react';
import clientAxios from '../../config/axios'
import projectContext from './projectContext';
import projectReduce from './projectReducer';
import {FORM_PROJECT,
        ADD_PROJECT, 
        GET_PROJECTS,
        FORM_VALIDATION,
        SELECTED_PROJECT,
        ERROR_PROJECT,
        DELETE_PROJECT
} from '../../types';


const ProjectState = props => {
  
    const initialState = {
        projects: [],
        form : false,
        validationError: false,
        project: null,
        message: null
    }

    const [state, dispatch] = useReducer(projectReduce, initialState)

    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    const getProjects = async () => {
        try {
            const resp = await clientAxios.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: resp.data
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            }) 
        }
    }

    const addProject = async project => {
        try {
            const resp = await clientAxios.post('/api/projects', project);
            console.log(resp);
            dispatch({
                type: ADD_PROJECT,
                payload: resp.data
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })  
        }
    }

    const showError = () => {
        dispatch({
            type: FORM_VALIDATION,
            validationError: true
        })
    }

    const selectedProject = projectId => {
        dispatch({
            type: SELECTED_PROJECT,
            payload: projectId
        })
    }

    const deleteProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            }) 
        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                validationError: state.validationError,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                selectedProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;