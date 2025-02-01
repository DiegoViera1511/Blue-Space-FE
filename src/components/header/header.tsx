import {useContext, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {Rocket} from "lucide-react";
import {Modal} from "../common/modal/modal.tsx";
import {ProjectsModal} from "../modals/projectsModal/projectsModal.tsx";
import {HeaderButton} from "./headerButton/headerButton.tsx";
import {UserContainer} from "../userContainer/userContainer.tsx";
import {LogOut} from "lucide-react"

interface HeaderProps {
    username: string
}

export function Header({username}: HeaderProps) {
    const [openProjectModal, setOpenProjectModal] = useState(false)
    const {
        selectedProject,
        setIsAuth,
        setUser
    } = useContext(UserContext)
    return (
        <>
            <header
                className="fixed top-[1%] left-[1%] flex flex-row 
                rounded-md  backdrop-blur-sm bg-white/30 
                w-[98%] h-16 box-border shadow-lg items-center justify-between gap-6 px-6"
            >
                <h1 className="flex items-center max-w[150px] md:max-w[50%] text-xl md:text-2xl bg-gradient-to-r from-cyan-500 to-cyan-700 bg-clip-text text-transparent truncate whitespace-nowrap overflow-hidden">
                    {selectedProject.id !== '' ? selectedProject.name : <Rocket className={"text-black"}/>}
                </h1>
                <div className="flex flex-row items-center justify-between gap-6">
                    <HeaderButton
                        text={"Projects"}
                        onClick={() => setOpenProjectModal(true)}
                    />
                    <UserContainer
                        name={username}
                        onClick={() => alert("Developing")}
                    />
                    <HeaderButton
                        icon={<LogOut/>}
                        onClick={() => {
                            setIsAuth(false)
                            setUser('')
                            localStorage.removeItem('jwt')
                        }}
                    />
                </div>
            </header>
            <Modal open={openProjectModal} onClose={() => setOpenProjectModal(false)}>
                <ProjectsModal/>
            </Modal>
        </>
    )
}

