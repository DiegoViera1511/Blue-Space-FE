import {useContext} from "react";
import {UserContext} from "../../context/userContext.tsx";

interface HeaderProps {
    username: string
}

export function Header({username} : HeaderProps){
    const {
        setOpenProjectModal,
        selectedProject
    } = useContext(UserContext)
    return(
        <header className="
            fixed top-[1%] left-[1%] z-10 flex flex-row 
            rounded-md  backdrop-blur-sm bg-white/30 
            w-[98%] h-16 box-border shadow-lg items-center justify-between gap-6 px-6"
        >
            <h1 className="flex items-center max-w[150px] md:max-w[50%] text-xl md:text-2xl bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent truncate whitespace-nowrap overflow-hidden">
                {selectedProject.name}
            </h1>
            <div className="flex flex-row items-center justify-between gap-6">
                <button className="text-blue-800 text-xl md:text-2xl" onClick={() => setOpenProjectModal(true)}>
                    Projects
                </button>
                <div
                    className="flex bg-gray-200 w-12 h-12 items-center justify-center rounded-full"
                    onClick={() => alert("Developing")}
                >
                    <p className="text-slate-500 cursor-pointer">{username[0].toUpperCase()}</p>
                </div>
            </div>
        </header>
    )
}

