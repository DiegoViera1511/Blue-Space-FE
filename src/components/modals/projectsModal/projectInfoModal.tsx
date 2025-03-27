import {BaseModalProps, BgColors, Colors, ProjectType} from "../../../types.ts";
import {Modal} from "../../common/modal/modal.tsx";
import {useContext, useEffect, useState} from "react";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {Check, Pencil, Trash2} from "lucide-react";
import {httpRequest} from "../../../api";
import {UserContext} from "../../../context/userContext.tsx";
import {DeleteWarningModal} from "../deleteWarning/deleteWarningModal.tsx";

interface ProjectInfoModalProps extends BaseModalProps {
    project: ProjectType
}

export function ProjectInfoModal({project, open, setOpen}: ProjectInfoModalProps) {
    const [editName, setEditName] = useState(false)
    const [newProjectName, setNewProjectName] = useState("")
    const {selectedProject, setSelectedProject,setRefreshProjects} = useContext(UserContext)
    const [deleteOptions, setDeleteOptions] = useState(false)
    const [selectedColor,setSelectedColor] = useState("")
    
    const handleSaveEdit = async () => {
        const response = await httpRequest<ProjectType>({
            url: `/project/${project.id}`,
            method: 'PUT',
            data: {name: newProjectName}
        })
        setRefreshProjects((prev) => !prev)
        setNewProjectName(newProjectName)
        setEditName(false)
        if (selectedProject.id === project.id) {
            setSelectedProject(response.data)
        }
    }
    
    const handleChangeColor = async (color: Colors) => {
        await httpRequest({
            url: `/project/${project.id}`,
            method: 'PUT',
            data: {color: color}
        })
        setRefreshProjects((prev) => !prev)
        setSelectedColor(color)
        if (selectedProject.id === project.id) {
            setSelectedProject({...selectedProject, color})
        }
    }

    const handleDeleteProject = async () => {
        await httpRequest({
            url: `/project/${project.id}`,
            method: 'DELETE',
        })
            .then(() => {
                setRefreshProjects((prev) => !prev)
            })
        setDeleteOptions(false)
        setOpen(false)
    }
    
    useEffect(() => {
        setSelectedColor(project.color)
        setEditName(false)
        setNewProjectName(project.name)
    }, [open, project.name]);
    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className={"flex flex-col w-fit h-fit p-5 gap-4"}>
                    <div className={"flex flex-row items-center gap-4 justify-between w-full"}>
                        {editName ?
                            <input
                                className={"outline-none text-md font-bold bg-gray-100 rounded-md p-2"}
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                            />
                            :
                            <p className={"text-2xl font-bold"}>{project.name}</p>
                        }
                        <SimpleButton onClick={() => setEditName(true)} text={""} icon={<Pencil/>} cn={"hover:bg-gray-100 hover:text-blue-500"}/>
                    </div>
                    {editName ?
                        <div className={"flex flex-row items-center gap-4 justify-start w-fit"}>
                            <SimpleButton onClick={() => setEditName(false)} text={"Cancel"} cn={"hover:bg-gray-100"}/>
                            <SimpleButton onClick={() => handleSaveEdit()} text={"Save"} cn={"hover:bg-gray-100"}/>
                        </div>
                        :
                        <></>
                    }
                    <p className={"font-medium"}>Background color</p>
                    <div className={"grid grid-cols-5 w-fit items-center justify-center gap-5 p-2 border-2 rounded-xl"}>
                        {Object.values(Colors).map((color, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-center w-10 h-10 rounded-xl ${BgColors[color]} cursor-pointer`}
                                onClick={() => handleChangeColor(color)}
                            >
                                { selectedColor === color ? <Check color={"white"}/> : <></>}
                            </div>
                        ))}
                    </div>
                    <SimpleButton 
                        onClick={() => setDeleteOptions(true)} 
                        text={"Delete"} icon={<Trash2/>} 
                        cn={"hover:bg-gray-100 hover:text-red-500"}
                    />
                </div>
            </Modal>
            <DeleteWarningModal 
                open={deleteOptions} 
                setOpen={setDeleteOptions} 
                objectName={project.name} 
                objectType={"Project"} 
                handleDelete={handleDeleteProject}
            />
        </>
    )
}