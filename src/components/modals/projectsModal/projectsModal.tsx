import {useContext, useEffect, useState} from "react";
import {Colors, defaultProyectType, ProjectType, UsersToProjectsDto} from "../../../types.ts";
import {UserContext} from "../../../context/userContext.tsx";
import {EllipsisVertical} from 'lucide-react';
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {httpRequest} from "../../../api";
import {ProjectInfoModal} from "./projectInfoModal.tsx";

interface ProjectsModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ProjectsModal({open, setOpen}: ProjectsModalProps) {
    const {selectedProject, setSelectedProject, user, refreshProjects} = useContext(UserContext)
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [openCreateProject, setOpenCreateProject] = useState(false)
    const [newProjectName, setNewProjectName] = useState('')
    const [openInfoProject, setOpenInfoProject] = useState(false)
    const [modalProjectInfo, setModalProjectInfo] = useState<ProjectType>(defaultProyectType)

    const handleCreateProject = async () => {
        const newProject: Partial<ProjectType> = {
            username: user,
            name: newProjectName,
            color: Colors.BLUE
        }
        const response = await httpRequest<ProjectType>({
            url: '/project',
            method: 'POST',
            data: newProject
        })
        if (response.status === 201) {
            setProjects([...projects, response.data])
            setSelectedProject(response.data)
            await httpRequest({
                url: `/usersToProjects`,
                method: 'POST',
                data: {
                    username: user,
                    project_id: response.data.id
                }
            })
        }
        setNewProjectName('')
        setOpenCreateProject(false)
    }

    useEffect(() => {
        if (user === '') return
        setOpenCreateProject(false)
        fetch(`http://localhost:8080/api/usersToProjects/dto?username=${user}`)
            .then(response => response.json())
            .then(data => {
                const usersToProjects = data as UsersToProjectsDto[];
                setProjects(usersToProjects.map(userToProject => userToProject.project))
            })
            .catch(error => console.log(error))
    }, [user, refreshProjects])

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div
                    className={"flex flex-col p-5 bg-white gap-4 items-center justify-start text-sm w-[250px] h-[400px] sm:w-[500px] "}
                >
                    <div className={"flex flex-row w-full justify-between items-center"}>
                        <p className={"text-2xl font-medium"}>Projects</p>
                        <SimpleButton
                            onClick={() => setOpenCreateProject(true)}
                            text={"New Project"}
                            cn={"hover:bg-gray-100 hover:text-green-500"}
                        />
                    </div>
                    {openCreateProject && (
                        <div className={"flex flex-col w-full gap-4 border-2 p-3 rounded-xl"}>
                            <input type="text" placeholder={"Project name"}
                                   className={"outline-none bg-gray-100 p-3 h-auto w-full rounded-xl"}
                                   value={newProjectName}
                                   onChange={(e) => setNewProjectName(e.target.value)}
                            />
                            <div className={"flex flex-row gap-4 items-center justify-start"}>
                                <SimpleButton
                                    onClick={() => setOpenCreateProject(false)}
                                    text={"Cancel"}
                                    cn={"hover:bg-gray-100"}
                                />
                                <SimpleButton
                                    onClick={() => handleCreateProject()}
                                    text={"Create"}
                                    cn={"hover:bg-gray-100"}
                                />
                            </div>
                        </div>
                    )}
                    {projects.length > 0 ? (
                        <div
                            className='flex flex-col-reverse w-full overscroll-x-none max-h-[400px] py-1 overflow-y-auto bg-white gap-4
                        [mask-image:linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)]'
                        >
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`flex flex-col cursor-pointer w-full h-auto border-2 overscroll-x-none transition-all rounded-xl 
                            ${project.id === selectedProject.id ? 'border-gray-500 border-2' : ''}`}
                                >
                                    <div
                                        className='flex flex-row overscroll-x-none justify-between w-full h-fit px-5 py-4'
                                    >
                                        <div
                                            className='flex flex-row w-full h-auto overflow-hidden gap-4 items-center'
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            <p className={`text-ellipsis font-medium break-words max-w-[80%] text-gray-700`}>{project.name}</p>
                                        </div>
                                        {project.username === user ?
                                            <button onClick={() => {
                                                setOpenInfoProject(true)
                                                setModalProjectInfo(project)
                                            }
                                            }>
                                                <EllipsisVertical color={"gray"}/>
                                            </button>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex w-full h-full bg-white items-center justify-center'>
                            <p className={"text-2xl"}>No Projects yet !</p>
                        </div>
                    )}
                </div>
            </Modal>
            <ProjectInfoModal project={modalProjectInfo} open={openInfoProject} setOpen={setOpenInfoProject}/>
        </>
    )
}