import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {Rocket,Bell,Users,BellDot} from "lucide-react";
import {ProjectsModal} from "../modals/projectsModal/projectsModal.tsx";
import {HeaderButton} from "./headerButton/headerButton.tsx";
import {UserContainer} from "../userContainer/userContainer.tsx";
import {LogOut} from "lucide-react"
import {NotificationsModal} from "../modals/notificationsModal/notificationsModal.tsx";
import {ShareProjectModal} from "../modals/shareProjectModal/shareProjectModal.tsx";
import {localStorageProjectKey, localStorageToken} from "../../utils.ts";
import {defaultProyectType} from "../../types.ts";

interface HeaderProps {
    username: string
}

export function Header({username}: HeaderProps) {
    const [openProjectModal, setOpenProjectModal] = useState(false)
    const [openNotificationsModal, setOpenNotificationsModal] = useState(false)
    const [openShareProjectModal, setOpenShareProjectModal] = useState(false)
    const [notificationsUnread,setNotificationsUnread] = useState(false)
    const {
        selectedProject,
        setIsAuth,
        setSelectedProject,
        setUser
    } = useContext(UserContext)
    
    const handleLogout = () => {
        setIsAuth(false)
        setUser('')
        localStorage.removeItem(localStorageToken)
        localStorage.removeItem(localStorageProjectKey)
        setSelectedProject(defaultProyectType)
        
    }
    
    useEffect(() => {
        
    }, [notificationsUnread]);
    return (
        <>
            <header
                className="flex flex-row rounded-md  backdrop-blur-sm bg-white/30
                w-[98%] min-h-16 shadow-lg items-center justify-between gap-6 mt-2 px-6"
            >
                <h1 className="flex items-center max-w-[150px] md:max-w-[50%] text-xl md:text-2xl text-white bg-clip-text text-transparent truncate whitespace-nowrap overflow-hidden">
                    {selectedProject.id !== '' ? selectedProject.name : <Rocket className={"text-black"}/>}
                </h1>
                <div className="flex flex-row items-center justify-between gap-6">
                    <HeaderButton
                        text={"Projects"}
                        onClick={() => setOpenProjectModal(true)}
                    />
                    { selectedProject.id === '' ? 
                        <></> 
                        :
                        <HeaderButton
                            icon={<Users/>}
                            onClick={() => setOpenShareProjectModal(true)}
                        />
                    }
                    <HeaderButton
                        icon={notificationsUnread ? <BellDot/> : <Bell/>}
                        onClick={() => setOpenNotificationsModal(true)}
                    />
                    <UserContainer
                        name={username}
                    />
                    <HeaderButton
                        icon={<LogOut/>}
                        onClick={() => handleLogout()}
                    />
                </div>
            </header>
            <ShareProjectModal open={openShareProjectModal} setOpen={setOpenShareProjectModal}/>
            <ProjectsModal open={openProjectModal} setOpen={setOpenProjectModal}/>
            <NotificationsModal open={openNotificationsModal} setOpen={setOpenNotificationsModal} setNotificationsUnread={setNotificationsUnread}/>
        </>
    )
}

