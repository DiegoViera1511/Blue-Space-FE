import {Modal} from "../../common/modal/modal.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {UserPlus} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/userContext.tsx";
import {BaseModalProps, UsersToProjectsDto} from "../../../types.ts";
import {UserContainer} from "../../userContainer/userContainer.tsx";
import {AddMembersModal} from "./addMembersModal.tsx";


export function ShareProjectModal({open,setOpen} : BaseModalProps) {
    const [usersToProjects, setUsersToProjects] = useState<UsersToProjectsDto[]>([])
    const [openAddMembersModal, setOpenAddMembersModal] = useState(false)
    const {selectedProject , user} = useContext(UserContext)
    
    useEffect(() => {
        if (selectedProject.id === '') return
        fetch(`http://localhost:8080/api/usersToProjects/dto?project_id=${selectedProject.id}`)
            .then(response => response.json())
            .then((data) => {
                setUsersToProjects(data.data)
            })
            .catch(error => console.log(error))
    },[selectedProject.id])
    
    return(
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div
                    className={"flex flex-col p-5 bg-white gap-4 items-center justify-start text-sm w-[250px] h-[400px] sm:w-[500px]"}
                >
                    <div className={"flex flex-row items-center justify-between w-full"}>
                        <p className={"text-2xl font-medium"}>Users</p>
                        {selectedProject.username === user ?
                            <SimpleButton
                                onClick={() => setOpenAddMembersModal(true)}
                                text={""}
                                icon={<UserPlus/>}
                                cn={"hover:bg-gray-100 hover:text-green-500"}
                            />
                            :
                            <></>
                        }

                    </div>
                    <div className={"flex flex-col w-full py-1 gap-2 overflow-y-auto " +
                        "[mask-image:linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)]"}>
                        {usersToProjects.length > 0 ?
                            usersToProjects.map((userToProject) => (
                                <div key={userToProject.username} className={"flex flex-row items-center p-2 justify-between w-full border-2 rounded-xl"}>
                                    <div className={"flex flex-row items-center justify-between gap-4"}>
                                        <UserContainer
                                            name={userToProject.username}
                                        />
                                        <p className={"text-sm font-medium"}>{userToProject.username}</p>
                                    </div>
                                    {userToProject.project.username === userToProject.username ?
                                        <p className={"sm:mx-10 text-sm font-medium text-gray-500"}>Owner</p>
                                        :
                                        <></>
                                    }
                                </div>
                            ))
                            :
                            <></>
                        }
                    </div>
                </div>
            </Modal>
            <AddMembersModal open={openAddMembersModal} setOpen={setOpenAddMembersModal}/>
        </>
    )
}