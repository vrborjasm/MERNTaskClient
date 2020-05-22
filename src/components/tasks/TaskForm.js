import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {

    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);
    
    const [task, setTask] = useState({
        name: ''
    })
    
    const { project } = projectsContext;
    const { addTask, taskError, showError, tasksByProject, selectTask, editTask, cleanTask } = tasksContext;

    useEffect(() => {
        if(selectTask !== null) {
            setTask(selectTask)
        } else {
            setTask({
                nombre: ''
            })
        }
    },[selectTask]);

    if(!project) return null;

    const [selectedProject] = project;
    const {name} = task;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(name.trim() === '') {
            showError();
            return;
        }

        if(selectTask === null) {
            task.project = selectedProject._id;
            addTask(task);
        } else {
            editTask(task);
            cleanTask();
        }
        
        tasksByProject(selectedProject.id);

        setTask({
            name: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="name"
                        onChange={handleChange}
                        value={name}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value= { selectTask ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>
            { taskError ? <p className="mensaje error">Nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default TaskForm;