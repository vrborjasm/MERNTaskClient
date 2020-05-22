import React, { useReducer } from 'react';
import clientAxios from '../../config/axios';

import TaskContext from './taskContext';
import TaskReduce from './taskReducer';
import {
    TASKS_PROJECT,
    ADD_TASK,
    FORM_VALIDATION,
    DELETE_TASK,
    EDIT_TASK,
    SELECTED_TASK,
    CLEAN_TASK
} from '../../types';

const TaskState = props => {
    const initialState = {
        tasksProject: [],
        taskError: false,
        selectTask: null
    }

    const [state, dispatch] = useReducer(TaskReduce, initialState)

    const tasksByProject = async project => {
        try {
            const resp = await clientAxios.get('/api/tasks', { params: {project} })
            dispatch({
                type: TASKS_PROJECT,
                payload: resp.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    const addTask = async task => {
        try {
            const resp = await clientAxios.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: resp.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (idTask, project) => {
        try {
            await clientAxios.delete(`/api/tasks/${idTask}`, { params: {project} });
            dispatch({
                type: DELETE_TASK,
                payload: idTask
            })
        } catch (error) {
            
        }
    }

    const showError = () => {
        dispatch({
            type: FORM_VALIDATION,
            taskError: true
        })
    }

    const editTask = async task => {
        try {
            const resp = await clientAxios.put(`/api/tasks/${task._id}`, task)
            dispatch({
                type: EDIT_TASK,
                payload: resp.data.task
            })
        } catch (error) {
           console.log(error); 
        }
    }

    const selectedTask = task => {
        dispatch({
            type: SELECTED_TASK,
            payload: task
        })
    }
    
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }
    return (
        <TaskContext.Provider
            value={{
                selectTask: state.selectTask,
                tasksProject: state.tasksProject,
                taskError: state.taskError,
                tasksByProject,
                showError,
                addTask,
                deleteTask,
                selectedTask,
                editTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;