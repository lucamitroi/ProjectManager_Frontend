import { createContext, useReducer } from 'react'

export const ProjectContext = createContext({
    listOfProjects: [],
    selectedProject: [],
    taskList: [],
    setListOfProjects: () => { },
    setSelectedProject: () => { },
    setTaskList: () => { },
});
