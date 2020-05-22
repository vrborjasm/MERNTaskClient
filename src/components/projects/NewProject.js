import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';


const NewProject = () => {
    
    const projectsContext = useContext(projectContext);

    const { form, validationError, showForm, addProject, showError } = projectsContext;

    const [project,setProject] = useState({
        name: ''
    });
    
    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProject = e => {
        e.preventDefault();

        if(project.name === '') {
            showError();
            return;
        }

        addProject(project);
        setProject({
            nombre: ''
        })
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
            >Nuevo Proyecto</button>

            {
                form 
                ? (<form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProject}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="name"
                        onChange={onChangeProject}
                        value={project.name}
                    />
    
                    <input
                        type="submit"
                        className="btn btn-block btn-primario"
                        value="Agregar Proyecto"
                    />
                </form>)
                : (null)
            }
            { validationError ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>
     );
}
 
export default NewProject;