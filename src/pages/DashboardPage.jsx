import { getAuthToken, decodeJWT, getProjects } from "../util/helperFunctions";
import ProjectContent from "../components/ProjectContent";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { ProjectContext } from "../store/projects-context";

function DashboardPage() {
    const [showScreen, setShowScreen] = useState("default");
    const [listOfProjects, setListOfProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const token = getAuthToken();
        const decodedToken = decodeJWT(token);
        const getProjectsFromDb = async () => {
            const projects = await getProjects(decodedToken.userId, token);
            setListOfProjects(projects);
        };
        getProjectsFromDb();
    }, [setListOfProjects]);

    function handleModifyScreenButton(selectedScreen) {
        setShowScreen(selectedScreen);
    }

    const ctxValue = {
        listOfProjects,
        selectedProject,
        taskList,
        setListOfProjects,
        setSelectedProject,
        setTaskList,
    };

    return <ProjectContext.Provider value={ctxValue}>
        <Sidebar onSelect={handleModifyScreenButton} />
        <ProjectContent onSelect={handleModifyScreenButton} screen={showScreen} />
    </ProjectContext.Provider>
}

export default DashboardPage;