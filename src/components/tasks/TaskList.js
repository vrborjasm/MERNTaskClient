import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import Task from './Task';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

const TaskList = () => {

    const projectsContext = useContext(projectContext);

    const { project, deleteProject } = projectsContext;

    const tasksContext = useContext(taskContext);

    const { tasksProject } = tasksContext;

    if(!project) return <h2>Selecciona un proyecto</h2>

    const [selectedProject] =project;
    
    return ( 
        <Fragment>
            <h2>Proyecto: {selectedProject.name}</h2>
            <ul className="listado-tareas">
                {tasksProject.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                    <TransitionGroup>
                        {tasksProject.map(task => (
                            <CSSTransition
                                key={task.id}
                                timeout={200}
                                classNames="task"
                            >
                                <Task 
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-primario"
                onClick={ () => deleteProject(selectedProject._id)}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default TaskList;