import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {Rocket,Bell,Users,BellDot} from "lucide-react";
import {ProjectsModal} from "../modals/projectsModal/projectsModal.tsx";
import {HeaderButton} from "./headerButton/headerButton.tsx";
import {UserContainer} from "../userContainer/userContainer.tsx";
import {LogOut} from "lucide-react"
import {NotificationsModal} from "../modals/notificationsModal/notificationsModal.tsx";
import {ShareProjectModal} from "../modals/shareProjectModal/shareProjectModal.tsx";

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
        setUser
    } = useContext(UserContext)
    useEffect(() => {
        
    }, [notificationsUnread]);
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
                        onClick={() => {
                            setIsAuth(false)
                            setUser('')
                            localStorage.removeItem('jwt')
                        }}
                    />
                </div>
            </header>
            <ShareProjectModal open={openShareProjectModal} setOpen={setOpenShareProjectModal}/>
            <ProjectsModal open={openProjectModal} setOpen={setOpenProjectModal}/>
            <NotificationsModal open={openNotificationsModal} setOpen={setOpenNotificationsModal} setNotificationsUnread={setNotificationsUnread}/>
        </>
    )
}

