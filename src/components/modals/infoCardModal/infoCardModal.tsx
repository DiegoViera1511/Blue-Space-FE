import {useContext, useEffect, useState} from "react";
import {AlignLeft, Trash2} from "lucide-react";
import {defaultCardType} from "../../../types.ts";
import {StatesContext} from "../../../context/statesContext.tsx";
import {EditableText} from "../../common/editableText/editableText.tsx";
import {EditableTextArea} from "../../common/editableTextArea/editableTextArea.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {DeleteWarningModal} from "../deleteWarning/deleteWarningModal.tsx";
import {Modal} from "../../common/modal/modal.tsx";

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

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState(selectedCard.title)
    const [newCardText, setNewCardText] = useState(selectedCard.text)
    const [addDescription,setAddDescription] = useState(false)
    const [editText, setEditText] = useState(false)
    const [editTitle, setEditTitle] = useState(false)

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
                setSelectedCard(data)
                handleRefreshState()
            })
            .catch(error => console.log(error))
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
                setSelectedCard(data)
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
        setAddDescription(false)
    }, [selectedCard]);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div
                className={"flex flex-col p-5 bg-white gap-4 overflow-y-auto justify-start text-sm w-[280px] h-fit max-h-[400px] sm:max-h-[550px] sm:w-[500px] "}
            >
                <EditableText
                    value={newCardTitle}
                    onChange={setNewCardTitle}
                    text={selectedCard.title}
                    setEditText={setEditTitle}
                    editText={editTitle}
                    cn={"text-2xl font-medium rounded-md"}
                />
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
    )
}