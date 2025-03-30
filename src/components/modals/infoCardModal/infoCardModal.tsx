import {useContext, useEffect, useState} from "react";
import {AlignLeft, ChevronDown, Search, Trash2, X} from "lucide-react";
import {defaultCardType, UsersToProjectsDto} from "../../../types.ts";
import {StatesContext} from "../../../context/statesContext.tsx";
import {EditableText} from "../../common/editableText/editableText.tsx";
import {EditableTextArea} from "../../common/editableTextArea/editableTextArea.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {DeleteWarningModal} from "../deleteWarning/deleteWarningModal.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {UserContainer} from "../../userContainer/userContainer.tsx";
import {UserContext} from "../../../context/userContext.tsx";
import {httpRequest} from "../../../api";

export interface InfoCardModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function InfoCardModal({open , setOpen}: InfoCardModalProps) {

    const {
        selectedCard,
        setSelectedCard,
        handleRefreshState
    } = useContext(StatesContext)
    
    const {selectedProject} = useContext(UserContext)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState(selectedCard.title)
    const [newCardText, setNewCardText] = useState(selectedCard.text)
    const [addDescription,setAddDescription] = useState(false)
    const [editText, setEditText] = useState(false)
    const [editTitle, setEditTitle] = useState(false)
    const [selectedUser , setSelectedUser] = useState<string | null>(null)
    const [usersProject , setUsersProject] = useState<string[]>([])
    const [onSelectUser , setOnSelectUser] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    const handleSaveEdit = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: newCardText})
        })
            .then(response => response.json())
            .then((data) => {
                setSelectedCard(data.data)
                handleRefreshState()
            })
            .catch(error => console.log(error))
    }
    
    const handleUpdateUserCard = async (userUpdate : string | null) => {
        setSelectedUser(userUpdate)
        await httpRequest({
            url: `/card/${selectedCard.id}`,
            method: "PUT",
            data:{
                user_card: userUpdate
            }
        }).then(() => handleRefreshState())
    }

    const handleSaveEditTitle = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: newCardTitle})
        })
            .then(response => response.json())
            .then((data) => {
                setSelectedCard(data.data)
                handleRefreshState()
            })
            .catch(error => console.log(error))
    }

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setSelectedCard(defaultCardType)
                setOpenDeleteModal(false)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        setNewCardText(selectedCard.text)
        setNewCardTitle(selectedCard.title)
        setSelectedUser(selectedCard.user_card)
        setAddDescription(false)
        fetch(`http://localhost:8080/api/usersToProjects/dto?project_id=${selectedProject.id}`)
            .then(response => response.json())
            .then((data) => {
                setUsersProject((data.data as UsersToProjectsDto[]).map(user_to_project => user_to_project.username))
            })
            .catch(error => console.log(error))
    }, [selectedCard]);

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div
                    className={"flex flex-col p-5 bg-white gap-4 justify-start text-sm w-[280px] h-fit sm:w-[500px] "}
                >
                    <EditableText
                        value={newCardTitle}
                        onChange={setNewCardTitle}
                        text={selectedCard.title}
                        setEditText={setEditTitle}
                        editText={editTitle}
                        cn={"text-2xl font-medium rounded-md"}
                    />
                    <div className={"flex flex-col"}>
                        <div className={"flex flex-row gap-2"}>
                            <div className={"flex flex-row items-center justify-between w-fit gap-2 px-2 py-1 bg-gray-100 rounded-md"}>
                                {
                                    selectedUser ?
                                        <div className={"flex flex-row items-center justify-between gap-2"}>
                                            <UserContainer name={selectedUser} size={"xs"}/>
                                            <p>{selectedUser}</p>
                                        </div>
                                        :
                                        <p>Select a user</p>
                                }
                                <div
                                    className={"flex flex-row items-center justify-between p-1 hover:bg-gray-200 rounded-md"}
                                    onClick={() => setOnSelectUser(!onSelectUser)}
                                >
                                    <ChevronDown className={`transition-transform duration-500 ${onSelectUser ? "rotate-180" : ""}`}/>
                                </div>
                            </div>
                            { selectedUser ? 
                                <div className={"flex items-center justify-center"}>
                                    <button onClick={() => handleUpdateUserCard(null)} className={"hover:bg-gray-100 p-1 rounded-md w-fit h-fit"}>
                                        <X size={20}/>
                                    </button>
                                </div>
                                :
                                <></>
                            }
                        </div>
                        <div className={`relative flex flex-col w-fit ${!onSelectUser ? "hidden" : ""}`}>
                            <div className={"absolute mt-2 gap-2 flex flex-col bg-white border-2  rounded-md p-2"}>
                                <div className={"flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-medium"}>Project Members</p>
                                    <button onClick={() => setOnSelectUser(false)} className={"hover:bg-gray-100 p-1 rounded-md w-fit h-fit"}>
                                        <X/>
                                    </button>
                                </div>
                                <div className={"flex flex-row gap-2 items-center p-2 justify-start rounded-full bg-gray-100"}>
                                    <Search/>
                                    <input
                                        className={"w-48 sm:w-96 bg-gray-100 outline-none"}
                                        placeholder={"username"}
                                        value={searchInput}
                                        onChange={(e) => {setSearchInput(e.target.value)}}
                                    />
                                </div>
                                <div className={`flex flex-col bg-white max-h-[200px] gap-2 
                                        overflow-y-scroll rounded-md [@media(min-height:768px)]:max-h-60`}>
                                    {usersProject.map((user,index) => (
                                        <div
                                            key={index}
                                            className={"flex items-center cursor-pointer gap-2 rounded-md hover:bg-gray-300 bg-gray-100 p-2 " +
                                                `justify-start w-full ${ ! user.toLowerCase().startsWith(searchInput.toLowerCase()) ? "hidden" : "" }`}
                                            onClick={() => handleUpdateUserCard(user)}
                                        >
                                            <UserContainer name={user} size={"xs"}/>
                                            <p>{user}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {selectedCard.text === "" && !addDescription ?
                        <SimpleButton onClick={() => setAddDescription(true)} text={"Add Description"} cn={"hover:bg-gray-100 w-fit"} icon={<AlignLeft/>}/>
                        :
                        <div className={"flex flex-col gap-4 px-1"}>
                            <div className={"flex flex-row gap-2 rounded items-center justify-start"}>
                                <p className={"text-xl"}>Description</p>
                                <AlignLeft/>
                            </div>
                            <EditableTextArea
                                value={newCardText}
                                setNewText={setNewCardText}
                                text={selectedCard.text}
                                editText={editText}
                                setEditText={setEditText}
                                cn={"bg-gray-100 rounded-lg"}
                            />
                        </div>
                    }
                    {(selectedCard.title !== newCardTitle || selectedCard.text !== newCardText) ?
                        <div className={"flex flex-row gap-2"}>
                            <SimpleButton
                                onClick={() => {
                                    setNewCardText(selectedCard.text);
                                    setNewCardTitle(selectedCard.title);
                                }}
                                text={"Cancel"}
                                cn={"hover:bg-gray-100"}
                            />
                            <SimpleButton
                                onClick={() => {
                                    if (selectedCard.text !== newCardText) {
                                        handleSaveEdit()
                                    }
                                    if (selectedCard.title !== newCardTitle) {
                                        handleSaveEditTitle();
                                    }
                                }}
                                text={"Save"}
                                cn={"hover:bg-gray-100"}
                            />
                        </div>
                        :
                        <></>
                    }
                    <hr/>
                    <SimpleButton
                        onClick={() => setOpenDeleteModal(true)}
                        text={"Delete"}
                        cn={"hover:text-red-500 hover:bg-gray-100"}
                        icon={<Trash2/>}
                    />
                    <DeleteWarningModal
                        open={openDeleteModal}
                        setOpen={setOpenDeleteModal}
                        objectName={selectedCard.title}
                        objectType={"Card"}
                        handleDelete={() => handleDelete()}
                    />
                </div>
            </Modal>
        </>
    )
}