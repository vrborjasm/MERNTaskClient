import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {

    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);

    const { project } = projectsContext;
    const { deleteTask, tasksByProject, editTask, selectedTask} = tasksContext;

    const [selectedProject] = project;

    const onClick = id => {
        deleteTask(id, selectedProject._id);
        tasksByProject(selectedProject._id);
    }

    const changeState = (task) => {
        if(task.state) {
            task.state = false;
        } else {
            task.state = true;
        }
        editTask(task);
    }

    const onSelectTask = (task) => {
        selectedTask(task)
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                {task.state 
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => changeState(task)}
                        >Completo</button>
                    ) 
                    : (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => changeState(task)}
                        >Incompleto</button>
                    ) 
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => onSelectTask(task)}
                >Editar</button>
                    
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClick(task._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Task;