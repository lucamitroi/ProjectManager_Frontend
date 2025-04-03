export default function NoProjectSelected({ onSetScreen }) {
    return (
        <>
            <img src="logo.png" className="size-16 mt-[100px]" />
            <h1 className="text-[#ffffff] font-bold text-xl mt-10">No Project Selected</h1>
            <p className="text-[#ffffff] my-7">Select a project or get started with a new one</p>
            <button className="text-[#ffffff] bg-[#45413c] px-3 py-2 rounded-[8px]" onClick={() => { onSetScreen("newProject") }}>Create new project</button>
        </>
    )
}