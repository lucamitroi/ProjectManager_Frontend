import { Form } from "react-router-dom";
import { decodeJWT, getAuthToken } from "../util/helperFunctions";
import { useContext } from "react";
import { ProjectContext } from "../store/projects-context";

export default function Sidebar({ onSelect }) {
    const { setSelectedProject, listOfProjects } = useContext(ProjectContext);
    const token = decodeJWT(getAuthToken());
    return (
        <div className="mt-8 mb-8 flex flex-col w-[300px]">
            <div className="h-screen bg-[rgb(20,20,20)] rounded-r-[13px]">
                <div className="flex flex-row justify-between">
                    <h1 className="text-white font-semibold text-base pl-8 pt-6 ">{token.firstName + " " + token.lastName}</h1>
                    <Form action='/logout' method='post'>
                        <button className="text-[#ffffff] bg-[#45413c] px-3 py-0.5 rounded-[8px] mx-7 my-5 justify-end">Logout</button>
                    </Form>
                </div>
                <div className="bg-[#45413c] h-[2px] w-[300px]" />
                <h1 className="text-white font-semibold text-2xl pl-8 mt-5">YOUR PROJECTS</h1>
                <button className="text-[#ffffff] bg-[#45413c] px-3 py-2 rounded-[8px] mx-7 my-5" onClick={() => { onSelect("newProject") }}>+ Add Project</button>
                <div className="flex flex-col justify-start">
                    {listOfProjects.map((project) => (
                        <button key={Math.random() * 1000} className="text-[#ffffff] hover:bg-[#292524] px-3 py-2 mx-7 my-1 text-left"
                            onClick={() => {
                                onSelect("projectDetails");
                                setSelectedProject(
                                    {
                                        title: project.projectTitle,
                                        description: project.projectDescription,
                                        date: project.projectDate,
                                        tasks: project.listOfTasks,
                                        projectId: project.projectId
                                    }
                                );
                            }}>{project.projectTitle}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}