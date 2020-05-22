import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);

    const { selectedProject } = projectsContext;
    const { tasksByProject } = tasksContext;

    const selectProject = id => {
        selectedProject(id);
        tasksByProject(id);
    }

    return ( 
        <li>
            <button 
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            >{project.name}</button>
        </li>
     );
}
 
export default Project;