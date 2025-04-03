import NoProjectSelected from "./NoProjectSelected";
import NewProject from "./NewProject";
import ProjectDetails from "./ProjectDetails";
import { useContext } from "react";
import { ProjectContext } from "../store/projects-context";

export default function ProjectContent({ onSelect, screen }) {
    let divStyling = undefined;

    if (screen === "default") {
        divStyling = "flex-1 flex flex-col items-center";
    }
    else if (screen === "newProject") {
        divStyling = "w-[35rem] flex flex-col"
    }
    else if (screen === "projectDetails") {
        divStyling = "w-[40rem] flex flex-col"
    }

    return <div className={divStyling}>
        {screen === "default" && <NoProjectSelected onSetScreen={onSelect} />}
        {screen === "newProject" && <NewProject onSetScreen={onSelect} />}
        {screen === "projectDetails" && <ProjectDetails onSetScreen={onSelect} />}
    </div>
}