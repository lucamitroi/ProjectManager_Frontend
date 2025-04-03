import { useContext, useRef, useState } from "react"
import InvalidInput from "./InvalidInput";
import { getAuthToken, decodeJWT, getProjects } from "../util/helperFunctions";
import { redirect } from "react-router-dom";
import { ProjectContext } from "../store/projects-context";
import config from "../../config";

async function postNewProject(postData, token) {
    const response = await fetch(`${config.apiUrl}/Project/AddProject`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData),
    });
}

export default function NewProject({ onSetScreen }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();
    const dialogRef = useRef();

    const { setListOfProjects } = useContext(ProjectContext);

    async function handleSaveButton() {
        const token = getAuthToken();
        const decodedToken = decodeJWT(token);

        const postData = {
            userId: decodedToken.userId,
            projectTitle: titleRef.current.value,
            projectDescription: descriptionRef.current.value,
            projectDate: dateRef.current.value,
        };

        await postNewProject(postData, token);

        const projects = await getProjects(decodedToken.userId, token);
        setListOfProjects(projects);
    }

    return (
        <>
            <InvalidInput ref={dialogRef} />
            <div className="mt-[5rem] flex justify-end">
                <button onClick={() => { onSetScreen("default") }} className="mx-3 text-[#ffffff]">Cancel</button>
                <button onClick={() => {
                    if (titleRef.current.value == '' ||
                        descriptionRef.current.value == '' ||
                        dateRef.current.value == '') {
                        dialogRef.current.showModal();
                    }
                    else {
                        handleSaveButton();
                        onSetScreen("default");
                    }
                }} className="text-white bg-[#45413c] px-6 py-2 rounded-[8px] mx-7 my-5">Save</button>
            </div >
            <div>
                <form className="flex flex-col px-8">
                    <label htmlFor="title" className="text-[#ffffff] font-semibold mb-3">TITLE</label>
                    <input ref={titleRef} type="text" id="title" name="title" className="bg-[#e7e5e4] border-b-2 border-[#d7d3d0] h-[2rem] focus:border-transparent border p-2 rounded" />

                    <label htmlFor="description" className="text-[#ffffff] font-semibold mt-5 mb-3">DESCRIPTION</label>
                    <textarea ref={descriptionRef} type="text" id="description" name="description" className="bg-[#e7e5e4] border-b-2 border-[#d7d3d0] h-[3rem] focus:border-transparent border p-2 rounded" />

                    <label htmlFor="date" className="text-[#ffffff] font-semibold mt-5 mb-3">DUE DATE</label>
                    <input ref={dateRef} type="date" id="date" name="date" className="bg-[#e7e5e4] border-b-2 border-[#d7d3d0] h-[2rem] focus:border-transparent border p-2 rounded" />
                </form>
            </div>
        </>
    )
}