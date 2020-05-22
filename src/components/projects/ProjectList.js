import React, {useContext, useEffect} from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const ProjectList = () => {

    const projectsContext = useContext(projectContext);
    const { projects, getProjects, message } = projectsContext;

    const alertsContext = useContext(alertContext);
    const { alert, showAlert } = alertsContext;

    useEffect(() => {
       if(message) {
           showAlert(message.msg, message.category);
       }
        getProjects();
        // eslint-disable-next-line
    },[message]);

    if(projects.length === 0) return <p>No hay proyectos</p>;

    return ( 
        
        <ul className="listado-proyectos">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="project"
                    >
                        <Project
                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ProjectList;