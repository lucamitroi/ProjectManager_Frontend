import { useContext, useEffect, useRef, useState } from "react";
import { decodeJWT, getAuthToken, getProjects, getTasks } from "../util/helperFunctions";
import { ProjectContext } from "../store/projects-context";
import config from "../../config";

async function removeProjectDB(token, projectId) {
    const response = await fetch(`${config.apiUrl}/Project/DeleteProject/` + projectId, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    if (!response.ok) {
        throw new Error("Failed to Delete the Project");
    }
}

async function addTaskDB(token, taskData) {
    const response = await fetch(`${config.apiUrl}/Project/AddTask`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error("Failed to Add the Task");
    }
}

async function removeTaskDB(token, taskId) {
    const response = await fetch(`${config.apiUrl}/Project/DeleteTask/` + taskId, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    if (!response.ok) {
        throw new Error("Failed to Delete the Project");
    }
}

export default function ProjectDetails({ onSetScreen }) {
    const token = getAuthToken();
    const decodedToken = decodeJWT(token);

    const { setListOfProjects, setTaskList, taskList, selectedProject } = useContext(ProjectContext);

    const taskRef = useRef();
    const date = new Date(selectedProject.date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }).format(date);

    useEffect(() => {
        if (selectedProject && selectedProject.tasks) {
            setTaskList(selectedProject.tasks);
        }
    }, [selectedProject, setTaskList]);

    async function removeProject() {
        await removeProjectDB(token, selectedProject.projectId);
        const projects = await getProjects(decodedToken.userId, token);
        setListOfProjects(projects);
    }

    async function removeTask(taskId) {
        removeTaskDB(token, taskId);
        const projects = await getProjects(decodedToken.userId, token);
        setListOfProjects(projects);
        const tasks = await getTasks(selectedProject.projectId, token);
        setTaskList(tasks);
    }

    async function handleAddTaskButton() {

        if (taskRef.current.value != '') {
            const taskData = {
                projectId: selectedProject.projectId,
                taskDescription: taskRef.current.value
            };

            await addTaskDB(token, taskData);

            const projects = await getProjects(decodedToken.userId, token);
            setListOfProjects(projects);
            const tasks = await getTasks(selectedProject.projectId, token);
            setTaskList(tasks);
        }
    }

    return (
        <>
            <div className="mt-[6rem] mx-[2rem]">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-bold text-[#ffffff]">{selectedProject.title}</h1>
                    <button className="text-[#ffffff] hover:text-[#beb1b1]" onClick={() => {
                        onSetScreen("default");
                        removeProject();
                    }
                    }>Delete</button>
                </div>
                <p className="my-4 text-[#ffffff]">{formattedDate}</p>
                <p className="my-4 text-[#ffffff]">{selectedProject.description}</p>
                <div className="bg-[#d7d3d0] h-[2px] w-[37rem]" />
                <h1 className="text-2xl font-bold text-[#ffffff] my-4">Tasks</h1>
                <div className="flex mb-[2rem]">
                    <input ref={taskRef} className="bg-[#ffffff] h-8 text-center border p-2 rounded w-[30rem]"></input>
                    <button className="text-[#ffffff] hover:text-[#beb1b1] ml-3" onClick={handleAddTaskButton}>Add Task</button>
                </div>
                {taskList.length === 0 && <p className="my-4 text-[#ffffff]">This project does not have any tasks yet.</p>}
                {taskList.map((task) => (
                    <div key={Math.random() * 1000} className="flex flex-row justify-between">
                        <p key={Math.random() * 1000} className="text-lg my-3 ml-5 text-[#ffffff]">{task.taskDescription}</p>
                        <button key={Math.random() * 1000} className="hover:text-red-600 text-[#ffffff]" onClick={() => { removeTask(task.taskId) }}>Clear</button>
                    </div>
                ))}
            </div>
        </>
    );
}