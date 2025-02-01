import {useContext, useEffect, useState} from "react";
import {ProjectType} from "../../../types.ts";
import {UserContext} from "../../../context/userContext.tsx";
import {EllipsisVertical} from 'lucide-react';
import {Trash2} from 'lucide-react';
import {Pencil} from 'lucide-react';
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";

export function ProjectsModal() {
    const {selectedProject, setSelectedProject, user} = useContext(UserContext)
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [openCreateProject, setOpenCreateProject] = useState(false)
    const [newProjectName, setNewProjectName] = useState('')
    const [deleteOptions, setDeleteOptions] = useState('id')
    const [moreOptions, setMoreOptions] = useState('id')
    const [editOptions, setEditOptions] = useState('id')

    const handleCreateProject = () => {
        const newProject: Partial<ProjectType> = {
            username: user,
            name: newProjectName,
        }
        fetch('http://localhost:8080/api/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        })
            .then(response => response.json())
            .then(data => {
                setProjects([...projects, data])
                setNewProjectName('')
                setOpenCreateProject(false)
            })
            .catch(error => console.log(error))
    }

    const handleDeleteProject = (id: string) => {
        fetch(`http://localhost:8080/api/project/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                setProjects(projects.filter(p => p.id !== id))
                setDeleteOptions('id')
                if (selectedProject.id === id) {
                    setSelectedProject({id: 'id', name: 'Blue-Space', username: 'username'})
                }
            })
            .catch(error => console.log(error))
    }

    const handleEditProject = (id: string) => {
        fetch(`http://localhost:8080/api/project/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newProjectName})
        })
            .then(response => response.json())
            .then(data => {
                setProjects(projects.map(p => p.id === id ? data : p))
                setEditOptions('id')
                setNewProjectName('')
                if (selectedProject.id === id) {
                    setSelectedProject(data)
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (user === '') return
        setOpenCreateProject(false)
        setDeleteOptions('id')
        setEditOptions('id')
        setMoreOptions('id')
        fetch(`http://localhost:8080/api/project?username=${user}`)
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.log(error))
    }, [user])

    return (
        <div
            className={"flex flex-col p-5 bg-white gap-4 items-center justify-start text-sm w-[250px] h-[400px] sm:w-[500px] "}
        >
            <div className={"flex flex-row w-full justify-between items-center"}>
                <p className={"text-2xl font-bold"}>Projects</p>
                <SimpleButton
                    onClick={() => setOpenCreateProject(true)}
                    text={"New Project"}
                    cn={"bg-gray-100 text-green-500"}
                />
            </div>
            {openCreateProject && (
                <div className={"flex flex-col w-full gap-4"}>
                    <input type="text" placeholder={"Project name"}
                           className={" text-sm p-2 border border-gray-400 rounded"}
                           value={newProjectName}
                           onChange={(e) => setNewProjectName(e.target.value)}
                    />
                    <div className={"flex flex-row gap-4 items-center justify-center"}>
                        <SimpleButton
                            onClick={() => setOpenCreateProject(false)}
                            text={"Cancel"}
                            cn={"bg-gray-100"}
                        />
                        <SimpleButton
                            onClick={() => handleCreateProject()}
                            text={"Create"}
                            cn={"bg-gray-100 text-green-500"}
                        />
                    </div>
                </div>
            )}

            {projects.length > 0 ? (
                <div
                    className='flex flex-col-reverse w-full overscroll-x-none max-h-[400px] overflow-y-auto bg-white gap-4'
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`flex flex-col w-full h-auto border-2 overscroll-x-none transition-all bg-gray-100 rounded 
                            ${project.id === selectedProject.id ? 'border-black' : ''}`}
                        >
                            <div
                                className='flex flex-row overscroll-x-none justify-between w-full h-fit px-5 py-4'
                            >
                                <div
                                    className='flex flex-row w-full h-auto overflow-hidden gap-4 items-center'
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <p className={"text-ellipsis break-words max-w-[80%]"}>{project.name}</p>
                                </div>
                                <button onClick={() => {
                                    setMoreOptions(moreOptions === project.id ? 'id' : project.id)
                                    setEditOptions('id')
                                    setDeleteOptions('id')
                                }
                                }>
                                    <EllipsisVertical/>
                                </button>
                            </div>
                            {moreOptions === project.id && (
                                <div className={"flex flex-col gap-4 p-3  justify-center"}>
                                    <hr/>
                                    <SimpleButton
                                        onClick={() => {
                                            setEditOptions(project.id)
                                            setNewProjectName(project.name)
                                            setMoreOptions('id')
                                            setDeleteOptions('id')
                                        }}
                                        text={"Edit"}
                                        icon={<Pencil/>}
                                        cn={"bg-white"}
                                    />
                                    <SimpleButton
                                        onClick={() => {
                                            setDeleteOptions(project.id)
                                            setEditOptions('id')
                                            setMoreOptions('id')
                                        }}
                                        text={"Delete"}
                                        icon={<Trash2/>}
                                        cn={"bg-white text-red-500"}
                                    />
                                </div>
                            )}
                            {editOptions === project.id && (
                                <div className={"flex flex-col gap-4 p-3"}>
                                    <hr/>
                                    <input type="text" placeholder={"Project name"}
                                           className={"p-2 border border-gray-400 rounded"}
                                           value={newProjectName}
                                           onChange={(e) => setNewProjectName(e.target.value)}
                                    />
                                    <div className={"flex flex-row items-center gap-4 justify-center"}>
                                        <SimpleButton
                                            onClick={() => {
                                                setEditOptions('id')
                                                setNewProjectName('')
                                            }}
                                            text={"Cancel"}
                                            cn={"bg-white"}
                                        />
                                        <SimpleButton
                                            onClick={() => handleEditProject(project.id)}
                                            text={"Save"}
                                            cn={"bg-white text-green-500"}
                                        />
                                    </div>

                                </div>
                            )}
                            {deleteOptions === project.id && (
                                <div className={"flex flex-col gap-4 p-3"}>
                                    <hr/>
                                    <div className={"flex flex-col gap-4 p-3 bg-white rounded"}>
                                        <p>Delete "{project.name}" ?</p>
                                        <p>Delete this project will also delete its data.</p>
                                    </div>

                                    <hr/>
                                    <div className={"flex flex-row gap-4 items-center justify-center"}>
                                        <SimpleButton
                                            onClick={() => setDeleteOptions('id')}
                                            text={"Cancel"}
                                            cn={"bg-white"}
                                        />
                                        <SimpleButton
                                            onClick={() => handleDeleteProject(project.id)}
                                            text={"Delete"}
                                            cn={"bg-white text-red-500"}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex w-full h-full bg-white items-center justify-center'>
                    <p className={"text-2xl"}>No Projects yet !</p>
                </div>
            )}
        </div>
    )
}