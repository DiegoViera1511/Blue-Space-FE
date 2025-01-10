import {useContext, useEffect, useState} from "react";
import {ProjectType} from "../../types.ts";
import {UserContext} from "../../context/userContext.tsx";
import { EllipsisVertical} from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';

export function ProjectsModal(){
    const {selectedProject , setSelectedProject , user} = useContext(UserContext)
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [openCreateProject , setOpenCreateProject] = useState(false)
    const [newProjectName , setNewProjectName] = useState('')
    const [deleteOptions , setDeleteOptions] = useState('id')
    const [moreOptions , setMoreOptions] = useState('id')
    const [editOptions , setEditOptions] = useState('id')

    const handleCreateProject = () => {
        const newProject : Partial<ProjectType> = {
            username: user,
            name : newProjectName,
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

    useEffect(() => {
        if(user === '') return
        fetch(`http://localhost:8080/api/project?username=${user}`)
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.log(error))
    },[user])

    return (
        <div 
            className={"flex flex-col p-5 bg-white gap-4 items-center justify-start text-sm w-[250px] h-[400px] sm:w-[500px] "}
        >
            <div className={"flex flex-row w-full justify-between items-center"}>
                <p className={"text-sm font-bold"}>Projects</p>
                <button className={"p-2 text-sm bg-green-500 rounded"}
                        onClick={() => setOpenCreateProject(true)}
                >
                    New Project
                </button>
            </div>

            {openCreateProject && (
                <div className={"flex flex-col w-full gap-4"}>
                    <input type="text" placeholder={"Project name"} 
                           className={" text-sm p-2 border border-gray-400 rounded"}
                           value={newProjectName}
                           onChange={(e) => setNewProjectName(e.target.value)}
                    />
                    <button className={"p-2 text-sm bg-green-500 rounded"}
                            onClick={() => handleCreateProject()}
                    >
                        Create
                    </button>
                    <button className={"p-2 text-sm bg-gray-100 rounded"}
                            onClick={() => setOpenCreateProject(false)}
                    >
                        Cancel
                    </button>
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
                            ${project.id === selectedProject.id ? 'border-green-500' : '' }`}
                        >
                            <div 
                                 className='flex flex-row overscroll-x-none justify-between w-full h-fit px-5 py-4'
                            >
                                <div
                                    className='flex flex-row w-full h-auto overflow-hidden gap-4 items-center'
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <p className={"text-ellipsis break-words max-w-[80%]"} >{project.name}</p>
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
                                    <button className={"flex flex-row p-2 gap-4 items-center justify-center bg-white rounded"}
                                            onClick={() => {
                                                setEditOptions(project.id)
                                                setDeleteOptions('id')
                                            }}
                                    >
                                        Edit <Pencil/>
                                    </button>
                                    <button
                                        className={"flex items-center gap-4 p-2 justify-center bg-white rounded"}
                                        onClick={() => {
                                            setDeleteOptions(project.id)
                                            setEditOptions('id')
                                        }}
                                    >
                                        Delete <Trash2 className={"text-red-600"}/>
                                    </button>
                                </div>
                            )}
                            {editOptions === project.id && (
                                <div className={"flex flex-col gap-4 p-3"}>
                                    <input type="text" placeholder={"Project name"} className={"p-2 border border-gray-400 rounded"}
                                           value={newProjectName}
                                           onChange={(e) => setNewProjectName(e.target.value)}
                                    />
                                    <button className={"p-2 bg-green-500 rounded"}
                                            onClick={() => {
                                                fetch(`http://localhost:8080/api/project/${project.id}`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({name: newProjectName})
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        setProjects(projects.map(p => p.id === project.id ? data : p))
                                                        setEditOptions('id')
                                                        setNewProjectName('')
                                                        if (selectedProject.id === project.id) {
                                                            setSelectedProject(data)
                                                        }
                                                    })
                                                    .catch(error => console.log(error))
                                            }}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                            {deleteOptions === project.id && (
                                <div className={"flex flex-col gap-4 p-3"}>
                                    <div className={"flex flex-col gap-4 p-3 bg-white rounded"}>
                                        <p>Delete "{project.name}" ?</p>
                                        <p>Delete this project will also delete its data.</p>
                                    </div>

                                    <hr/>
                                    <div className={"flex flex-row gap-4 items-center justify-center"}>
                                        <button className={"p-2 bg-white rounded"}
                                                onClick={() => setDeleteOptions('id')}
                                        >
                                            Cancel
                                        </button>
                                        <button className={"p-2 bg-white rounded text-red-600"}
                                                onClick={() => {
                                                    fetch(`http://localhost:8080/api/project/${project.id}`, {
                                                        method: 'DELETE',
                                                    })
                                                        .then(response => response.json())
                                                        .then(() => {
                                                            setProjects(projects.filter(p => p.id !== project.id))
                                                            setDeleteOptions('id')
                                                            if (selectedProject.id === project.id) {
                                                                setSelectedProject({id: 'id', name: 'Blue-Space', username: 'username'})
                                                            }
                                                        })
                                                        .catch(error => console.log(error))
                                                }}
                                        >
                                            Delete
                                        </button>
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